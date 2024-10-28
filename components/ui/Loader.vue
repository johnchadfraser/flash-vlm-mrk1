<template>
  <div v-if="type === 'default'">
    <div class="text-center py-16">
      <img
        :src="`/images/icon/${icon}`"
        loading="lazy"
        class="w-8 mx-auto animate-bounce drop-shadow-lg pb-4"
        aria-label="firestarters loader"
      />
      <div
        class="animate-pulse font-bold"
        :class="
          icon === 'flash-icon.png' || icon === 'flash-icon-bg-white.png'
            ? 'text-black'
            : 'text-white'
        "
      >
        Loading...
      </div>
    </div>
  </div>
  <div v-else-if="type === 'registration'">
    <div class="text-center py-16">
      <img
        :src="`/images/icon/${icon}`"
        loading="lazy"
        class="w-8 mx-auto animate-bounce drop-shadow-lg pb-4"
        aria-label="firestarters loader"
      />
      <div
        class="animate-pulse font-bold"
        :class="icon === 'flash-icon.png' ? 'text-white' : 'text-black'"
      >
        Registering please wait...
      </div>
    </div>
  </div>
  <div v-else-if="type === 'signin'">
    <div class="text-center py-16">
      <img
        :src="`/images/icon/${icon}`"
        loading="lazy"
        class="w-8 mx-auto animate-bounce drop-shadow-lg pb-4"
        aria-label="firestarters loader"
      />
      <div
        class="animate-pulse font-bold"
        :class="icon === 'flash-icon.png' ? 'text-white' : 'text-black'"
      >
        Signing In please wait...
      </div>
    </div>
  </div>
  <div v-else-if="type === 'download'">
    <div class="text-center py-16">
      <img
        :src="`/images/icon/${icon}`"
        loading="lazy"
        class="w-8 mx-auto animate-bounce drop-shadow-lg pb-4"
        aria-label="firestarters loader"
      />
      <div
        class="animate-pulse font-bold"
        :class="icon === 'flash-icon.png' ? 'text-white' : 'text-black'"
      >
        Downloading please wait...
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    icon: { type: String, default: "flash-icon.png" },
    type: { type: String, default: "default" },
  },
};
</script>
