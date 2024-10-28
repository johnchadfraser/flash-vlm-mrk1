<template>
  <footer class="xl:sticky bottom-0 w-full h-160 bg-fs-brown">
    <div class="container mx-auto z-10 px-4 xl:px-0">
      <div class="grid grid-cols-2 gap-8 py-4">
        <div class="col-span-2 text-center xl:text-left">
          <NuxtLink
            to=""
            @click="
              showTerms = !showTerms;
              showCookiePolicy = false;
              $scrollTop();
            "
            target="_blank"
            class="pr-10 xl:ml-0 xl:py-2 text-xs xl:text-base text-fs-yellow hover:text-white cursor-pointer"
            activeClass="underline decoration-solid"
            >Terms & Conditions</NuxtLink
          >
          <NuxtLink
            to=""
            @click="
              showCookiePolicy = !showCookiePolicy;
              showTerms = false;
              $scrollTop();
            "
            target="_blank"
            class="py-2 text-xs xl:text-base text-fs-yellow hover:text-white cursor-pointer"
            activeClass="underline decoration-solid"
            >Cookie Policy</NuxtLink
          >
        </div>
        <div class="col-span-2 xl:col-span-1 text-center xl:text-left">
          <NuxtLink :to="firestartersURL" class="block hover:text-fs-yellow">
            <img
              role="img"
              class="xl:block xl:float-left w-4 h-4 xl:w-10 xl:h-10 mt-1 xl:mr-3 mx-auto"
              src="/images/icon/firestarters-icon.png"
              aria-label="firestarters logo"
              alt="Firestarters Logo"
            />
            <span
              class="xl:block xl:float-left font-roboto text-xs lg:text-xl text-white uppercase font-bold"
            >
              Firestarters
              <span
                class="font-roboto-condensed block text-xs lg:text-sm text-fs-light-brown capitalize"
                >Your Global Business Community</span
              >
            </span>
          </NuxtLink>
        </div>
        <div
          class="col-span-2 xl:col-span-1 text-center xl:pt-0 xl:text-left text-xs xl:text-sm"
        >
          <img
            role="img"
            src="/images/logo/sap-logo.png"
            class="xl:block xl:float-left xl:mr-4 h-6 w-12 mb-2 xl:h-8 xl:w-16 mx-auto"
            aria-label="sap logo"
            alt="SAP Logo"
          />
          <div class="xl:block xl:float-left text-white font-bold pb-2 xl:pb-0">
            FLASH is powered by SAP Value Lifecycle Manager.
          </div>
          <div class="xl:block xl:float-left text-white text-xs xl:text-sm">
            © {{ $dateNowFormat(year) }} Firestarters. All rights reserved.
            <span v-if="showOptOut">
              |
              <NuxtLink
                to="/unsubscribe"
                class="text-fs-yellow hover:text-white cursor-pointer"
                >Opt-out?</NuxtLink
              >
            </span>
          </div>
        </div>
      </div>
    </div>
  </footer>
  <div
    @click="showTerms = !showTerms"
    class="absolute mx-4 -top-24 xl:top-60 xl:left-[60%] xl:w-[20%] h-[50%] overflow-x-hidden rounded-3xl border-2 p-8 bg-white border-gray-500 no-scrollbar"
    :class="showTerms ? 'show-panel-bottom' : `hide-panel-bottom`"
  >
    <LegalTerms />
  </div>
  <div
    @click="showCookiePolicy = !showCookiePolicy"
    class="absolute mx-4 -top-24 xl:top-60 xl:left-[60%] xl:w-[20%] overflow-x-hidden rounded-3xl border-2 p-8 bg-white border-gray-500 no-scrollbar"
    :class="showCookiePolicy ? 'show-panel-bottom' : `hide-panel-bottom`"
  >
    <LegalCookiePolicy />
  </div>
</template>

<script setup>
//Get runtime config.
const config = useRuntimeConfig();

const firestartersURL = config.public.VUE_APP_FIRESTARTERS_WEBSITE_URL;

const email = ref(useCookie("email").value || "");
let showOptOut = ref(true);

let showTerms = ref(false);
let showCookiePolicy = ref(false);
const year = new Date();

if (email.value.includes("@sap.com")) {
  showOptOut = false;
}
</script>

<style scoped>
.show-panel-bottom {
  transition-timing-function: ease-in;
  opacity: 1;
  transition: 1s;
  transform: translateY(45%);
  z-index: 5;
  visibility: visible;
}

.hide-panel-bottom {
  transition-timing-function: ease-out;
  transition: 1s;
  opacity: 0;
  transform: translateY(100%);
  z-index: 5;
  visibility: hidden;
}

@media (min-width: 992px) {
  .show-panel-bottom {
    transition: 1s;
    transform: translateY(0%);
    visibility: visible;
  }

  .hide-panel-bottom {
    transition: 1s;
    transform: translateY(100%);
    visibility: hidden;
  }
}
</style>
