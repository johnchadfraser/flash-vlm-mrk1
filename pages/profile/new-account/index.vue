<template>
  <div
    class="w-full xl:w-5/6 p-8 bg-fs-brown bg-cover rounded-3xl border-2 border-gray-500 z-5 drop-shadow-lg"
  >
    <FormAccountSetup />
  </div>
</template>

<script>
export default {
  setup() {
    definePageMeta({
      layout: "home",
    }),
      useHead({
        title: "Setup New Account - FLASH",
        meta: [
          {
            name: "description",
            content: "FLASH - New Account",
          },
        ],
      });
  },
};
</script>
