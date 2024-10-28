<template>
  <h1 class="text-3xl xl:text-5xl text-fs-yellow uppercase font-bold">
    FLASH Meeting Request
  </h1>
  <div
    v-if="showRequestMessage"
    class="text-xs xl:text-base font-bold text-fs-yellow py-16"
  >
    {{ requestMessage }}
  </div>
  <div>
    <form @submit.prevent="onSubmit()">
      <div class="text-fs-yellow py-4">
        I would like to request a meeting to review my FLASH results with a
        retail expert advisor and dive deeper into best practices.
        <br /><br />
        <span class="text-white text-sm">
          PLEASE NOTE: A copy of your report will be sent to an advisor for
          review.
        </span>
      </div>

      <div>
        <label class="block text-white font-bold py-2">Comments</label>
        <div class="text-xs xl:text-sm font-normal text-white pb-2">
          {{ instructions }}
        </div>
        <textarea
          v-model="comments"
          class="rounded w-full"
          placeholder="Enter any additonal comments here..."
        >
        </textarea>
      </div>
      <div>
        <UiButton role="button" text="Submit" type="submit" />
      </div>
    </form>
  </div>
</template>

<script setup>
//Get runtime config.
const config = useRuntimeConfig();

const instructions =
  "Please enter any comments and click Submit to request a meeting.";

const requestMessage =
  "Thank you for your request. Please allow for up to 2 business days for a response. You will now be redirected.";
const surveyID = ref(useCookie("surveyID").value);
const firstName = ref(useCookie("firstName").value);
const lastName = ref(useCookie("lastName").value);
const email = ref(useCookie("email").value);
const companyName = ref(useCookie("companyName").value);
const comments = ref("");

const emailSubject = ref("FLASH Meeting Request");
const emailBody = ref(
  `I would like to request a meeting to review my FLASH results with you and dive deeper into best practices.`
);

const emailSignature = ref(
  `Thank you,<br/><br/><strong>${firstName.value} ${lastName.value}</strong><br/>${companyName.value}<br/><a href="mailto:${email.value}?subject=FLASH Meeting Request Follow-up">${email.value}</a>`
);

let results = ref("");
let showRequestMessage = ref(false);

const onSubmit = () => {
  showRequestMessage.value = true;
  formRequest()
    .then((result) => {
      results.value = result;
      if (results.value.success) {
        setTimeout(function () {
          navigateTo("/report");
        }, 5000);
      }
    })
    .catch((error) => {
      console.error("Request form could not be sent", error);
    });
};

async function formRequest() {
  //Now call the API.
  return await $fetch(
    config.public.VUE_APP_API_URL +
      "/" +
      config.public.VUE_APP_API_VLM_REQUEST_MEETING_ROUTE,
    {
      method: "POST",
      body: {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        companyName: companyName.value,
        emailSubject: emailSubject.value,
        emailBody: emailBody.value,
        comments: comments.value,
        emailSignature: emailSignature.value,
        surveyID: surveyID.value,
      },
    }
  );
}
</script>
