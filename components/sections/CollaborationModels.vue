<script setup lang="ts">
import { ArrowRight, CheckCircle2, MessageSquare } from 'lucide-vue-next'
import { useCalculatorState } from '~/composables/useCalculatorState'
import { collaborationModels } from '~/data/studio'
import type { CooperationModel } from '~/types'

const router = useRouter()
const route = useRoute()
const { mode } = useCalculatorState()

async function handleModelAction(item: CooperationModel) {
  if (item.actionType === 'calc-project') {
    mode.value = 'project'
    if (route.path === '/' || route.path === '/calculator' || route.path === '/white-label') {
      document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })
    }
    else {
      await router.push({ path: '/calculator', query: { mode: 'project' } })
    }
  }
  else if (item.actionType === 'calc-team') {
    mode.value = 'team'
    if (route.path === '/' || route.path === '/calculator' || route.path === '/outstaffing-vue') {
      document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })
    }
    else {
      await router.push({ path: '/calculator', query: { mode: 'team' } })
    }
  }
  else {
    if (document.getElementById('brief')) {
      document.getElementById('brief')?.scrollIntoView({ behavior: 'smooth' })
    }
    else {
      await router.push('/brief')
    }
  }
}
</script>

<template>
  <section id="models" class="bg-canvas py-16 sm:py-22 lg:py-28 border-t border-white/[0.06]">
    <div class="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 sm:mb-12 reveal-item">
        <div class="max-w-2xl">
          <div class="studio-eyebrow">
            <span>Форматы работы</span>
          </div>
          <h2 class="mt-4 font-display text-[1.5rem] sm:text-[2.1rem] lg:text-[2.4rem] font-bold leading-[1.15] tracking-[-0.025em] text-primary">
            Выбирайте формат под ваш текущий проект
          </h2>
        </div>
        <p class="text-sm text-secondary max-w-sm">
          От анонимного продакшна по макетам Figma до усиления вашей команды штатными Middle+/Senior разработчиками.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <article
          v-for="item in collaborationModels"
          :key="item.slug"
          class="bento-card relative overflow-hidden p-6 sm:p-8 flex flex-col justify-between gap-6 reveal-item"
        >
          <!-- Top accent strip -->
          <div
            class="absolute inset-x-0 top-0 h-[3px]"
            :class="{
              'bg-emerald': item.accent === 'emerald',
              'bg-indigo': item.accent === 'indigo',
              'bg-cyan': item.accent === 'cyan'
            }"
          />

          <div class="space-y-5">
            <div class="flex items-center justify-between gap-3">
              <span class="font-mono text-xs font-semibold text-muted">
                МОДЕЛЬ {{ item.number }}
              </span>
              <span
                class="rounded-full border px-3 py-1 font-mono text-[11px] font-semibold"
                :class="{
                  'border-emerald/35 bg-emerald/12 text-emerald': item.accent === 'emerald',
                  'border-indigo/40 bg-indigo/15 text-indigo-hover': item.accent === 'indigo',
                  'border-cyan/35 bg-cyan/12 text-cyan': item.accent === 'cyan'
                }"
              >
                {{ item.billingBadge }}
              </span>
            </div>

            <h3 class="font-sans text-xl sm:text-2xl font-bold text-primary">
              {{ item.title }}
            </h3>

            <ul class="space-y-3">
              <li
                v-for="bullet in item.bullets"
                :key="bullet"
                class="flex items-start gap-2.5 text-sm sm:text-[15px] text-secondary leading-relaxed"
              >
                <CheckCircle2 class="h-4 w-4 text-emerald shrink-0 mt-1" :stroke-width="2" />
                <span>{{ bullet }}</span>
              </li>
            </ul>
          </div>

          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/[0.08] pt-5">
            <div>
              <div class="font-mono text-lg font-bold text-primary tabular-nums">
                {{ item.priceLabel }}
              </div>
              <div class="font-mono text-xs text-muted">
                {{ item.timelineLabel }}
              </div>
            </div>

            <button
              type="button"
              class="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold btn-ghost hover:border-emerald/50 hover:text-emerald"
              @click="handleModelAction(item)"
            >
              <span>{{ item.ctaLabel }}</span>
              <ArrowRight class="h-4 w-4" :stroke-width="2" />
            </button>
          </div>
        </article>
      </div>

      <!-- BigTree108 Pattern: Custom Model Bar -->
      <div class="mt-6 rounded-2xl border border-white/10 bg-surface-elevated p-5 sm:p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 reveal-item">
        <div class="space-y-1">
          <h3 class="font-sans text-base sm:text-lg font-bold text-primary">
            Не подошла ни одна схема?
          </h3>
          <p class="text-sm text-secondary">
            Гибко комбинируем Fixed + T&amp;M под ваш контракт или подписываем ваш шаблон рамочного договора (MSA).
          </p>
        </div>

        <NuxtLink
          to="/#brief"
          class="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold btn-ghost shrink-0 hover:border-emerald/45"
        >
          <MessageSquare class="h-4 w-4 text-emerald" :stroke-width="1.75" />
          <span>Предложить свой формат</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
