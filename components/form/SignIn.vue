<template>
  <div v-if="route.query.surveyIDWarning" class="text-fs-yellow font-bold py-4">
    {{ surveyIDWarningMessage }}
  </div>
  <div v-if="route.query.registration" class="text-fs-yellow font-bold py-4">
    {{ registrationMessage }}
  </div>
  <div v-if="route.query.timeout" class="text-fs-yellow font-bold py-4">
    {{ timeoutMessage }}
  </div>
  <div v-if="!results.success" class="text-fs-yellow font-bold">
    {{ results.err }}
  </div>
  <div v-if="showSignIn">
    <UiLoader icon="flash-icon.png" type="signin" />
  </div>
  <div>
    <form accept-charset="UTF-8" v-on:submit.prevent="onSubmit()" method="POST">
      <div>
        <label class="block text-white font-bold py-2"
          ><span class="text-fs-red">*</span> Email</label
        >
        <input
          type="email"
          v-bind="email"
          class="w-full rounded xl:w-1/2"
          placeholder="Email"
        />
        <span class="block text-fs-yellow text-xs xl:text-sm pt-2">{{
          errors.email
        }}</span>
      </div>
      <div>
        <label class="block text-white font-bold py-2"
          ><span class="text-fs-red">*</span> Password</label
        >
        <input
          type="password"
          v-bind="password"
          class="w-full rounded xl:w-1/2"
          placeholder="Password"
        />
        <span class="block text-fs-yellow text-xs xl:text-sm pt-2">{{
          errors.password
        }}</span>
      </div>
      <UiButton role="button" text="Sign In" type="submit" />
    </form>
    <div class="text-white block float-left pr-4">
      <NuxtLink to="/" class="underline cursor-pointer">Register Now</NuxtLink>
    </div>
    <div class="text-white">
      <NuxtLink to="/profile/forgot-password" class="underline cursor-pointer"
        >Forgot Password?</NuxtLink
      >
    </div>
  </div>
</template>

<script setup>
import nuxtStorage from "nuxt-storage";
import { useForm } from "vee-validate";
import * as yup from "yup";

const route = useRoute();

//Get runtime config.
const config = useRuntimeConfig();

//Cookie
const rememberUser = useCookie("rememberUser", {
  maxAge: config.public.VUE_APP_COOKIE_EXPIRES,
});
rememberUser.value = rememberUser.value || "";

//Form vars.

let results = ref("");
let resultsEnroll = ref("");
const surveyID = useCookie("surveyID", {
  maxAge: config.public.VUE_APP_COOKIE_EXPIRES,
});
surveyID.value = surveyID.value || "";
let surveyIDWarningMessage = ref(
  "There was an issue retrieving your survey data. Please Sign In again."
);

let registrationMessage = ref(
  "You have successfully registered. Please Sign In."
);

let timeoutMessage = ref("Your session has timed out. Please Sign In again.");

const showSignIn = ref(false);

const schema = yup.object({
  email: yup
    .string()
    .required("Email required")
    .email("Valid email is required"),
  password: yup
    .string()
    .required("Password required")
    .min(8, "Password minimum length is 8 characters."),
});

const { defineInputBinds, handleSubmit, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    email: rememberUser.value,
  },
});

// Define fields
const email = defineInputBinds("email");
const password = defineInputBinds("password");

const onSubmit = handleSubmit(() => {
  showSignIn.value = true;
  formRequest()
    .then((result) => {
      results.value = result;
      if (!results.value.success) {
        showSignIn.value = false;
      }
      if (results.value.success) {
        //Create cookies.
        setCookies(results.value.results[0]);
        //Check for redirect.
        if (route.query.redirect) {
          navigateTo(route.fullPath.split("/profile?redirect=").pop());
        } else {
          //Ensure that company, businessfunction and job role are set.
          //Check for sap user.
          if (results.value.results[0].email.includes("@sap.com")) {
            getCustomerSurvey().then((customerSurveyData) => {
              if (customerSurveyData.success) {
                setRegistration(customerSurveyData.results);
              }
            });
          }
          //Check for existing survey.
          getExistingSurvey().then((surveyData) => {
            if (surveyData.status) {
              const totalSurveys = surveyData.results[0].tabs[0].TotalCount;
              const surveyResult = surveyData.results[1];
              //If a survey exists use it.
              if (totalSurveys === 0) {
                //Enroll survey and auth if it doesn't exist.
                surveyEnrollRequest()
                  .then((resultEnroll) => {
                    resultsEnroll.value = resultEnroll;
                    if (resultsEnroll.value.status) {
                      setSurveyID(
                        resultsEnroll.value.results.id,
                        resultsEnroll.value.results
                      );
                      setTimeout(function () {
                        navigateTo("/dashboard");
                      }, 2000);
                    }
                  })
                  .catch((error) => {
                    console.error("Enroll form could not be executed", error);
                  });
              } else {
                surveyID.value = surveyResult.surveys[0].customersurveyid;
                setTimeout(function () {
                  navigateTo("/dashboard");
                }, 2000);
              }
            }
          });
        }
      }
    })
    .catch((error) => {
      console.error("Sign In form could not be sent", error);
    });
});

async function formRequest() {
  return await $fetch(
    config.public.VUE_APP_API_URL +
      "/" +
      config.public.VUE_APP_API_VLM_LOGIN_ROUTE,
    {
      method: "POST",
      body: {
        uName: email.value.value.toLowerCase(),
        pass: password.value.value,
        register_source: "Flash",
        email_confirmation: false,
      },
    }
  );
}

//Create survey based on the registration and company name.
async function surveyEnrollRequest() {
  return await $fetch(
    config.public.VUE_APP_API_URL +
      "/" +
      config.public.VUE_APP_API_VLM_ENROLL_ROUTE,
    {
      method: "POST",
      body: {
        Response: {
          userInfo: {
            firstName: useCookie("firstName"),
            lastName: useCookie("lastName"),
            userType: "", // Can leave it as blank
            userId: useCookie("userId"),
            email: useCookie("email"),
          },
          surveyInfo: {
            surveyTemplateId: config.public.VUE_APP_API_VLM_ENROLL_TEMPLATE_ID,
            surveyAreaId: 4,
          },
        },
      },
      query: {
        "x-auth-token": nuxtStorage.localStorage.getData("token"),
      },
    }
  );
}

async function setCookies(user) {
  //Update rememberUser cookie
  rememberUser.value = user.email;

  //Set the user token.
  const token = nuxtStorage.localStorage.setData(
    "token",
    user.token,
    config.public.VUE_APP_LOCAL_STORAGE_EXPIRES
  );
  token.value = token;

  //Create user cookies for use throughout the site.
  const userId = useCookie("userId", {
    maxAge: config.public.VUE_APP_COOKIE_EXPIRES,
  });
  const firstName = useCookie("firstName", {
    maxAge: config.public.VUE_APP_COOKIE_EXPIRES,
  });
  const lastName = useCookie("lastName", {
    maxAge: config.public.VUE_APP_COOKIE_EXPIRES,
  });
  const companyName = useCookie("companyName", {
    maxAge: config.public.VUE_APP_COOKIE_EXPIRES,
  });
  const email = useCookie("email", {
    maxAge: config.public.VUE_APP_COOKIE_EXPIRES,
  });
  userId.value = user.userId;
  firstName.value = user.firstName;
  lastName.value = user.lastName;
  //Check for sap user.
  if (user.companyName === null && user.email.includes("@sap.com")) {
    companyName.value = "SAP";
    const businessfunction = useCookie("businessfunction", {
      maxAge: config.public.VUE_APP_COOKIE_EXPIRES,
    });
    const jobrole = useCookie("jobrole", {
      maxAge: config.public.VUE_APP_COOKIE_EXPIRES,
    });
    businessfunction.value = 13;
    jobrole.value = 5;
  } else {
    companyName.value = user.companyName;
  }
  email.value = user.email;
}

async function setSurveyID(id, survey) {
  //Create surveyID cookie.
  const surveyID = useCookie("surveyID", {
    maxAge: config.public.VUE_APP_COOKIE_EXPIRES,
  });
  surveyID.value = id;
  //Answer registration questions to instantiate the survey.
  await setRegistration(survey);
}

async function setRegistration(survey) {
  //Answer registration questions to instantiate the survey.
  const companyAnswerID = survey.preSurveyAssets.org_info.org_level.unique_id;
  const bfAnswerID = survey.areas[0].groups[0].questions[0].answers[0].id;
  const jrAnswerID = survey.areas[0].groups[1].questions[0].answers[0].id;
  await setRegistrationData(companyAnswerID, useCookie("companyName").value);
  await setRegistrationData(bfAnswerID, useCookie("businessfunction").value);
  await setRegistrationData(jrAnswerID, useCookie("jobrole").value);
}

async function setRegistrationData(id, answer) {
  return await $fetch(
    config.public.VUE_APP_API_URL +
      "/" +
      config.public.VUE_APP_API_VLM_SURVEY_SAVE_RESPONSE_ROUTE,
    {
      method: "POST",
      body: {
        Response: [
          {
            response_value: answer.toString(),
            unique_id: parseInt(id),
            assignee_id: null,
            assignee_email: null,
            emailpayload: null,
          },
        ],
      },
      query: {
        "x-auth-token": nuxtStorage.localStorage.getData("token"),
        userId: useCookie("userId").value,
      },
    }
  );
}

async function getExistingSurvey() {
  return await $fetch(
    config.public.VUE_APP_API_URL +
      "/" +
      config.public.VUE_APP_API_VLM_SURVEY_LIST_ROUTE,
    {
      method: "POST",
      body: {
        Response: {
          userInfo: {
            email: email.value,
          },
        },
      },
      query: {
        "x-auth-token": nuxtStorage.localStorage.getData("token"),
        fullquery: true,
      },
    }
  );
}

async function getCustomerSurvey() {
  return await $fetch(
    config.public.VUE_APP_API_URL +
      "/" +
      config.public.VUE_APP_API_VLM_SURVEY_ROUTE,
    {
      method: "GET",
      query: {
        "x-auth-token": nuxtStorage.localStorage.getData("token"),
        customerSurveyId: useCookie("surveyID").value,
      },
    }
  );
}
</script>
