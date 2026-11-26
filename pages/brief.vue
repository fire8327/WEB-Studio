<script setup lang="ts">
import BriefAndContactSection from '~/components/sections/BriefAndContactSection.vue'
import { useParallax } from '~/composables/useParallax'
import { useScrollReveal } from '~/composables/useScrollReveal'
import { useSeoSchema } from '~/composables/useSeoSchema'

useScrollReveal()
useParallax()

useSeoSchema({
  title: 'Компактный бриф и прямая связь с техлидом — LAYER.DEV',
  description:
    '4-шаговый бриф на White Label разработку или аутстафф Vue 3 / Nuxt 3. Оценка по Figma за 24 ч, подписание NDA до просмотра макетов, связь в Telegram и VK за 15 минут.',
  path: '/brief',
  serviceName: 'Бриф на партнёрскую разработку'
})
</script>

<template>
  <div>
    <div class="bg-canvas pt-10 pb-2">
      <div class="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <div class="studio-eyebrow">
          <span>Обсудить проект · Ответ за 15–30 мин</span>
        </div>
        <h1 class="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary">
          Запрос оценки или команды
        </h1>
      </div>
    </div>

    <BriefAndContactSection />
  </div>
</template>
