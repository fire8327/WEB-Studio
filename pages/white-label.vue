<script setup lang="ts">
import { onMounted } from 'vue'
import BriefAndContactSection from '~/components/sections/BriefAndContactSection.vue'
import CasesSection from '~/components/sections/CasesSection.vue'
import CollaborationModels from '~/components/sections/CollaborationModels.vue'
import FaqSection from '~/components/sections/FaqSection.vue'
import HeroSection from '~/components/sections/HeroSection.vue'
import ProjectCalculator from '~/components/sections/ProjectCalculator.vue'
import SecurityManifesto from '~/components/sections/SecurityManifesto.vue'
import { useCalculatorState } from '~/composables/useCalculatorState'
import { useParallax } from '~/composables/useParallax'
import { useScrollReveal } from '~/composables/useScrollReveal'
import { useSeoSchema } from '~/composables/useSeoSchema'
import { studioFaqs } from '~/data/studio'

const { mode } = useCalculatorState()
onMounted(() => {
  mode.value = 'project'
})

useScrollReveal()
useParallax()

useSeoSchema({
  title: 'White Label разработка на Vue 3 и Nuxt 3 для digital-агентств — LAYER.DEV',
  description:
    'Технический подрядчик под брендом вашего агентства: вёрстка из Figma, Nuxt 3 SSR, GSAP-анимации и интеграции под строгим NDA. Оценка за 24 ч, гарантия 90 дней.',
  path: '/white-label',
  serviceName: 'White Label разработка сайтов и сервисов на Vue / Nuxt',
  faqs: studioFaqs
})
</script>

<template>
  <div>
    <HeroSection
      eyebrow="WHITE LABEL PARTNER · FIXED PRICE & POD"
      title="White Label разработка на Vue и Nuxt под брендом вашей студии"
      initial-scenario="outstaff"
      primary-cta-text="Рассчитать проект по Figma"
    />
    <SecurityManifesto />
    <CollaborationModels />
    <ProjectCalculator :sync-url="false" />
    <CasesSection :sync-url="false" initial-format="white-label" />
    <FaqSection :items="studioFaqs" title="Вопросы по White Label" />
    <BriefAndContactSection />
  </div>
</template>
