<script setup lang="ts">
import { onMounted } from 'vue'
import BriefAndContactSection from '~/components/sections/BriefAndContactSection.vue'
import CasesSection from '~/components/sections/CasesSection.vue'
import FaqSection from '~/components/sections/FaqSection.vue'
import HeroSection from '~/components/sections/HeroSection.vue'
import ProcessPortal from '~/components/sections/ProcessPortal.vue'
import ProjectCalculator from '~/components/sections/ProjectCalculator.vue'
import SecurityManifesto from '~/components/sections/SecurityManifesto.vue'
import { useCalculatorState } from '~/composables/useCalculatorState'
import { useParallax } from '~/composables/useParallax'
import { useScrollReveal } from '~/composables/useScrollReveal'
import { useSeoSchema } from '~/composables/useSeoSchema'
import { studioFaqs } from '~/data/studio'

const { mode } = useCalculatorState()
onMounted(() => {
  mode.value = 'team'
})

useScrollReveal()
useParallax()

useSeoSchema({
  title: 'Аутстаффинг Vue 3 / Nuxt 3 разработчиков (Middle+ / Senior) за 48 ч — LAYER.DEV',
  description:
    'Усильте команду штатными Vue 3 и Nuxt 3 инженерами за 48 часов. Техническое интервью до договора, почасовая постоплата, замена по SLA, экономия до 24% vs инхаус-найм.',
  path: '/outstaffing-vue',
  serviceName: 'Аутстаффинг Vue.js и Nuxt.js разработчиков',
  faqs: studioFaqs
})
</script>

<template>
  <div>
    <HeroSection
      eyebrow="OUTSTAFFING · MIDDLE+ & SENIOR VUE / NUXT"
      title="Аутстаффинг Vue 3 / Nuxt 3 разработчиков с выходом за 48 часов"
      initial-scenario="outstaff"
      primary-cta-text="Рассчитать стоимость команды"
    />
    <ProjectCalculator :sync-url="false" />
    <ProcessPortal />
    <SecurityManifesto />
    <CasesSection :sync-url="false" initial-format="outstaff" />
    <FaqSection :items="studioFaqs" title="Вопросы по аутстаффингу" />
    <BriefAndContactSection />
  </div>
</template>
