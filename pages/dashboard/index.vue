<template>
  <h1
    class="text-3xl text-center xl:text-left xl:text-5xl font-bold text-fs-yellow drop-shadow-sm"
  >
    My Assessments
  </h1>
  <div class="grid xl:grid-cols-2 gap-0 xl:gap-4">
    <div class="text-center xl:text-left xl:text-xl py-8">
      <span class="font-bold"
        >We'll keep track of your progress for you on this page.<br
      /></span>
      Click the "Start Assesssment Now" button to begin. You can also choose
      from the many question topics below.<br /><br />
      NOTE: Once you have answered questions, you can update your assessment by
      clicking any of the questions below and making your changes.
    </div>
    <div class="py-10 text-center xl:text-right float-right">
      <NuxtLink
        to="/survey/1/1/customer%20centricity"
        class="max-w-max text-black font-bold uppercase rounded-lg cursor-pointer drop-shadow-lg bg-fs-yellow hover:bg-fs-yellow-light text-xl xl:text-2xl py-4 px-4 my-4 xl:py-6 xl:px-6 xl:my-6"
      >
        Start Assessment Now &rarr;</NuxtLink
      >
    </div>

    <div class="py-10 text-center xl:text-left">
      <UiButton
        :text="!showSurveyList ? 'Show My Assessments' : 'Back to Dashboard'"
        path=""
        @click="showSurveyList = !showSurveyList"
      />
    </div>
  </div>
  <div v-if="showSurveyList">
    <DashboardSurveyList />
  </div>
  <div v-else>
    <UiProgressBar />
    <DashboardQuestions :showLink="true" />
  </div>
</template>

<script setup>
import nuxtStorage from "nuxt-storage";

const token = nuxtStorage.localStorage.getData("token");
const surveyID = ref(useCookie("surveyID").value);

//If token expires redirect.
if (!token) {
  navigateTo("/profile?timeout=true");
}

//If surveyID fails to set, redirect.
if (typeof surveyID.value === "undefined" || surveyID.value === "") {
  nuxtStorage.localStorage.clear();
  navigateTo("/profile?surveyIDWarning=true");
}

definePageMeta({
  layout: "dashboard",
}),
  useHead({
    title: "Dashboard - FLASH - Enterprise Maturity Assessment",
    meta: [
      {
        name: "description",
        content: "Dashboard - FLASH - Enterprise Maturity Assessment",
      },
    ],
  });

const showSurveyList = ref(false);
</script>
