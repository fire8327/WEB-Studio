<script setup lang="ts">
import BriefAndContactSection from '~/components/sections/BriefAndContactSection.vue'
import CasesSection from '~/components/sections/CasesSection.vue'
import { useParallax } from '~/composables/useParallax'
import { useScrollReveal } from '~/composables/useScrollReveal'
import { useSeoSchema } from '~/composables/useSeoSchema'

useScrollReveal()
useParallax()

useSeoSchema({
  title: 'Кейсы и NDA-проекты на Vue 3 / Nuxt 3 — LAYER.DEV',
  description:
    'Фильтруемый каталог открытых и White Label (NDA) проектов на Nuxt 3, Vue 3, GSAP и Headless CMS с реальными метриками Lighthouse и Core Web Vitals.',
  path: '/cases',
  serviceName: 'Портфолио Vue / Nuxt разработки'
})
</script>

<template>
  <div>
    <div class="bg-canvas pt-10 pb-4">
      <div class="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <div class="studio-eyebrow">
          <span>Портфолио</span>
        </div>
        <h1 class="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary">
          Проекты и кейсы студии
        </h1>
      </div>
    </div>

    <CasesSection />
    <BriefAndContactSection />
  </div>
</template>
