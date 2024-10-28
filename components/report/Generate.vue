<template>
  <div class="w-full text-lg text-center py-4">
    <span class="font-bold"
      >The "Generate My Report" button will become available once you have
      answered all questions.<br
    /></span>
  </div>
  <div class="text-center pt-8 pb-16">
    <div v-if="complete >= 100">
      <NuxtLink
        to="/report"
        class="max-w-max text-black font-bold uppercase rounded-lg cursor-pointer drop-shadow-lg bg-fs-yellow hover:bg-fs-yellow-light text-xl xl:text-2xl py-4 px-4 my-4 xl:py-6 xl:px-6 xl:my-6"
      >
        Generate My Report</NuxtLink
      >
    </div>
    <div v-else>
      <NuxtLink
        to=""
        class="max-w-max text-black font-bold uppercase rounded-lg cursor-pointer drop-shadow-lg bg-gray-300 hover:bg-gray-200 text-xl xl:text-2xl py-4 px-4 my-4 xl:py-6 xl:px-6 xl:my-6"
      >
        Generate My Report</NuxtLink
      >
    </div>
  </div>
</template>

<script setup>
import nuxtStorage from "nuxt-storage";

//Get runtime config.
const config = useRuntimeConfig();

const options = {
  method: "GET",
  query: {
    "x-auth-token": nuxtStorage.localStorage.getData("token"),
    customerSurveyId: useCookie("surveyID").value,
    completedpercentage: true,
  },
};

//Fetch data.
const { pending, data: complete } = await useLazyFetch(
  config.public.VUE_APP_API_URL +
    "/" +
    config.public.VUE_APP_API_VLM_SURVEY_ROUTE,
  {
    method: options.method,
    query: options.query,
  }
);
</script>
