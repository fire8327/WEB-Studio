<script setup lang="ts">
import { Code2, Cpu, Layers, Sparkles, Terminal } from 'lucide-vue-next'
import { techStackCategories } from '~/data/studio'

const iconByCategory: Record<string, typeof Code2> = {
  core: Code2,
  ui: Layers,
  motion: Sparkles,
  backend: Cpu,
  ops: Terminal
}
</script>

<template>
  <section id="stack" class="bg-canvas py-16 sm:py-22 lg:py-28 border-t border-white/[0.06]">
    <div class="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mb-10 sm:mb-12 reveal-item">
        <div class="studio-eyebrow">
          <span>Стек и анимации</span>
        </div>
        <h2 class="mt-4 font-display text-[1.5rem] sm:text-[2.1rem] lg:text-[2.4rem] font-bold leading-[1.15] tracking-[-0.025em] text-primary">
          Современные технологии вместо шаблонных конструкторов
        </h2>
      </div>

      <!-- 5 Stack Categories + 6th Proof Bento Block -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <article
          v-for="cat in techStackCategories"
          :key="cat.id"
          class="bento-card p-6 flex flex-col justify-between gap-5 reveal-item"
        >
          <div>
            <div class="flex items-center justify-between gap-2">
              <h3 class="font-sans text-lg font-bold text-primary">
                {{ cat.title }}
              </h3>
              <component
                :is="iconByCategory[cat.id] ?? Code2"
                class="h-5 w-5 text-emerald shrink-0"
                :stroke-width="1.75"
              />
            </div>
            <p class="mt-1 text-xs text-muted">
              {{ cat.subtitle }}
            </p>
          </div>

          <div class="space-y-2">
            <div
              v-for="item in cat.items"
              :key="item.name"
              class="flex items-center justify-between gap-2 rounded-lg border border-white/[0.06] bg-surface-elevated px-3 py-2"
            >
              <span class="text-sm font-semibold text-primary">
                {{ item.name }}
              </span>
              <span class="font-mono text-[11px] text-secondary text-right">
                {{ item.level }}
              </span>
            </div>
          </div>
        </article>

        <!-- 6th Bento Block: Studio Quality Card -->
        <article
          data-parallax="0.06"
          class="relative overflow-hidden rounded-lg border border-emerald/55 bg-gradient-to-br from-emerald/15 via-surface-elevated to-indigo/15 p-6 flex flex-col justify-between gap-5 shadow-glow-emerald reveal-item"
        >
          <div class="space-y-3">
            <span class="inline-flex items-center gap-2 rounded-full border border-emerald/40 bg-emerald/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-emerald">
              Craft &amp; Speed
            </span>
            <h3 class="font-display text-lg font-bold text-primary">
              Дизайн + Анимации + 98+ Speed
            </h3>
            <p class="text-sm leading-relaxed text-secondary">
              Совмещаем выразительный моушн (параллакс, GSAP, Three.js) с идеальной скоростью загрузки и чистой адаптивной вёрсткой.
            </p>
          </div>

          <div class="grid grid-cols-2 gap-2 text-xs font-semibold">
            <div class="rounded-lg border border-white/12 bg-canvas/70 px-3 py-2 text-emerald">
              60 FPS Scroll
            </div>
            <div class="rounded-lg border border-white/12 bg-canvas/70 px-3 py-2 text-primary">
              Pixel Perfect
            </div>
            <div class="rounded-lg border border-white/12 bg-canvas/70 px-3 py-2 text-primary">
              SSR &amp; SEO Ready
            </div>
            <div class="rounded-lg border border-white/12 bg-canvas/70 px-3 py-2 text-emerald">
              Responsive UI
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
