<script setup lang="ts">
import { Layers, Sparkles, Users, Zap } from 'lucide-vue-next'
import { partnerSegments } from '~/data/studio'

const iconMap = {
  sparkles: Sparkles,
  layers: Layers,
  zap: Zap,
  users: Users
} as const
</script>

<template>
  <section id="for-whom" class="bg-canvas-alt py-16 sm:py-22 lg:py-28 border-t border-white/[0.06]">
    <div class="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mb-10 sm:mb-12 reveal-item">
        <div class="studio-eyebrow">
          <span>Кому мы подходим</span>
        </div>
        <h2 class="mt-4 font-display text-[1.5rem] sm:text-[2.1rem] lg:text-[2.4rem] font-bold leading-[1.15] tracking-[-0.025em] text-primary">
          Закрываем веб-разработку и дизайн без риска для вашей репутации
        </h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        <article
          v-for="segment in partnerSegments"
          :key="segment.id"
          class="bento-card p-6 flex flex-col justify-between gap-5 reveal-item"
        >
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-emerald/25 bg-emerald/10 text-emerald">
                <component :is="iconMap[segment.icon]" class="h-5 w-5" :stroke-width="1.75" />
              </div>
              <span class="font-mono text-xs font-semibold text-muted tabular-nums">
                {{ segment.number }}
              </span>
            </div>

            <h3 class="font-sans text-lg font-bold leading-snug text-primary">
              {{ segment.title }}
            </h3>

            <div class="space-y-2.5 text-sm leading-relaxed">
              <p class="text-muted">
                <span class="font-semibold text-secondary">Боль:</span> {{ segment.pain }}
              </p>
              <p class="text-secondary">
                <span class="font-semibold text-emerald">Решение:</span> {{ segment.solution }}
              </p>
            </div>
          </div>

          <div class="pt-3 border-t border-white/[0.06]">
            <span class="inline-block rounded-md bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 font-mono text-[11px] font-medium text-primary/90">
              {{ segment.tag }}
            </span>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
