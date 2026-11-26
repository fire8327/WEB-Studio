<script setup lang="ts">
import { onUnmounted, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    value: number
    duration?: number
  }>(),
  {
    duration: 250
  }
)

const displayValue = ref(props.value)
let rafId: number | null = null

watch(
  () => props.value,
  (nextVal, prevVal) => {
    if (!import.meta.client) {
      displayValue.value = nextVal
      return
    }
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      displayValue.value = nextVal
      return
    }

    if (rafId !== null) {
      cancelAnimationFrame(rafId)
    }

    const startVal = typeof prevVal === 'number' ? prevVal : displayValue.value
    const startTime = performance.now()

    const tick = (now: number) => {
      const progress = Math.min(1, (now - startTime) / props.duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      displayValue.value = Math.round(startVal + (nextVal - startVal) * eased)
      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
      }
      else {
        displayValue.value = nextVal
        rafId = null
      }
    }

    rafId = requestAnimationFrame(tick)
  }
)

onUnmounted(() => {
  if (rafId !== null) cancelAnimationFrame(rafId)
})
</script>

<template>
  <span class="tabular-nums">{{ new Intl.NumberFormat('ru-RU').format(displayValue) }}</span>
</template>
