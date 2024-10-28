<template>
  <h1 class="text-3xl xl:text-5xl text-fs-yellow uppercase font-bold">
    Contact Us
  </h1>
  <div class="text-xs xl:text-base font-normal text-gray-400 leading-5">
    {{ instructions }}
  </div>
  <div class="grid grid-cols-1 xl:grid-cols-2 gap-4">
    <form accept-charset="UTF-8" v-on:submit.prevent="onSubmit()" method="GET">
      <div>
        <label class="block text-white font-bold py-2">Full Name</label>
        <input
          type="text"
          v-model="userFName"
          class="rounded mr-4 mb-2 w-full"
          required="required"
          placeholder="First Name"
        />
        <input
          type="text"
          v-model="userLName"
          class="rounded w-full"
          required="required"
          placeholder="Last Name"
        />
      </div>
      <div>
        <label class="block text-white font-bold py-2">Company Name</label>
        <input
          type="text"
          v-model="company"
          class="rounded w-full"
          required="required"
          placeholder="Company Name"
        />
      </div>
      <div>
        <label class="block text-white font-bold py-2">Email</label>
        <input
          type="email"
          v-model="email"
          class="rounded w-full"
          required="required"
          placeholder="Email"
        />
      </div>
      <div>
        <label class="block text-white font-bold py-2">Message</label>
        <textarea
          v-model="message"
          class="rounded w-full"
          required="required"
          placeholder="Enter your comments here..."
        >
        </textarea>
      </div>
      <div>
        <UiButton
          role="button"
          text="Send"
          class="block float-left pr-4"
          type="submit"
          @click="
            showStep3 = false;
            showStep2 = false;
            showStep1 = false;
          "
        />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      instructions: "Please allow for up to 2 business days for a response.",
    };
  },
};
</script>
