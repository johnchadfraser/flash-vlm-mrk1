<template>
  <div class="w-full float-left py-4 sm:block xl:hidden text-center">
    <p v-if="message != ''" class="font-bold text-sm">
      {{ message }}
    </p>
    <div class="flex justify-center">
      <NuxtLink :to="appStoreURL" target="_blank" class="cursor-pointer">
        <img
          href=""
          :src="`/images/banner/download-app-store-200px.png`"
          loading="lazy"
          class="w-32 py-4"
          aria-label="Download App Store"
        />
      </NuxtLink>
      <NuxtLink :to="playStoreURL" target="_blank" class="cursor-pointer">
        <img
          :src="`/images/banner/download-google-play-200px.png`"
          loading="lazy"
          class="w-32 py-4"
          aria-label="Download Google Play"
        />
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  message: { type: String, default: "" },
  appStoreURL: { type: String, default: "https://apps.apple.com/us/app/" },
  playStoreURL: {
    type: String,
    default: "https://play.google.com/store/apps/",
  },
});
</script>
