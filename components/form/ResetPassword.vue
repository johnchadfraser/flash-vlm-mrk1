<template>
  <div v-if="showResultMessage" class="text-fs-yellow font-bold py-4">
    {{ results.results[0].info }}<br /><br />
    <div v-if="results.success">
      <div v-if="results.results[0].info.includes('expired')">
        <NuxtLink
          to="/profile/forgot-password"
          class="max-w-max text-black font-bold uppercase rounded-lg cursor-pointer drop-shadow-lg bg-fs-yellow hover:bg-fs-yellow-light text-sm xl:text-base py-3 px-3 my-3 xl:py-4 xl:px-4 xl:my-4"
          >Request Again</NuxtLink
        >
      </div>
      <div v-else>
        <NuxtLink
          to="/profile"
          class="max-w-max text-black font-bold uppercase rounded-lg cursor-pointer drop-shadow-lg bg-fs-yellow hover:bg-fs-yellow-light text-sm xl:text-base py-3 px-3 my-3 xl:py-4 xl:px-4 xl:my-4"
          >Sign In</NuxtLink
        >
      </div>
    </div>
  </div>
  <div v-else>
    <form accept-charset="UTF-8" v-on:submit.prevent="onSubmit()" method="POST">
      <div>
        <label class="block text-white font-bold py-2"
          ><span class="text-fs-red">*</span> New Password</label
        >
        <input
          type="password"
          v-bind="password"
          class="w-full rounded xl:w-1/2"
          placeholder="New Password"
        />
        <span class="block text-fs-yellow text-xs xl:text-sm pt-2">{{
          errors.password
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
const route = useRoute();

let showResultMessage = ref(false);

if (!route.query.hash) {
  navigateTo("/profile");
}

//Get runtime config.
const config = useRuntimeConfig();

let results = ref({});

const schema = yup.object({
  password: yup
    .string()
    .required("New password required")
    .min(8, "Password minimum length is 8 characters."),
});

const { defineInputBinds, handleSubmit, errors } = useForm({
  validationSchema: schema,
});

// Define fields
const password = defineInputBinds("password");

const onSubmit = handleSubmit(() => {
  formRequest()
    .then((result) => {
      results.value = result;
      showResultMessage.value = true;
    })
    .catch((error) => {
      console.error("Reset Password form could not be sent", error);
    });
});

async function formRequest() {
  return await $fetch(
    config.public.VUE_APP_API_URL +
      "/" +
      config.public.VUE_APP_API_VLM_RESET_PASSWORD_ROUTE,
    {
      method: "POST",
      body: {
        pass: password.value.value,
      },
      query: {
        hash: route.query.hash,
      },
    }
  );
}
</script>
