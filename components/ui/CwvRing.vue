<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    score: number
    label: string
    size?: number
  }>(),
  {
    size: 48
  }
)

const radius = 19
const circumference = 2 * Math.PI * radius
const dashOffset = computed(() => {
  const clamped = Math.max(0, Math.min(100, props.score))
  return circumference * (1 - clamped / 100)
})
</script>

<template>
  <div class="flex flex-col items-center gap-1.5">
    <div
      class="relative inline-flex items-center justify-center shrink-0"
      :style="{ width: `${size}px`, height: `${size}px` }"
    >
      <svg
        :width="size"
        :height="size"
        viewBox="0 0 48 48"
        class="-rotate-90"
        aria-hidden="true"
      >
        <circle
          cx="24"
          cy="24"
          :r="radius"
          fill="rgba(229, 199, 155, 0.06)"
          stroke="rgba(255, 255, 255, 0.1)"
          stroke-width="3.5"
        />
        <circle
          cx="24"
          cy="24"
          :r="radius"
          fill="none"
          stroke="#E5C79B"
          stroke-width="3.5"
          stroke-linecap="round"
          :stroke-dasharray="circumference"
          :stroke-dashoffset="dashOffset"
          class="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <span class="absolute font-mono text-xs font-bold text-primary tabular-nums">
        {{ score }}
      </span>
    </div>
    <span class="font-mono text-[10px] text-secondary text-center leading-tight">
      {{ label }}
    </span>
  </div>
</template>
