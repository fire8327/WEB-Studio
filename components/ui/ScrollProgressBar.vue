<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const progress = ref(0)

function updateProgress() {
  if (!import.meta.client) return
  const doc = document.documentElement
  const max = doc.scrollHeight - doc.clientHeight
  progress.value = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0
}

onMounted(() => {
  if (!import.meta.client) return
  updateProgress()
  window.addEventListener('scroll', updateProgress, { passive: true })
})

onUnmounted(() => {
  if (!import.meta.client) return
  window.removeEventListener('scroll', updateProgress)
})
</script>

<template>
  <div
    class="pointer-events-none fixed inset-x-0 top-0 z-[50] h-[2px] bg-transparent"
    aria-hidden="true"
  >
    <div
      class="h-full transition-[width] duration-75 ease-out"
      :style="{
        width: `${progress}%`,
        background: 'linear-gradient(90deg, #E5C79B 0%, #F7F6F2 60%, #A1A1AA 100%)'
      }"
    />
  </div>
</template>
