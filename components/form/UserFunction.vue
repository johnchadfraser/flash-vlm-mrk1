<template>
  <div
    class="w-full p-8 bg-fs-brown bg-cover rounded-3xl border-2 border-gray-500 z-5 drop-shadow-lg"
  >
    <div
      class="text-base text-center xl:text-left xl:text-xl text-white xl:font-bold pb-4"
    >
      Create an account and complete a 15-question assesssment to receive a free
      personalized report benchmarking your business capabilities.
    </div>
    <div v-if="showRegistering">
      <UiLoader icon="flash-icon.png" type="registration" />
    </div>
    <div
      v-if="results != '' && !results.success"
      class="text-fs-yellow font-bold p-6 border-2 border-fs-yellow rounded-md"
    >
      {{ results.err }}
    </div>
    <div class="">
      <form @submit.prevent="onSubmit()">
        <div>
          <label class="block text-white font-bold py-2"
            ><span class="text-fs-red">*</span> First Name</label
          >
          <input
            type="text"
            v-bind="firstName"
            class="rounded mr-4 mb-2 w-full"
            placeholder="First Name"
          />
          <span class="text-fs-yellow text-xs xl:text-sm pt-2">{{
            errors.firstName
          }}</span>
        </div>
        <div>
          <label class="block text-white font-bold py-2"
            ><span class="text-fs-red">*</span> Last Name</label
          >
          <input
            type="text"
            v-bind="lastName"
            class="rounded mr-4 mb-2 w-full"
            placeholder="Last Name"
          />
          <span class="text-fs-yellow text-xs xl:text-sm pt-2">{{
            errors.lastName
          }}</span>
        </div>
        <div>
          <label class="block text-white font-bold py-2"
            ><span class="text-fs-red">*</span> Business Email</label
          >
          <input
            type="email"
            v-bind="email"
            class="rounded mr-4 mb-2 w-full"
            placeholder="Email"
          />
          <span class="text-fs-yellow text-xs xl:text-sm pt-2">{{
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
            class="rounded mr-4 mb-2 w-full"
            placeholder="Password"
          />
          <span class="text-fs-yellow text-xs xl:text-sm pt-2">{{
            errors.password
          }}</span>
        </div>
        <div>
          <label class="block text-white font-bold py-2"
            ><span class="text-fs-red">*</span> Company Name</label
          >
          <input
            type="text"
            v-bind="company"
            class="rounded mr-4 mb-2 w-full"
            placeholder="Company Name"
          />
          <span class="text-fs-yellow text-xs xl:text-sm pt-2">{{
            errors.company
          }}</span>
        </div>
        <div>
          <label for="businessfunction" class="block text-white font-bold py-2"
            ><span class="text-fs-red">*</span> Business Function</label
          >
          <select
            id="businessfunction"
            class="rounded mr-4 mb-2 w-full"
            v-bind="bfID"
          >
            <option value="">Choose a Business Function...</option>
            <option v-for="bf in businessfunction" :key="bf.id" :value="bf.id">
              {{ bf.bf_name }}
            </option>
          </select>
          <span class="text-fs-yellow text-xs xl:text-sm pt-2">{{
            errors.bfID
          }}</span>
        </div>
        <div>
          <label for="jobrole" class="block text-white font-bold py-2"
            ><span class="text-fs-red">*</span> Job Role</label
          >
          <select id="jobrole" class="rounded mr-4 mb-2 w-full" v-bind="jrID">
            <option value="">Choose a Job Role...</option>
            <option v-for="jr in jobrole" :key="jr.id" :value="jr.id">
              {{ jr.jr_name }}
            </option>
          </select>
          <span class="text-fs-yellow text-xs xl:text-sm pt-2">{{
            errors.jrID
          }}</span>
        </div>
        <div class="text-sm xl:text-base text-white py-4">
          By clicking "Submit", you accept our
          <NuxtLink
            to=""
            activeClass="text-fs-yellow"
            class="underline cursor-pointer"
            @click="
              showTerms = !showTerms;
              showPrivacy = false;
              showCookiePolicy = false;
              $scrollTop();
            "
            >Terms & Conditions</NuxtLink
          >
          and
          <NuxtLink
            to=""
            activeClass="text-fs-yellow"
            class="underline cursor-pointer"
            @click="
              showPrivacy = !showPrivacy;
              showTerms = false;
              showCookiePolicy = false;
              $scrollTop();
            "
            >Privacy Policy</NuxtLink
          >
          and
          <NuxtLink
            to=""
            activeClass="text-fs-yellow"
            class="underline cursor-pointer"
            @click="
              showCookiePolicy = !showCookiePolicy;
              showTerms = false;
              showPrivacy = false;
              $scrollTop();
            "
            >Cookie Policy</NuxtLink
          >. Your inputs and scores are visible to you but anonymous in the
          shared dataset.
        </div>
        <div class="flex flex-row items-center xl:items-baseline">
          <div class="basis-1/4">
            <UiButton
              role="button"
              text="Submit"
              path=""
              class="block"
              type="submit"
              @click="$scrollTop()"
            />
          </div>
          <div
            class="text-sm xl:text-xl px-4 basis-3/4 font-bold text-fs-yellow uppercase"
          >
            Already have an account?
            <NuxtLink
              to="/profile"
              class="underline"
              activeClass="text-fs-yellow"
              @click="showMenu = !showMenu"
              >Sign In</NuxtLink
            >
          </div>
        </div>
      </form>
    </div>
  </div>
  <div
    @click="showTerms = !showTerms"
    class="absolute right-4 left-4 -top-24 xl:top-60 xl:left-[60%] xl:w-[20%] h-[50%] overflow-x-hidden rounded-3xl border-2 p-8 bg-white border-gray-500 no-scrollbar"
    :class="showTerms ? 'show-panel-bottom' : `hide-panel-bottom`"
  >
    <LegalTerms />
  </div>
  <div
    @click="showPrivacy = !showPrivacy"
    class="absolute right-4 left-4 -top-24 xl:top-60 xl:left-[60%] xl:w-[20%] h-[50%] overflow-x-hidden rounded-3xl border-2 p-8 bg-white border-gray-500 no-scrollbar"
    :class="showPrivacy ? 'show-panel-bottom' : `hide-panel-bottom`"
  >
    <LegalPrivacy />
  </div>
  <div
    @click="showCookiePolicy = !showCookiePolicy"
    class="absolute right-4 left-4 -top-24 xl:top-60 xl:left-[60%] xl:w-[20%] overflow-x-hidden rounded-3xl border-2 p-8 bg-white border-gray-500 no-scrollbar"
    :class="showCookiePolicy ? 'show-panel-bottom' : `hide-panel-bottom`"
  >
    <LegalCookiePolicy />
  </div>
</template>

<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";

//Get runtime config.
const config = useRuntimeConfig();

const showTerms = ref(false);
const showPrivacy = ref(false);
const showCookiePolicy = ref(false);

//Fetch data.
const { data: businessfunction } = useLazyFetch(
  config.public.VUE_APP_API_URL +
    "/" +
    config.public.VUE_APP_API_BUSINESS_FUNCTION_ROUTE,
  {
    query: {
      status_id: 1,
    },
  }
);

//Fetch data.
const { data: jobrole } = useLazyFetch(
  config.public.VUE_APP_API_URL +
    "/" +
    config.public.VUE_APP_API_JOB_ROLE_ROUTE,
  {
    query: {
      status_id: 1,
    },
  }
);

const schema = yup.object({
  firstName: yup.string().required("First name required"),
  lastName: yup.string().required("Last name required"),
  email: yup
    .string()
    .required("Email required")
    .email("Valid email is required"),
  password: yup
    .string()
    .required("Password required")
    .min(8, "Password minimum length is 8 characters."),
  company: yup.string().required("Company name required"),
  bfID: yup.string().required("Business function is required"),
  jrID: yup.string().required("Job role is required"),
});

const { defineInputBinds, handleSubmit, errors } = useForm({
  validationSchema: schema,
});

// Define fields
const firstName = defineInputBinds("firstName");
const lastName = defineInputBinds("lastName");
const email = defineInputBinds("email");
const password = defineInputBinds("password");
const company = defineInputBinds("company");
const bfID = defineInputBinds("bfID");
const jrID = defineInputBinds("jrID");

let results = ref("");
let showRegistering = ref(false);

const onSubmit = handleSubmit(() => {
  formRequest()
    .then((result) => {
      showRegistering.value = false;
      results.value = result;
      if (results.value.success) {
        //Cookie
        const rememberUser = useCookie("rememberUser", {
          maxAge: config.public.VUE_APP_COOKIE_EXPIRES,
        });
        rememberUser.value = email.value.value;
        navigateTo("/profile?registration=true");
      }
    })
    .catch((error) => {
      console.error("Registration form could not be sent", error);
    });
});

async function formRequest() {
  //Show registering.
  showRegistering.value = true;

  //Set cookies.
  const businessfunction = useCookie("businessfunction", {
    maxAge: config.public.VUE_APP_COOKIE_EXPIRES,
  });
  const jobrole = useCookie("jobrole", {
    maxAge: config.public.VUE_APP_COOKIE_EXPIRES,
  });
  businessfunction.value = bfID.value.value;
  jobrole.value = jrID.value.value;

  //Now call the API.
  return await $fetch(
    config.public.VUE_APP_API_URL +
      "/" +
      config.public.VUE_APP_API_VLM_REGISTRATION_ROUTE,
    {
      method: "POST",
      body: {
        firstName: firstName.value.value,
        lastName: lastName.value.value,
        email: email.value.value.toLowerCase(),
        password: password.value.value,
        cntry_id: 185,
        companyName: company.value.value,
        register_source: "Flash",
        email_confirmation: true,
      },
    }
  );
}
</script>

<style scoped>
.show-panel-topic {
  transition-timing-function: ease-in;
  opacity: 1;
  transition: 1s;
  transform: translateY(55%);
  z-index: 0;
  visibility: visible;
}

.hide-panel-topic {
  transition-timing-function: ease-out;
  transition: 1s;
  transform: translateY(200%);
  opacity: 0;
  z-index: 0;
  visibility: hidden;
}

.show-panel-bottom {
  transition-timing-function: ease-in;
  opacity: 1;
  transition: 1s;
  transform: translateY(45%);
  z-index: 5;
  visibility: visible;
}

.hide-panel-bottom {
  transition-timing-function: ease-out;
  transition: 1s;
  opacity: 0;
  transform: translateY(100%);
  z-index: 5;
  visibility: hidden;
}

@media (min-width: 992px) {
  .show-panel-topic {
    transition: 1s;
    transform: translateX(10%);
    visibility: visible;
  }

  .hide-panel-topic {
    transition: 1s;
    transform: translateX(-150%);
    visibility: hidden;
  }

  .show-panel-bottom {
    transition: 1s;
    transform: translateY(0%);
    visibility: visible;
  }

  .hide-panel-bottom {
    transition: 1s;
    opacity: 0;
    transform: translateY(100%);
    visibility: hidden;
  }
}
</style>
