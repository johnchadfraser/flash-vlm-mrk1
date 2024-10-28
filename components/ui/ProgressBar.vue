<template>
  <!-- Survey Progress -->
  <div v-if="pending"></div>
  <div v-else class="flex flex-nowrap gap-4 items-center py-2">
    <div class="font-bold pr-4">0%</div>
    <div class="progress-bar progress drop-shadow-md">
      <div v-if="progress != 0">
        <span
          v-if="progress != '89' && progress > 0"
          :style="{ width: progress + 6 + '%' }"
          class="rounded-r-full"
          >{{ Number(progress) + "%" }}</span
        >
        <span
          v-else
          :style="{ width: progress + 11 + '%' }"
          class="rounded-r-full"
          >{{ Number(progress) + 11 + "%" }}
        </span>
      </div>
    </div>
    <div class="font-bold pl-4">{{ duration }}</div>
  </div>
</template>

<script setup>
import nuxtStorage from "nuxt-storage";
//Get runtime config.
const config = useRuntimeConfig();

const props = defineProps({
  questionID: { type: Number, default: 0 },
});

const showProgressBall = ref(false);

const duration = ref("100%");
const progressBar = ref("0%");
const completed = ref(0);
const pbValue = ref(0);
const progress = ref(0);

onMounted(() => {
  setTimeout(function () {
    completed.value = complete.value - 11;
    pbValue.value = Number(completed.value);
    progress.value = completed.value;
    progressBar.value = pbValue.value;
    showProgressBall.value = true;
  }, 1500);
});

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

<style scoped>
.progress-bar {
  width: 100%;
  height: 30px;
  border-radius: 15px;
  margin: 20px 10px;
  border: 2px solid #eceaea;
  overflow: hidden;
  position: relative;
}

.progress-bar span {
  height: 100%;
  display: block;
  color: rgb(255, 251, 251);
  line-height: 30px;
  position: absolute;
  text-align: end;
  opacity: 1;
  padding-right: 10px;
  transition-timing-function: ease-in;
  transition: 0.1s;
}

.progress span {
  background-color: #fcba36;
}
</style>
