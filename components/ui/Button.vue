<template>
  <div v-if="role === 'link'">
    <div v-if="size === 'xl'">
      <div v-if="format === 'primary'">
        <NuxtLink
          :to="path"
          :class="[defaultBtn, primaryBtnXL]"
          :target="target"
          >{{ text }}</NuxtLink
        >
      </div>
      <div v-else-if="format === 'secondary'">
        <NuxtLink
          :to="path"
          :class="[defaultBtn, secondaryBtnXL]"
          :target="target"
          >{{ text }}</NuxtLink
        >
      </div>
      <div v-else-if="format === 'tertiary'">
        <NuxtLink
          :to="path"
          :class="[defaultBtn, tertiaryBtnXL]"
          :target="target"
          >{{ text }}</NuxtLink
        >
      </div>
    </div>
    <div v-else-if="size === 'lg'">
      <div v-if="format === 'primary'">
        <NuxtLink
          :to="path"
          :class="[defaultBtn, primaryBtnLG]"
          :target="target"
          >{{ text }}</NuxtLink
        >
      </div>
      <div v-else-if="format === 'secondary'">
        <NuxtLink
          :to="path"
          :class="[defaultBtn, secondaryBtnLG]"
          :target="target"
          >{{ text }}</NuxtLink
        >
      </div>
      <div v-else-if="format === 'tertiary'">
        <NuxtLink
          :to="path"
          :class="[defaultBtn, tertiaryBtnLG]"
          :target="target"
          >{{ text }}</NuxtLink
        >
      </div>
    </div>
    <div v-else-if="size === 'sm'">
      <div v-if="format === 'primary'">
        <NuxtLink
          :to="path"
          :class="[defaultBtn, primaryBtnSM]"
          :target="target"
          >{{ text }}</NuxtLink
        >
      </div>
      <div v-else-if="format === 'secondary'">
        <NuxtLink
          :to="path"
          :class="[defaultBtn, secondaryBtnSM]"
          :target="target"
          >{{ text }}</NuxtLink
        >
      </div>
      <div v-else-if="format === 'tertiary'">
        <NuxtLink
          :to="path"
          :class="[defaultBtn, tertiaryBtnSM]"
          :target="target"
          >{{ text }}</NuxtLink
        >
      </div>
    </div>
    <div v-else>
      <div v-if="format === 'primary'">
        <NuxtLink
          :to="path"
          :class="[defaultBtn, primaryBtn]"
          :target="target"
          >{{ text }}</NuxtLink
        >
      </div>
      <div v-else-if="format === 'secondary'">
        <NuxtLink
          :to="path"
          :class="[defaultBtn, secondaryBtn]"
          :target="target"
          >{{ text }}</NuxtLink
        >
      </div>
      <div v-else-if="format === 'tertiary'">
        <NuxtLink
          :to="path"
          :class="[defaultBtn, tertiaryBtn]"
          :target="target"
          >{{ text }}</NuxtLink
        >
      </div>
    </div>
  </div>
  <div v-else>
    <div v-if="size === 'xl'">
      <div v-if="format === 'primary'">
        <button
          :class="[defaultBtn, primaryBtnXL]"
          :type="type"
          :disabled="disabled"
        >
          {{ text }}
        </button>
      </div>
      <div v-if="format === 'secondary'">
        <button
          :class="[defaultBtn, secondaryBtnXL]"
          :type="type"
          :disabled="disabled"
        >
          {{ text }}
        </button>
      </div>
      <div v-if="format === 'tertiary'">
        <button
          :class="[defaultBtn, tertiaryBtnXL]"
          :type="type"
          :disabled="disabled"
        >
          {{ text }}
        </button>
      </div>
    </div>
    <div v-if="size === 'lg'">
      <div v-if="format === 'primary'">
        <button
          :class="[defaultBtn, primaryBtnLG]"
          :type="type"
          :disabled="disabled"
        >
          {{ text }}
        </button>
      </div>
      <div v-if="format === 'secondary'">
        <button
          :class="[defaultBtn, secondaryBtnLG]"
          :type="type"
          :disabled="disabled"
        >
          {{ text }}
        </button>
      </div>
      <div v-if="format === 'tertiary'">
        <button
          :class="[defaultBtn, tertiaryBtnLG]"
          :type="type"
          :disabled="disabled"
        >
          {{ text }}
        </button>
      </div>
    </div>
    <div v-if="size === 'md'">
      <div v-if="format === 'primary'">
        <button
          :class="[defaultBtn, primaryBtnMD]"
          :type="type"
          :disabled="disabled"
        >
          {{ text }}
        </button>
      </div>
      <div v-if="format === 'secondary'">
        <button
          :class="[defaultBtn, secondaryBtnMD]"
          :type="type"
          :disabled="disabled"
        >
          {{ text }}
        </button>
      </div>
      <div v-if="format === 'tertiary'">
        <button
          :class="[defaultBtn, tertiaryBtnMD]"
          :type="type"
          :disabled="disabled"
        >
          {{ text }}
        </button>
      </div>
    </div>
    <div v-if="size === 'sm'">
      <div v-if="format === 'primary'">
        <button
          :class="[defaultBtn, primaryBtnSM]"
          :type="type"
          :disabled="disabled"
        >
          {{ text }}
        </button>
      </div>
      <div v-if="format === 'secondary'">
        <button
          :class="[defaultBtn, secondaryBtnSM]"
          :type="type"
          :disabled="disabled"
        >
          {{ text }}
        </button>
      </div>
      <div v-if="format === 'tertiary'">
        <button
          :class="[defaultBtn, tertiaryBtnSM]"
          :type="type"
          :disabled="disabled"
        >
          {{ text }}
        </button>
      </div>
    </div>
    <div v-else>
      <div v-if="format === 'primary'">
        <button
          :class="[defaultBtn, primaryBtn]"
          :type="type"
          :disabled="disabled"
        >
          {{ text }}
        </button>
      </div>
      <div v-if="format === 'secondary'">
        <button
          :class="[defaultBtn, secondaryBtn]"
          :type="type"
          :disabled="disabled"
        >
          {{ text }}
        </button>
      </div>
      <div v-if="format === 'tertiary'">
        <button
          :class="[defaultBtn, tertiaryBtn]"
          :type="type"
          :disabled="disabled"
        >
          {{ text }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    role: { type: String, default: "link" },
    text: { type: String },
    path: { type: String },
    type: { type: String, default: "button" },
    format: { type: String, default: "primary" },
    size: { type: String },
    target: { type: String, default: "_parent" },
    disabled: { type: Boolean, default: false },
  },

  data() {
    return {
      defaultBtn:
        "max-w-max text-black font-bold uppercase rounded-lg cursor-pointer drop-shadow-lg",
      primaryBtn:
        "bg-fs-yellow hover:bg-fs-yellow-light text-sm xl:text-base py-3 px-3 my-3 xl:py-4 xl:px-4 xl:my-5",
      primaryBtnXL:
        "bg-fs-yellow hover:bg-fs-yellow-light text-xl xl:text-2xl py-4 px-4 my-4 xl:py-6 xl:px-6 xl:my-6",
      primaryBtnLG:
        "bg-fs-yellow hover:bg-fs-yellow-light text-base xl:text-lg py-4 px-4 my-4 xl:py-5 xl:px-5 xl:my-5",
      primaryBtnMD:
        "bg-fs-yellow hover:bg-fs-yellow-light text-sm xl:text-base py-3 px-3 my-3 xl:py-4 xl:px-4 xl:my-4",
      primaryBtnSM:
        "bg-fs-yellow hover:bg-fs-yellow-light text-sm xl:text-base py-3 px-3 my-3 xl:py-4 xl:px-4 xl:my-4",
      secondaryBtn:
        "bg-white border border-fs-brown hover:bg-fs-brown hover:text-white text-sm xl:text-base py-3 px-3 my-3 xl:py-4 xl:px-4 xl:my-5",
      secondaryBtnXL:
        "bg-white border border-fs-brown hover:bg-fs-brown hover:text-white text-xl xl:text-2xl py-4 px-4 my-4 xl:py-6 xl:px-6 xl:my-6",
      secondaryBtnLG:
        "bg-white border border-fs-brown hover:bg-fs-brown hover:text-white text-base xl:text-lg py-4 px-4 my-4 xl:py-5 xl:px-5 xl:my-5",
      secondaryBtnMD:
        "bg-white border border-fs-brown hover:bg-fs-brown hover:text-white text-sm xl:text-base py-3 px-3 my-3 xl:py-4 xl:px-4 xl:my-4",
      secondaryBtnSM:
        "bg-white border border-fs-brown hover:bg-fs-brown hover:text-white hover:border-fs-light-brown text-sm xl:text-base py-3 px-3 my-3 xl:py-4 xl:px-4 xl:my-4",
      tertiaryBtn:
        "bg-fs-brown border border-fs-yellow text-white hover:bg-white hover:text-fs-brown text-sm xl:text-base py-3 px-3 my-3 xl:py-4 xl:px-4 xl:my-5",
      tertiaryBtnXL:
        "bg-fs-brown border border-fs-yellow text-white hover:bg-white hover:text-fs-brown text-xl xl:text-2xl py-4 px-4 my-4 xl:py-6 xl:px-6 xl:my-6",
      tertiaryBtnLG:
        "bg-fs-brown border border-fs-yellow text-white hover:bg-white hover:text-fs-brown text-base xl:text-lg py-4 px-4 my-4 xl:py-5 xl:px-5 xl:my-5",
      tertiaryBtnMD:
        "bg-fs-brown border border-fs-yellow text-white hover:bg-white hover:text-fs-brown text-sm xl:text-base py-3 px-3 my-3 xl:py-4 xl:px-4 xl:my-4",
      tertiaryBtnSM:
        "bg-fs-brown border border-fs-yellow text-white hover:bg-white hover:text-fs-brown text-sm xl:text-base py-3 px-3 my-3 xl:py-4 xl:px-4 xl:my-4",
    };
  },
};
</script>
