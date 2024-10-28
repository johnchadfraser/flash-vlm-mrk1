<template>
  <div v-if="pending">
    <UiLoader icon="flash-icon-bg-white.png" />
  </div>
  <div v-else>
    <div class="mx-auto">
      <UiProgressBar />
      <div
        class="grid grid-cols-1 xl:grid-cols-3 gap-0 xl:gap-8 px-8 py-6 mb-8 border-2 rounded-3xl bg-white drop-shadow-lg"
      >
        <div>
          <h1
            class="text-2xl xl:text-4xl text-center xl:text-left font-bold uppercase pb-4 xl:pb-10 text-fs-yellow"
          >
            {{ question.header.texts[0].text }}
          </h1>
          <h2 class="xl:text-2xl xl:font-bold text-center xl:text-left pb-4">
            {{ question.body.texts[0].text }}
          </h2>
        </div>
        <div class="xl:col-span-2">
          <div
            class="drop-shadow-sm xl:text-xl font-semibold xl:font-bold text-center xl:text-left px-4 xl:pb-8 xl:pt-2"
          >
            {{ question.questions[0].body.texts[0].text }}
          </div>

          <div
            class="flex p-4"
            v-for="(q, index) in question.questions[0].answers[0].options"
            :key="q.id"
          >
            <div v-if="question.questions[0].answers[0].value.includes(q.id)">
              <input
                :name="q.id"
                :value="index + 1"
                type="checkbox"
                class="rounded mt-1 xl:mt-1.5 ring-0 focus:ring-0 ring-transparent ring-offset-0 shadow-none focus:ring-transparent bg-white text-fs-brown"
                required="required"
                checked
                @click="() => addChoice(q.id)"
              />
            </div>
            <div v-else>
              <input
                :name="q.id"
                :value="index + 1"
                type="checkbox"
                class="rounded mt-1 xl:mt-1.5 ring-0 focus:ring-0 ring-transparent ring-offset-0 shadow-none focus:ring-transparent bg-white text-fs-brown"
                required="required"
                @click="() => addChoice(q.id)"
              />
            </div>
            <div class="xl:text-xl xl:font-bold ml-4">
              {{ q.text }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import nuxtStorage from "nuxt-storage";

const props = defineProps({
  groupID: { type: Number, default: 0 },
  questionID: { type: Number, default: 0 },
});

//Get runtime config.
const config = useRuntimeConfig();

//Set emit.
const emit = defineEmits(["choice"]);

const addChoice = (id) => {
  emit("choice", id);
  uncheckElements(id);
};

function uncheckElements(id) {
  if (id === 6) {
    var uncheck = document.getElementsByTagName("input");
    for (var i = 0; i < uncheck.length - 1; i++) {
      if (uncheck[i].type == "checkbox") {
        uncheck[i].checked = false;
      }
    }
  } else {
    var uncheck = document.getElementsByTagName("input");
    for (var i = 0; i < uncheck.length; i++) {
      if (uncheck[i].type == "checkbox" && i === 6) {
        uncheck[i].checked = false;
      }
    }
  }
}

//Fetch options.
const options = {
  method: "GET",
  query: {
    "x-auth-token": nuxtStorage.localStorage.getData("token"),
    customerSurveyId: useCookie("surveyID").value,
    group: parseInt(props.groupID),
    question: parseInt(props.questionID),
  },
};

//Fetch data.
const { pending, data: question } = useLazyFetch(
  config.public.VUE_APP_API_URL +
    "/" +
    config.public.VUE_APP_API_VLM_SURVEY_ROUTE,
  {
    method: options.method,
    query: options.query,
  }
);
</script>
