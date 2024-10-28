<template>
  <div
    class="w-full xl:w-5/6 p-8 bg-fs-brown bg-cover rounded-3xl border-2 border-gray-500 z-5 drop-shadow-lg"
  >
    <FormRequestMeeting />
  </div>
</template>

<script setup>
import nuxtStorage from "nuxt-storage";

const token = nuxtStorage.localStorage.getData("token");

//If token expires redirect.
if (!token) {
  navigateTo("/profile?redirect=/request");
}

definePageMeta({
  layout: "request-meeting",
}),
  useHead({
    title: "Request - FLASH - Enterprise Maturity Assessment",
    meta: [
      {
        name: "description",
        content: "Request - FLASH - Enterprise Maturity Assessment",
      },
    ],
  });
</script>
