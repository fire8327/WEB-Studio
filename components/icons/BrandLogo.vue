<script setup lang="ts">
import { siteConfig } from '~/config/site'

withDefaults(
  defineProps<{
    compact?: boolean
  }>(),
  {
    compact: false
  }
)
</script>

<template>
  <span class="inline-flex items-center gap-2.5 select-none">
    <svg
      width="30"
      height="30"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      class="shrink-0"
    >
      <rect
        width="32"
        height="32"
        rx="8"
        fill="#121216"
        stroke="rgba(255,255,255,0.14)"
      />
      <path
        d="M16 6.5L25.5 11.4L16 16.3L6.5 11.4L16 6.5Z"
        fill="#E5C79B"
      />
      <path
        d="M6.5 16L16 20.9L25.5 16"
        stroke="#F7F6F2"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M6.5 20.6L16 25.5L25.5 20.6"
        stroke="#A1A1AA"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
    <span class="flex flex-col leading-none">
      <span class="font-display text-[14px] font-bold tracking-tight text-primary">
        {{ siteConfig.brand.name }}
      </span>
      <span
        v-if="!compact"
        class="hidden sm:block text-[10px] font-medium tracking-[0.14em] uppercase text-muted mt-0.5"
      >
        WEB STUDIO
      </span>
    </span>
  </span>
</template>
