<script setup lang="ts">
import { ArrowLeft, ArrowUpRight, CheckCircle2, Lock, ShieldCheck } from 'lucide-vue-next'
import { useSeoSchema } from '~/composables/useSeoSchema'
import { casesData } from '~/data/studio'

const route = useRoute()
const slug = String(route.params.slug ?? '')

const item = casesData.find(c => c.slug === slug)
if (!item) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Кейс не найден'
  })
}

useSeoSchema({
  title: `${item.title} — Кейс LAYER.DEV`,
  description: item.summary,
  path: `/cases/${item.slug}`
})
</script>

<template>
  <div v-if="item" class="bg-canvas py-12 sm:py-16 lg:py-20">
    <div class="mx-auto max-w-narrow px-4 sm:px-6 lg:px-8 space-y-8">
      <NuxtLink
        to="/cases"
        class="inline-flex items-center gap-2 font-mono text-xs font-semibold text-secondary hover:text-emerald transition-colors"
      >
        <ArrowLeft class="h-4 w-4" :stroke-width="2" />
        Все кейсы
      </NuxtLink>

      <header class="space-y-4">
        <div class="flex flex-wrap items-center gap-2.5">
          <span
            v-if="item.isNda"
            class="inline-flex items-center gap-1 rounded-full bg-[#F43F5E]/15 border border-[#F43F5E]/40 px-3 py-1 font-mono text-xs font-semibold text-[#F43F5E]"
          >
            <Lock class="h-3.5 w-3.5" :stroke-width="2" />
            NDA PROTECTED · WHITE LABEL
          </span>
          <span
            v-else
            class="inline-flex items-center gap-1 rounded-full bg-emerald/15 border border-emerald/35 px-3 py-1 font-mono text-xs font-semibold text-emerald"
          >
            <ShieldCheck class="h-3.5 w-3.5" :stroke-width="2" />
            {{ item.formatLabel }}
          </span>
          <span class="font-mono text-xs text-muted">
            {{ item.duration }} · {{ item.team }}
          </span>
        </div>

        <h1 class="font-sans text-2xl sm:text-4xl font-extrabold leading-tight tracking-tight text-primary">
          {{ item.title }}
        </h1>

        <p class="font-mono text-xs sm:text-sm text-secondary">
          {{ item.partnerLabel }} · Клиент: {{ item.clientLabel }}
        </p>
      </header>

      <div class="relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/12 bg-surface shadow-elevated">
        <img
          :src="item.image"
          :alt="item.title"
          class="h-full w-full object-cover object-center"
        >
        <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090B10]/75 via-transparent to-transparent" />
        <div class="absolute bottom-4 left-4 flex items-center gap-2">
          <span class="rounded-full border border-white/15 bg-[#090B10]/80 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
            {{ item.category }}
          </span>
          <span class="rounded-full border border-emerald/35 bg-[#090B10]/80 px-3 py-1 font-mono text-xs font-semibold text-emerald backdrop-blur-md">
            {{ item.year }}
          </span>
        </div>
      </div>

      <!-- CWV Metrics -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div class="rounded-xl border border-white/10 bg-surface p-4">
          <div class="font-mono text-[11px] uppercase text-muted">Lighthouse</div>
          <div class="mt-1 font-mono text-2xl font-bold text-emerald tabular-nums">{{ item.metrics.lighthouse }}/100</div>
        </div>
        <div class="rounded-xl border border-white/10 bg-surface p-4">
          <div class="font-mono text-[11px] uppercase text-muted">LCP</div>
          <div class="mt-1 font-mono text-2xl font-bold text-primary tabular-nums">{{ item.metrics.lcp }}</div>
        </div>
        <div class="rounded-xl border border-white/10 bg-surface p-4">
          <div class="font-mono text-[11px] uppercase text-muted">CLS</div>
          <div class="mt-1 font-mono text-2xl font-bold text-primary tabular-nums">{{ item.metrics.cls }}</div>
        </div>
        <div class="rounded-xl border border-white/10 bg-surface p-4">
          <div class="font-mono text-[11px] uppercase text-muted">INP</div>
          <div class="mt-1 font-mono text-2xl font-bold text-primary tabular-nums">{{ item.metrics.inp }}</div>
        </div>
      </div>

      <section class="space-y-4">
        <h2 class="font-sans text-xl font-bold text-primary">Задача и решение</h2>
        <p class="text-base text-secondary leading-relaxed">{{ item.summary }}</p>
      </section>

      <section class="rounded-2xl border border-white/10 bg-surface-elevated p-6 space-y-2">
        <h2 class="font-mono text-xs uppercase tracking-wider text-cyan">Инженерная архитектура</h2>
        <p class="text-sm sm:text-base text-secondary leading-relaxed">{{ item.architectureNote }}</p>
      </section>

      <section class="space-y-3">
        <h2 class="font-sans text-xl font-bold text-primary">Результаты и артефакты</h2>
        <ul class="space-y-2.5">
          <li
            v-for="point in item.deliverables"
            :key="point"
            class="flex items-start gap-2.5 text-sm sm:text-base text-primary/90"
          >
            <CheckCircle2 class="h-4 w-4 text-emerald shrink-0 mt-1" :stroke-width="2" />
            <span>{{ point }}</span>
          </li>
        </ul>
      </section>

      <blockquote
        v-if="item.partnerQuote"
        class="rounded-2xl border border-emerald/25 bg-emerald/[0.07] p-6 space-y-2"
      >
        <p class="text-base italic text-primary leading-relaxed">
          «{{ item.partnerQuote.text }}»
        </p>
        <footer class="font-mono text-xs text-emerald">
          — {{ item.partnerQuote.author }}, {{ item.partnerQuote.role }}
        </footer>
      </blockquote>

      <div class="flex flex-wrap gap-3 pt-4 border-t border-white/[0.08]">
        <NuxtLink to="/brief" class="inline-flex items-center gap-2 px-5 py-3 text-sm btn-emerald">
          <span>Обсудить похожий проект</span>
          <ArrowUpRight class="h-4 w-4" :stroke-width="2" />
        </NuxtLink>
        <NuxtLink to="/calculator" class="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold btn-ghost">
          Рассчитать смету
        </NuxtLink>
      </div>
    </div>
  </div>
</template>
