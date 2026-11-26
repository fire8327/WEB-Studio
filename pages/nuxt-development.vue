<script setup lang="ts">
import BriefAndContactSection from '~/components/sections/BriefAndContactSection.vue'
import CasesSection from '~/components/sections/CasesSection.vue'
import FaqSection from '~/components/sections/FaqSection.vue'
import HeroSection from '~/components/sections/HeroSection.vue'
import ProjectCalculator from '~/components/sections/ProjectCalculator.vue'
import TechStackMatrix from '~/components/sections/TechStackMatrix.vue'
import { useParallax } from '~/composables/useParallax'
import { useScrollReveal } from '~/composables/useScrollReveal'
import { useSeoSchema } from '~/composables/useSeoSchema'
import { studioFaqs } from '~/data/studio'

useScrollReveal()
useParallax()

useSeoSchema({
  title: 'Разработка на Nuxt 3 SSR/SSG с Core Web Vitals 95+ — LAYER.DEV',
  description:
    'Проектируем быстрые корпоративные порталы, e-commerce и SaaS на Nuxt 3 (SSR, ISR, Nitro) с идеальным SEO и Lighthouse 95–100 для партнёров и прямых продуктов.',
  path: '/nuxt-development',
  serviceName: 'Разработка на Nuxt 3 (SSR / SSG / ISR)',
  faqs: studioFaqs
})
</script>

<template>
  <div>
    <HeroSection
      eyebrow="NUXT 3 SSR / ISR · CORE WEB VITALS 95+"
      title="Разработка быстрых веб-платформ на Nuxt 3 с идеальным SEO и SSR"
      initial-scenario="pod"
      primary-cta-text="Оценить Nuxt 3 проект"
    />
    <TechStackMatrix />
    <CasesSection :sync-url="false" />
    <ProjectCalculator :sync-url="false" />
    <FaqSection :items="studioFaqs" />
    <BriefAndContactSection />
  </div>
</template>
