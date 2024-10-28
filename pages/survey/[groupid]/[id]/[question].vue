<template>
  <div v-if="pending">
    <UiLoader icon="flash-icon-bg-white.png" />
  </div>
  <div v-else>
    <input
      id="answers"
      type="hidden"
      :value="
        questions[parseInt(route.params.groupid)].groups[
          parseInt(route.params.id - 1)
        ].questions[0].answers[0].value
      "
    />

    <SurveyQuestion
      @choice="addChoice"
      :groupID="parseInt(route.params.groupid)"
      :questionID="parseInt(route.params.id) - 1"
    />
    <div
      v-if="
        parseInt(route.params.groupid * route.params.id) > 1 &&
        parseInt(route.params.groupid * route.params.id) <= 15
      "
    >
      <!--Account for group index.-->
      <div
        v-if="
          parseInt(route.params.id) === 5 && parseInt(route.params.groupid) <= 2
        "
      >
        <NavSurvey
          @choice="addChoice"
          :groupID="parseInt(route.params.groupid)"
          :questionID="parseInt(route.params.id)"
          :surveyAnswerID="
            questions[parseInt(route.params.groupid)].groups[
              parseInt(route.params.id - 1)
            ].questions[0].answers[0].id
          "
          :surveyQuestionAnswer="selectedChoices"
          :questionPrevious="
            questions[parseInt(route.params.groupid)].groups[
              parseInt(route.params.id - 2)
            ].header.texts[0].text
          "
          :questionNext="
            questions[parseInt(route.params.groupid) + 1].groups[0].header
              .texts[0].text
          "
        />
      </div>
      <div v-else>
        <div v-if="parseInt(route.params.id) === 1">
          <NavSurvey
            @choice="addChoice"
            :groupID="parseInt(route.params.groupid)"
            :questionID="parseInt(route.params.id)"
            :surveyAnswerID="
              questions[parseInt(route.params.groupid)].groups[
                parseInt(route.params.id - 1)
              ].questions[0].answers[0].id
            "
            :surveyQuestionAnswer="selectedChoices"
            :questionPrevious="
              questions[parseInt(route.params.groupid) - 1].groups[4].header
                .texts[0].text
            "
            :questionNext="
              questions[parseInt(route.params.groupid)].groups[
                parseInt(route.params.id)
              ].header.texts[0].text
            "
          />
        </div>
        <div
          v-else-if="parseInt(route.params.id * route.params.groupid) === 15"
        >
          <NavSurvey
            @choice="addChoice"
            :groupID="parseInt(route.params.groupid)"
            :questionID="parseInt(route.params.id)"
            :surveyAnswerID="
              questions[parseInt(route.params.groupid)].groups[
                parseInt(route.params.id - 1)
              ].questions[0].answers[0].id
            "
            :surveyQuestionAnswer="selectedChoices"
            :questionPrevious="
              questions[parseInt(route.params.groupid)].groups[
                parseInt(route.params.id - 2)
              ].header.texts[0].text
            "
          />
        </div>
        <div v-else>
          <NavSurvey
            @choice="addChoice"
            :groupID="parseInt(route.params.groupid)"
            :questionID="parseInt(route.params.id)"
            :surveyAnswerID="
              questions[parseInt(route.params.groupid)].groups[
                parseInt(route.params.id - 1)
              ].questions[0].answers[0].id
            "
            :surveyQuestionAnswer="selectedChoices"
            :questionPrevious="
              questions[parseInt(route.params.groupid)].groups[
                parseInt(route.params.id - 2)
              ].header.texts[0].text
            "
            :questionNext="
              questions[parseInt(route.params.groupid)].groups[
                parseInt(route.params.id)
              ].header.texts[0].text
            "
          />
        </div>
      </div>
    </div>
    <div v-else-if="parseInt(route.params.id * route.params.groupid) > 15">
      <NavSurvey
        :groupID="parseInt(route.params.groupid)"
        :questionID="parseInt(route.params.id)"
        :questionPrevious="
          questions[parseInt(route.params.groupid)].groups[
            parseInt(route.params.id - 2)
          ].header.texts[0].text
        "
      />
    </div>
    <div v-else>
      <NavSurvey
        @choice="addChoice"
        :groupID="parseInt(route.params.groupid)"
        :questionID="parseInt(route.params.id)"
        :surveyAnswerID="
          questions[parseInt(route.params.groupid)].groups[
            parseInt(route.params.id - 1)
          ].questions[0].answers[0].id
        "
        :surveyQuestionAnswer="selectedChoices"
        :questionNext="
          questions[parseInt(route.params.groupid)].groups[
            parseInt(route.params.id)
          ].header.texts[0].text
        "
      />
    </div>
  </div>
</template>

<script setup>
import nuxtStorage from "nuxt-storage";

const route = useRoute();

//Get runtime config.
const config = useRuntimeConfig();

definePageMeta({
  layout: "survey",
}),
  useHead({
    title: "Assesssment - FLASH - Enterprise Maturity Assessment",
    meta: [
      {
        name: "description",
        content: "Assesssment - FLASH - Enterprise Maturity Assessment",
      },
    ],
  });

const selectedChoices = ref([]);

const addChoice = (id) => {
  let choiceList = [...selectedChoices.value];
  //Handle none of the above.
  if (id === 6) {
    choiceList = [];
    choiceList.push(id);
    selectedChoices.value = choiceList;
  } else {
    if (choiceList.includes(id)) {
      choiceList.splice(choiceList.indexOf(id), 1);
    } else {
      choiceList.push(id);
    }
    selectedChoices.value = choiceList;
  }
};

//Fetch options.
const options = {
  method: "GET",
  query: {
    "x-auth-token": nuxtStorage.localStorage.getData("token"),
    customerSurveyId: useCookie("surveyID").value,
    questions: true,
  },
};

//Fetch data.
const { pending, data: questions } = useLazyFetch(
  config.public.VUE_APP_API_URL +
    "/" +
    config.public.VUE_APP_API_VLM_SURVEY_ROUTE,
  {
    method: options.method,
    query: options.query,
  }
);

onNuxtReady(() => {
  setTimeout(function () {
    const list = document.getElementById("answers").value;
    for (var i = 0; i < list.length; i++) {
      if (list[i] != ",") {
        selectedChoices.value.push(parseInt(list[i]));
      }
    }
  }, 2000);
});

const token = nuxtStorage.localStorage.getData("token");

if (token === null) {
  navigateTo("/profile?timeout=true");
}
</script>
