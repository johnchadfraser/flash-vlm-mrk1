<template>
  <div v-if="complete < 100">
    <h1
      class="text-3xl xl:text-5xl text-center xl:text-left uppercase font-bold py-4"
    >
      FLASH Report
    </h1>
    <p class="text-lg text-center xl:text-left">
      You must complete all questions to download your FLASH report.
    </p>
  </div>
  <div v-else>
    <h1
      class="text-3xl xl:text-5xl text-center xl:text-left uppercase font-bold py-4"
    >
      Thank You
    </h1>
    <div class="text-lg text-center xl:text-left">
      Your <span class="font-bold">FLASH</span> Report is ready for download!<br /><br />
      <NuxtLink
        to=""
        @click.prevent="
          getReport();
          showDownload = !showDownload;
        "
        class="max-w-max text-black font-bold uppercase rounded-lg cursor-pointer drop-shadow-lg bg-fs-yellow hover:bg-fs-yellow-light text-sm xl:text-base py-3 px-3 my-3 xl:py-4 xl:px-4 xl:my-4"
        >Download Report</NuxtLink
      >
      <div v-if="showDownload">
        <UiLoader icon="flash-icon-bg-white.png" type="download" />
      </div>
      <br />
      <br />
      <UtilsMobileAppDownload
        message="It is recommended that you use the PowerPoint app for optimal viewing. To get the app, click here:"
        appStoreURL="https://apps.apple.com/us/app/microsoft-powerpoint/id586449534"
        playStoreURL="https://play.google.com/store/apps/details?id=com.microsoft.office.powerpoint&hl=en_US&gl=US&pli=1"
      />
      If you are unable to download your report please contact us at:
      <NuxtLink
        :to="`mailto:flash@sap.com?subject=FLASH Download Problem - ${companyName}`"
        activeClass="text-fs-yellow"
        class="underline"
        target="_blank"
        >flash@sap.com</NuxtLink
      >.<br /><br />
      Please provide feedback regarding your experience, request a meeting, or
      visit our
      <NuxtLink
        :to="firestartersURL"
        activeClass="text-fs-yellow"
        class="underline"
        target="_blank"
      >
        Firestarters Online Global Community</NuxtLink
      >
      , we'd love to hear from you.
    </div>
    <h2 class="text-4xl text-center xl:text-left uppercase font-bold py-8">
      Next Steps?
    </h2>
    <div class="grid xl:grid-cols-3 gap-8">
      <div>
        <ReportRequestToForm />
      </div>
      <div>
        <ReportFeedback />
      </div>
      <div>
        <ReportFirestarters />
      </div>
    </div>
  </div>
</template>

<script setup>
import nuxtStorage from "nuxt-storage";

const token = nuxtStorage.localStorage.getData("token");

const showDownload = ref(false);

if (!token) {
  navigateTo("/profile?timeout=true");
}

const config = useRuntimeConfig();
const firestartersURL = config.public.VUE_APP_FIRESTARTERS_WEBSITE_URL;
const companyName = useCookie("companyName").value;

definePageMeta({
  layout: "default",
}),
  useHead({
    title: "Report - FLASH - Enterprise Maturity Assessment",
    meta: [
      {
        name: "description",
        content: "Report - FLASH - Enterprise Maturity Assessment",
      },
    ],
  });

function getReport() {
  getDownload()
    .then((result) => {
      showDownload.value = false;
      const url = window.URL.createObjectURL(
        new Blob([result], {
          type: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        })
      );
      const link = document.createElement("a");

      const today = new Date();
      const yyyy = today.getFullYear();
      let mm = today.getMonth() + 1; // Months start at 0!
      let dd = today.getDate();

      if (dd < 10) dd = "0" + dd;
      if (mm < 10) mm = "0" + mm;

      const formattedToday = dd + "-" + mm + "-" + yyyy;
      const filename =
        "FLASH Enterprise Retail Report - " + formattedToday + ".pptx";

      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);

      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    })
    .catch((error) => {
      console.error("Get report could not be sent", error);
    });
}

async function getDownload() {
  return await $fetch(
    config.public.VUE_APP_API_URL +
      "/" +
      config.public.VUE_APP_API_VLM_REPORT_ROUTE,
    {
      method: "GET",
      query: {
        "x-auth-token": nuxtStorage.localStorage.getData("token"),
        surveyId: useCookie("surveyID").value,
      },
    }
  );
}

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
