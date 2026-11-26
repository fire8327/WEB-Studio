<script setup lang="ts">
import BriefAndContactSection from '~/components/sections/BriefAndContactSection.vue'
import ProjectCalculator from '~/components/sections/ProjectCalculator.vue'
import { useParallax } from '~/composables/useParallax'
import { useScrollReveal } from '~/composables/useScrollReveal'
import { useSeoSchema } from '~/composables/useSeoSchema'

useScrollReveal()
useParallax()

useSeoSchema({
  title: 'Калькулятор сметы проекта и аутстафф-команды Vue / Nuxt — LAYER.DEV',
  description:
    'Онлайн-калькулятор стоимости White Label разработки на Nuxt 3 и расчёт выгоды аутстаффинга vs инхаус-найма с шарингом ссылки на смету.',
  path: '/calculator',
  serviceName: 'Калькулятор сметы разработки Vue / Nuxt'
})
</script>

<template>
  <div>
    <div class="bg-canvas pt-10 pb-2">
      <div class="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
        <div class="studio-eyebrow">
          <span>Конфигуратор сметы</span>
        </div>
        <h1 class="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-primary">
          Калькулятор проекта и команды
        </h1>
      </div>
    </div>

    <ProjectCalculator />
    <BriefAndContactSection />
  </div>
</template>
