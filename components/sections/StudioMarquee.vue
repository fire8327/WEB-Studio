<script setup lang="ts">
const itemsTop = [
  'ПРОМО-САЙТЫ И БРЕНДИНГ',
  'ИНТЕРНЕТ-МАГАЗИНЫ',
  'ВЕБ-СЕРВИСЫ И ПЛАТФОРМЫ',
  '3D И ИНТЕРАКТИВНЫЕ СЦЕНЫ',
  'ПАРАЛЛАКС И МИКРОАНИМАЦИИ',
  'UX/UI ДИЗАЙН И АРТ-ДИРЕКШН'
]

const itemsBottom = [
  'ПРОЕКТЫ ПОД КЛЮЧ',
  'ВЫСОКАЯ СКОРОСТЬ ЗАГРУЗКИ',
  'АДАПТИВ ПОД ВСЕ ЭКРАНЫ',
  'ЧИСТАЯ ТИПОГРАФИКА',
  'ПОДДЕРЖКА И РАЗВИТИЕ',
  'WHITE LABEL ДЛЯ АГЕНТСТВ'
]
</script>

<template>
  <section
    aria-label="Направления разработки студии"
    class="marquee-wrapper relative overflow-hidden border-y border-white/[0.08] bg-[#0B0B0E] py-5 sm:py-6 select-none"
  >
    <div class="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28 bg-gradient-to-r from-[#0B0B0E] to-transparent" />
    <div class="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28 bg-gradient-to-l from-[#0B0B0E] to-transparent" />

    <div class="space-y-3">
      <div class="animate-marquee">
        <div
          v-for="repeat in 2"
          :key="`top-${repeat}`"
          class="flex items-center gap-6 pr-6"
        >
          <div
            v-for="label in itemsTop"
            :key="`${repeat}-${label}`"
            class="flex items-center gap-6"
          >
            <span class="font-display text-xs sm:text-sm font-semibold tracking-wider text-primary/85 whitespace-nowrap">
              {{ label }}
            </span>
            <span class="h-1.5 w-1.5 rounded-full bg-emerald shrink-0" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div class="animate-marquee-reverse">
        <div
          v-for="repeat in 2"
          :key="`bot-${repeat}`"
          class="flex items-center gap-6 pr-6"
        >
          <div
            v-for="label in itemsBottom"
            :key="`${repeat}-${label}`"
            class="flex items-center gap-6"
          >
            <span class="text-[11px] sm:text-xs font-medium tracking-[0.16em] text-secondary/75 whitespace-nowrap">
              {{ label }}
            </span>
            <span class="text-emerald/60 text-xs shrink-0" aria-hidden="true">◆</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
