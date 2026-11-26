<script setup lang="ts">
import BriefAndContactSection from '~/components/sections/BriefAndContactSection.vue'
import CasesSection from '~/components/sections/CasesSection.vue'
import CollaborationModels from '~/components/sections/CollaborationModels.vue'
import FaqSection from '~/components/sections/FaqSection.vue'
import HeroSection from '~/components/sections/HeroSection.vue'
import PartnerSegments from '~/components/sections/PartnerSegments.vue'
import ProcessPortal from '~/components/sections/ProcessPortal.vue'
import ProjectCalculator from '~/components/sections/ProjectCalculator.vue'
import SecurityManifesto from '~/components/sections/SecurityManifesto.vue'
import StudioMarquee from '~/components/sections/StudioMarquee.vue'
import { useParallax } from '~/composables/useParallax'
import { useScrollReveal } from '~/composables/useScrollReveal'
import { useSeoSchema } from '~/composables/useSeoSchema'
import { studioFaqs } from '~/data/studio'

useScrollReveal()
useParallax()

useSeoSchema({
  title: 'LAYER — Студия веб-разработки и цифрового дизайна',
  description:
    'Создаём стильные минималистичные сайты с анимациями и параллаксом, интернет-магазины, веб-сервисы и 3D-спецпроекты под ключ.',
  path: '/',
  serviceName: 'Веб-разработка и дизайн сайтов',
  faqs: studioFaqs
})
</script>

<template>
  <div>
    <HeroSection />
    <StudioMarquee />
    <CasesSection />
    <PartnerSegments />
    <CollaborationModels />
    <SecurityManifesto />
    <ProcessPortal />
    <ProjectCalculator />
    <FaqSection :items="studioFaqs" />
    <BriefAndContactSection />
  </div>
</template>
