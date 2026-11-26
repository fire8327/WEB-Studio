<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue'
import { ArrowUpRight, CheckCircle2, ExternalLink, Lock, ShieldCheck, X } from 'lucide-vue-next'
import type { CaseItem } from '~/types'

const props = defineProps<{
  item: CaseItem | null
}>()

const emit = defineEmits<{
  close: []
  discuss: [item: CaseItem]
}>()

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.item) {
    emit('close')
  }
}

watch(
  () => props.item,
  (val) => {
    if (!import.meta.client) return
    document.body.style.overflow = val ? 'hidden' : ''
  }
)

onMounted(() => {
  if (!import.meta.client) return
  window.addEventListener('keydown', onKeydown)
})

onUnmounted(() => {
  if (!import.meta.client) return
  document.body.style.overflow = ''
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="item"
        class="fixed inset-0 z-[70] flex justify-end bg-black/70 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        :aria-label="item.title"
        @click.self="emit('close')"
      >
        <div class="relative h-full w-full max-w-[660px] overflow-y-auto border-l border-white/12 bg-surface p-6 sm:p-8 shadow-elevated flex flex-col justify-between gap-8">
          <div class="space-y-6">
            <!-- Top Bar -->
            <div class="flex items-start justify-between gap-4 border-b border-white/[0.08] pb-4">
              <div class="space-y-2">
                <div class="flex flex-wrap items-center gap-2">
                  <span
                    v-if="item.isNda"
                    class="inline-flex items-center gap-1 rounded-full bg-[#F43F5E]/15 border border-[#F43F5E]/40 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-[#F43F5E]"
                  >
                    <Lock class="h-3 w-3" :stroke-width="2" />
                    NDA PROTECTED · WHITE LABEL
                  </span>
                  <span
                    v-else
                    class="inline-flex items-center gap-1 rounded-full bg-emerald/15 border border-emerald/35 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-emerald"
                  >
                    <ShieldCheck class="h-3 w-3" :stroke-width="2" />
                    {{ item.formatLabel }}
                  </span>
                  <span class="font-mono text-xs text-muted">
                    {{ item.duration }} · {{ item.team }}
                  </span>
                </div>

                <h3 class="font-sans text-xl sm:text-2xl font-bold text-primary leading-snug">
                  {{ item.title }}
                </h3>
                <p class="font-mono text-xs text-secondary">
                  {{ item.partnerLabel }} · Клиент: {{ item.clientLabel }}
                </p>
              </div>

              <button
                type="button"
                class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/12 bg-surface-elevated text-secondary hover:text-primary hover:border-white/25"
                aria-label="Закрыть детали кейса"
                @click="emit('close')"
              >
                <X class="h-5 w-5" :stroke-width="1.75" />
              </button>
            </div>

            <!-- Project Visual Preview -->
            <div class="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/12 bg-[#090B10]">
              <img
                :src="item.image"
                :alt="item.title"
                class="h-full w-full object-cover object-center"
              >
              <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090B10]/70 via-transparent to-transparent" />
              <span class="absolute bottom-3 left-3 rounded-full border border-white/15 bg-[#090B10]/80 px-3 py-1 text-xs font-semibold text-primary backdrop-blur-md">
                {{ item.category }} · {{ item.year }}
              </span>
            </div>

            <!-- CWV Metrics Strip -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div class="rounded-xl border border-white/10 bg-surface-elevated p-3">
                <div class="font-mono text-[10px] uppercase text-muted">Lighthouse</div>
                <div class="mt-1 font-mono text-xl font-bold text-emerald tabular-nums">
                  {{ item.metrics.lighthouse }}/100
                </div>
              </div>
              <div class="rounded-xl border border-white/10 bg-surface-elevated p-3">
                <div class="font-mono text-[10px] uppercase text-muted">LCP</div>
                <div class="mt-1 font-mono text-xl font-bold text-primary tabular-nums">
                  {{ item.metrics.lcp }}
                </div>
              </div>
              <div class="rounded-xl border border-white/10 bg-surface-elevated p-3">
                <div class="font-mono text-[10px] uppercase text-muted">CLS</div>
                <div class="mt-1 font-mono text-xl font-bold text-primary tabular-nums">
                  {{ item.metrics.cls }}
                </div>
              </div>
              <div class="rounded-xl border border-white/10 bg-surface-elevated p-3">
                <div class="font-mono text-[10px] uppercase text-muted">INP</div>
                <div class="mt-1 font-mono text-xl font-bold text-primary tabular-nums">
                  {{ item.metrics.inp }}
                </div>
              </div>
            </div>

            <!-- Summary & Architecture -->
            <div class="space-y-4">
              <div>
                <h4 class="font-mono text-xs uppercase tracking-wider text-emerald mb-1.5">
                  Задача и контекст
                </h4>
                <p class="text-sm sm:text-base text-secondary leading-relaxed">
                  {{ item.summary }}
                </p>
              </div>

              <div class="rounded-xl border border-white/10 bg-[#0D1017] p-4">
                <h4 class="font-mono text-xs uppercase tracking-wider text-cyan mb-1.5">
                  Инженерная архитектура
                </h4>
                <p class="text-sm text-secondary leading-relaxed">
                  {{ item.architectureNote }}
                </p>
              </div>
            </div>

            <!-- Deliverables -->
            <div>
              <h4 class="font-mono text-xs uppercase tracking-wider text-muted mb-3">
                Что было поставлено в продакшн
              </h4>
              <ul class="space-y-2.5">
                <li
                  v-for="point in item.deliverables"
                  :key="point"
                  class="flex items-start gap-2.5 text-sm text-primary/90"
                >
                  <CheckCircle2 class="h-4 w-4 text-emerald shrink-0 mt-0.5" :stroke-width="2" />
                  <span>{{ point }}</span>
                </li>
              </ul>
            </div>

            <!-- Stack tags -->
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in item.stackLabels"
                :key="tag"
                class="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-xs text-secondary"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Partner Quote -->
            <blockquote
              v-if="item.partnerQuote"
              class="rounded-xl border border-emerald/25 bg-emerald/[0.07] p-4 space-y-2"
            >
              <p class="text-sm italic text-primary leading-relaxed">
                «{{ item.partnerQuote.text }}»
              </p>
              <footer class="font-mono text-xs text-emerald">
                — {{ item.partnerQuote.author }}, {{ item.partnerQuote.role }}
              </footer>
            </blockquote>
          </div>

          <!-- Footer Actions -->
          <div class="flex flex-col sm:flex-row gap-3 border-t border-white/[0.08] pt-5">
            <button
              type="button"
              class="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-sm btn-emerald"
              @click="emit('discuss', item)"
            >
              <span>Обсудить похожий проект</span>
              <ArrowUpRight class="h-4 w-4" :stroke-width="2" />
            </button>
            <NuxtLink
              :to="`/cases/${item.slug}`"
              class="inline-flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold btn-ghost"
              @click="emit('close')"
            >
              <span>Открыть страницу</span>
              <ExternalLink class="h-4 w-4 text-secondary" :stroke-width="1.75" />
            </NuxtLink>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
