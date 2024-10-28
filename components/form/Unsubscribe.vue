<template>
  <div v-if="results.success" class="text-fs-yellow font-bold py-4">
    {{ unsubscribeMessage }}
  </div>
  <div v-if="!results.success" class="text-fs-yellow font-bold">
    {{ results.err }}
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
          class="rounded w-full xl:w-1/2"
          placeholder="Email"
          required="true"
        />
      </div>
      <span class="block text-fs-yellow text-xs xl:text-sm pt-2">{{
        errors.email
      }}</span>
      <UiButton role="button" text="Submit" type="submit" />
    </form>
    <div class="block float-left text-sm text-white py-8">
      WARNING: Unsubscribing will delete all surveys you have taken.
    </div>
  </div>
</template>

<script setup>
import nuxtStorage from "nuxt-storage";
import { useForm } from "vee-validate";
import * as yup from "yup";

//Get runtime config.
const config = useRuntimeConfig();

//Cookie
const rememberUser = useCookie("rememberUser");
rememberUser.value = rememberUser.value || "";

let results = ref("");
let unsubscribeMessage = ref(
  "You have successfully unsubscribed. You will now be redirected to the home page."
);

const schema = yup.object({
  email: yup
    .string()
    .required("Email required")
    .email("Valid email is required"),
});

const { defineInputBinds, handleSubmit, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    email: rememberUser.value,
  },
});

// Define fields
const email = defineInputBinds("email");

const onSubmit = handleSubmit((values, actions) => {
  formRequest()
    .then((result) => {
      results.value = result;
      removeAuth();
      setTimeout(function () {
        navigateTo("/");
      }, 3000);
    })
    .catch((error) => {
      console.error("Unsubscribe form could not be sent", error);
    });
});

async function formRequest() {
  return await $fetch(
    config.public.VUE_APP_API_URL +
      "/" +
      config.public.VUE_APP_API_VLM_UNSUBSCRIBE_ROUTE +
      "/" +
      email.value.value,
    {
      method: "GET",
    }
  );
}

function removeAuth() {
  //Clear cookies.
  const userID = useCookie("userId");
  const firstName = useCookie("firstName");
  const lastName = useCookie("lastName");
  const companyName = useCookie("companyName");
  const email = useCookie("email");
  const businessfunction = useCookie("businessfunction");
  const jobrole = useCookie("jobrole");
  const rememberUser = useCookie("rememberUser");
  const surveyID = useCookie("surveyID");
  userID.value = null;
  firstName.value = null;
  lastName.value = null;
  companyName.value = null;
  email.value = null;
  businessfunction.value = null;
  jobrole.value = null;
  rememberUser.value = null;
  surveyID.value = null;
  //Clear local storage.
  nuxtStorage.localStorage.clear();
}
</script>
