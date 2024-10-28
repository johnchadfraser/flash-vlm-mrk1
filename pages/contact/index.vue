<template>
  <div
    class="w-full xl:w-5/6 p-8 bg-fs-brown bg-cover rounded-3xl border-2 border-gray-500 z-5 drop-shadow-lg"
  >
    <FormContact />
  </div>
</template>

<script>
export default {
  setup() {
    definePageMeta({
      layout: "home",
    }),
      useHead({
        title: "Contact - FLASH - Enterprise Maturity Assessment",
        meta: [
          {
            name: "description",
            content: "Contact - FLASH - Enterprise Maturity Assessment",
          },
        ],
      });
  },
};
</script>
