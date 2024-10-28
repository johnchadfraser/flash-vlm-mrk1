<template>
  <header class="fixed w-full -top-1 z-20 bg-fs-brown xl:h-[90px]">
    <nav
      class="container mx-auto xl:flex xl:justify-between xl:items-center py-5 px-4 xl:px-0"
    >
      <div class="flex items-center justify-between">
        <NuxtLink to="/" class="hover:text-fs-yellow">
          <img
            src="/images/icon/flash-icon.png"
            class="block float-left w-6 h-6 xl:w-10 xl:h-10 mt-1 mr-3"
            aria-label="flash icon"
            alt="Flash Icon"
          />
          <div
            class="block float-left font-roboto text-2xl xl:text-5xl text-white uppercase font-bold"
          >
            FLASH
          </div>
          <div
            class="hidden xl:block float-left text-2xl xl:font-roboto-condensed font-medium text-white capitalize pt-2 mx-8"
          >
            Enterprise Maturity Assessment
          </div>
        </NuxtLink>
        <!-- Mobile menu button -->
        <div @click="showMenu = !showMenu" class="flex xl:hidden">
          <button
            type="button"
            class="text-white hover:text-gray-400 focus:outline-none focus:text-gray-400"
            aria-label="Main Menu"
          >
            <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
              <path
                fill-rule="evenodd"
                d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
      <ul
        :class="showMenu ? 'flex min-h-screen' : 'hidden'"
        class="flex-col mt-8 space-y-4 xl:flex xl:space-y-0 xl:flex-row xl:items-center xl:space-x-10 xl:mt-0"
      >
        <div v-if="token">
          <li
            class="font-roboto-condensed text-base font-light text-white hover:text-fs-yellow cursor-pointer"
          >
            Welcome {{ userName }}
          </li>
        </div>
        <div v-if="!token">
          <li
            class="font-roboto-condensed text-base font-light text-white hover:text-fs-yellow"
          >
            <NuxtLink
              to="/"
              activeClass="text-fs-yellow"
              @click="showMenu = false"
              >Home</NuxtLink
            >
          </li>
        </div>
        <div v-if="token">
          <li
            class="font-roboto-condensed text-base font-light text-white hover:text-fs-yellow"
          >
            <NuxtLink
              to="/dashboard"
              activeClass="text-fs-yellow"
              @click="showMenu = false"
              >Dashboard</NuxtLink
            >
          </li>
        </div>
        <div v-if="token">
          <li
            class="font-roboto-condensed text-base font-light text-white hover:text-fs-yellow"
          >
            <NuxtLink
              to=""
              activeClass="text-fs-yellow"
              @click="setSignOut()"
              class="cursor-pointer"
              >Sign Out</NuxtLink
            >
          </li>
        </div>
        <div v-else>
          <li
            class="font-roboto-condensed text-base font-light text-white hover:text-fs-yellow"
          >
            <NuxtLink
              to="/profile"
              activeClass="text-fs-yellow"
              @click="showMenu = false"
              >Sign In</NuxtLink
            >
          </li>
        </div>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import nuxtStorage from "nuxt-storage";

const token = nuxtStorage.localStorage.getData("token");

const firstName = ref(useCookie("firstName") || ["Valued"]);
const lastName = ref(useCookie("lastName") || ["User"]);
firstName.value = firstName.value;
lastName.value = lastName.value;

const userName = ref(lastName.value + ", " + firstName.value);
const showMenu = ref(false);

function setSignOut() {
  nuxtStorage.localStorage.clear();
  navigateTo("/profile");
}
</script>
