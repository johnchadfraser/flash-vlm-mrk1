<template>
  <div
    class="xl:w-5/6 py-8 px-4 xl:p-10 bg-fs-brown bg-cover rounded-3xl border-2 border-gray-500 z-5"
  >
    <div class="p-4">
      <h1 class="text-3xl xl:text-5xl text-fs-yellow uppercase font-bold">
        Reset Password
      </h1>
    </div>
    <div class="p-4">
      <FormResetPassword />
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "home",
});
useHead({
  title: "Reset Password - FLASH",
  meta: [
    {
      name: "description",
      content: "FLASH - Reset Password",
    },
  ],
});
</script>
