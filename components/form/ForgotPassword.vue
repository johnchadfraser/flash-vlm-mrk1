<template>
  <div v-if="showResultMessage" class="text-fs-yellow font-bold py-4">
    {{ results }}
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
      <UiButton role="button" text="Submit" type="submit" />
    </form>
    <div class="text-white block float-left pr-4">
      <NuxtLink to="/" class="underline cursor-pointer">Register Now</NuxtLink>
    </div>
    <div class="text-white">
      <NuxtLink to="/profile" class="underline cursor-pointer"
        >Sign In?</NuxtLink
      >
    </div>
  </div>
</template>

<script setup>
import { useForm } from "vee-validate";
import * as yup from "yup";

//Get runtime config.
const config = useRuntimeConfig();

let showResultMessage = ref(false);

//Cookie
const rememberUser = useCookie("rememberUser");
rememberUser.value = rememberUser.value || "";

let results = ref("");

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

const onSubmit = handleSubmit(() => {
  formRequest(config.public.VUE_APP_FLASH_WEBSITE_URL)
    .then((result) => {
      results.value = result;
      showResultMessage.value = true;
    })
    .catch((error) => {
      console.error("Forgot Password form could not be sent", error);
    });
});

async function formRequest(url) {
  return await $fetch(
    config.public.VUE_APP_API_URL +
      "/" +
      config.public.VUE_APP_API_VLM_FORGOT_PASSWORD_ROUTE,
    {
      method: "GET",
      query: {
        email: email.value.value,
        redirectUrl: url,
        redirectPath: "/profile/reset-password",
      },
    }
  );
}
</script>
