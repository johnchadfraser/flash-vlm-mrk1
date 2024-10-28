<template>
  <div class="mx-auto text-center xl:text-left">
    <div>
      <NuxtLink to="/request">
        <div :style="bgImage" class="h-60 rounded-3xl text-center shadow-xl">
          <div
            class="h-full text-8xl font-bold text-white bg-fs-brown bg-opacity-50 rounded-3xl"
          >
            <span class="opacity- relative top-[30%]">1</span>
          </div>
        </div>
      </NuxtLink>
    </div>
    <div class="h-auto xl:h-40">
      <p class="text-lg py-4">
        <span class="font-bold">Connect with an expert</span> to review the
        results with you, and dive deeper into best practices.
      </p>
    </div>
    <div>
      <UiButton
        class="py-4"
        text="Request Meeting"
        path="/request"
        format="primary"
        size="lg"
      />
    </div>
  </div>
</template>

<script setup>
import bgImageFile from "/images/banner/request-banner.jpg";

const bgImage = {
  "background-position": "center center",
  "background-size": "cover",
  "background-image": `url(${bgImageFile})`,
};
</script>
