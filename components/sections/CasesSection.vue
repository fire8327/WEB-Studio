<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { ArrowUpRight, Copy, Lock, Sparkles } from 'lucide-vue-next'
import CaseDetailDrawer from '~/components/ui/CaseDetailDrawer.vue'
import { useToast } from '~/composables/useToast'
import { casesData } from '~/data/studio'
import type { CaseFormatTag, CaseItem, CaseStackTag } from '~/types'

const props = withDefaults(
  defineProps<{
    syncUrl?: boolean
    initialFormat?: 'all' | CaseFormatTag
  }>(),
  {
    syncUrl: true,
    initialFormat: 'all'
  }
)

const route = useRoute()
const router = useRouter()
const { showToast } = useToast()

const selectedStack = ref<'all' | CaseStackTag>('all')
const selectedFormat = ref<'all' | CaseFormatTag>(props.initialFormat)
const activeDrawerCase = ref<CaseItem | null>(null)

const stackFilters: Array<{ key: 'all' | CaseStackTag, label: string }> = [
  { key: 'all', label: 'Все проекты' },
  { key: 'gsap', label: 'Анимации и 3D' },
  { key: 'vue3', label: 'Веб-сервисы' },
  { key: 'nuxt3', label: 'Сайты и порталы' },
  { key: 'headless', label: 'Каталоги и CMS' }
]

const formatFilters: Array<{ key: 'all' | CaseFormatTag, label: string }> = [
  { key: 'all', label: 'Любой формат' },
  { key: 'fixed', label: 'Под ключ' },
  { key: 'white-label', label: 'White Label / NDA' },
  { key: 'outstaff', label: 'Аутстафф' }
]

onMounted(() => {
  if (!import.meta.client) return
  const qStack = route.query.stack
  const qFormat = route.query.format
  if (typeof qStack === 'string' && stackFilters.some(f => f.key === qStack)) {
    selectedStack.value = qStack as 'all' | CaseStackTag
  }
  if (typeof qFormat === 'string' && formatFilters.some(f => f.key === qFormat)) {
    selectedFormat.value = qFormat as 'all' | CaseFormatTag
  }
})

watch([selectedStack, selectedFormat], ([stack, format]) => {
  if (!props.syncUrl || !import.meta.client) return
  const nextQuery = { ...route.query }
  if (stack === 'all') delete nextQuery.stack
  else nextQuery.stack = stack

  if (format === 'all') delete nextQuery.format
  else nextQuery.format = format

  router.replace({ query: nextQuery })
})

const filteredCases = computed(() => {
  return casesData.filter((item) => {
    const matchStack = selectedStack.value === 'all' || item.stacks.includes(selectedStack.value)
    const matchFormat = selectedFormat.value === 'all' || item.format === selectedFormat.value
    return matchStack && matchFormat
  })
})

function cardParallaxSpeed(index: number): string {
  const col = index % 3
  if (col === 1) return '0.07'
  if (col === 2) return '-0.04'
  return '0'
}

async function copyFilterLink() {
  if (!import.meta.client) return
  const params = new URLSearchParams()
  if (selectedStack.value !== 'all') params.set('stack', selectedStack.value)
  if (selectedFormat.value !== 'all') params.set('format', selectedFormat.value)
  const qs = params.toString()
  const url = `${window.location.origin}/cases${qs ? `?${qs}` : ''}`
  try {
    await navigator.clipboard.writeText(url)
    showToast('Ссылка на подборку кейсов скопирована')
  }
  catch {
    showToast('Не удалось скопировать ссылку', 'error')
  }
}

async function handleDiscussCase() {
  activeDrawerCase.value = null
  if (document.getElementById('brief')) {
    document.getElementById('brief')?.scrollIntoView({ behavior: 'smooth' })
  }
  else {
    await router.push('/brief')
  }
}
</script>

<template>
  <section id="cases" class="relative overflow-hidden bg-canvas-alt py-16 sm:py-22 lg:py-28">
    <!-- Subtle Parallax Ambient Spotlight -->
    <div
      data-parallax="0.14"
      class="pointer-events-none absolute -top-20 left-1/3 h-96 w-96 rounded-full bg-indigo/12 blur-[120px]"
      aria-hidden="true"
    />

    <div class="relative z-10 mx-auto max-w-container px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-4 mb-10 reveal-item">
        <div class="max-w-2xl">
          <div class="studio-eyebrow">
            <Sparkles class="h-3.5 w-3.5" :stroke-width="2" />
            <span>Портфолио студии</span>
          </div>
          <h2 class="mt-4 font-display text-[1.5rem] sm:text-[2.1rem] lg:text-[2.5rem] font-bold leading-[1.15] tracking-[-0.025em] text-primary">
            Избранные работы и цифровые продукты
          </h2>
          <p class="mt-3 text-sm sm:text-base text-secondary leading-relaxed">
            Промо-сайты с параллаксом и 3D, высоконагруженные маркетплейсы и финтех-сервисы — от идеи и дизайна до продакшна.
          </p>
        </div>

        <div class="flex items-center gap-2.5 self-start lg:self-auto">
          <button
            type="button"
            class="inline-flex items-center gap-2 px-3.5 py-2.5 text-xs font-semibold btn-ghost"
            @click="copyFilterLink"
          >
            <Copy class="h-3.5 w-3.5 text-emerald" :stroke-width="2" />
            <span>Поделиться подборкой</span>
          </button>
          <NuxtLink
            to="/cases"
            class="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold btn-ghost hover:border-emerald/45"
          >
            <span>Все кейсы</span>
            <ArrowUpRight class="h-3.5 w-3.5 text-emerald" :stroke-width="2" />
          </NuxtLink>
        </div>
      </div>

      <!-- Filter Bar -->
      <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-10">
        <div
          role="group"
          aria-label="Фильтр по технологиям"
          class="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1"
        >
          <button
            v-for="f in stackFilters"
            :key="f.key"
            type="button"
            class="shrink-0 rounded-full border px-4 py-1.5 text-xs font-semibold transition-all"
            :class="
              selectedStack === f.key
                ? 'border-emerald bg-emerald/15 text-emerald shadow-sm'
                : 'border-white/10 bg-white/[0.04] text-secondary hover:bg-white/[0.09] hover:text-primary'
            "
            @click="selectedStack = f.key"
          >
            {{ f.label }}
          </button>
        </div>

        <div
          role="group"
          aria-label="Фильтр по формату"
          class="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1"
        >
          <button
            v-for="f in formatFilters"
            :key="f.key"
            type="button"
            class="shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-semibold transition-all"
            :class="
              selectedFormat === f.key
                ? 'border-indigo bg-indigo/20 text-indigo-hover'
                : 'border-white/10 bg-white/[0.04] text-secondary hover:bg-white/[0.09] hover:text-primary'
            "
            @click="selectedFormat = f.key"
          >
            {{ f.label }}
          </button>
        </div>
      </div>

      <!-- Cases Showcase Grid with Staggered Parallax -->
      <div
        v-if="filteredCases.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7"
      >
        <article
          v-for="(item, index) in filteredCases"
          :key="item.id"
          :data-parallax="cardParallaxSpeed(index)"
          class="bento-card group flex flex-col justify-between overflow-hidden cursor-pointer reveal-item"
          tabindex="0"
          role="button"
          :aria-label="`Открыть детали кейса: ${item.title}`"
          @click="activeDrawerCase = item"
          @keydown.enter.prevent="activeDrawerCase = item"
          @keydown.space.prevent="activeDrawerCase = item"
        >
          <div>
            <!-- Real Visual Portfolio Mockup -->
            <div class="relative aspect-[16/10] w-full overflow-hidden bg-[#090B10] border-b border-white/[0.08]">
              <img
                :src="item.image"
                :alt="item.title"
                loading="lazy"
                class="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              >

              <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#090B10]/85 via-transparent to-[#090B10]/30" />

              <!-- Top Badges -->
              <div class="absolute inset-x-3.5 top-3.5 flex items-center justify-between gap-2">
                <span class="rounded-full border border-white/15 bg-[#090B10]/75 px-2.5 py-1 text-[11px] font-semibold text-primary backdrop-blur-md">
                  {{ item.category }}
                </span>

                <span
                  v-if="item.isNda"
                  class="inline-flex items-center gap-1 rounded-full border border-[#F43F5E]/40 bg-[#090B10]/80 px-2.5 py-1 text-[10px] font-bold tracking-wider text-[#F43F5E] backdrop-blur-md"
                >
                  <Lock class="h-2.5 w-2.5" :stroke-width="2" />
                  NDA
                </span>
                <span
                  v-else
                  class="rounded-full border border-emerald/35 bg-[#090B10]/80 px-2.5 py-1 font-mono text-[10px] font-bold text-emerald backdrop-blur-md"
                >
                  {{ item.year }}
                </span>
              </div>

              <!-- Hover Reveal CTA -->
              <div class="absolute bottom-3.5 right-3.5 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                <span class="inline-flex items-center gap-1 rounded-full bg-emerald px-3 py-1 text-[11px] font-bold text-[#090B10] shadow-glow-emerald">
                  Смотреть кейс
                  <ArrowUpRight class="h-3.5 w-3.5" :stroke-width="2.5" />
                </span>
              </div>
            </div>

            <!-- Case Body -->
            <div class="p-5 sm:p-6 space-y-3">
              <div class="text-xs font-medium text-muted truncate">
                {{ item.partnerLabel }}
              </div>

              <h3 class="font-sans text-lg font-bold leading-snug text-primary group-hover:text-emerald transition-colors">
                {{ item.title }}
              </h3>

              <p class="text-sm text-secondary line-clamp-3 leading-relaxed">
                {{ item.summary }}
              </p>

              <div class="flex flex-wrap gap-1.5 pt-1">
                <span
                  v-for="tag in item.stackLabels"
                  :key="tag"
                  class="rounded-md bg-white/[0.04] border border-white/[0.08] px-2.5 py-0.5 text-[11px] font-medium text-secondary"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- Bottom Delivery Bar -->
          <div class="border-t border-white/[0.07] bg-surface-elevated/60 px-5 py-3.5 flex items-center justify-between gap-2 text-xs">
            <div class="flex items-center gap-3 text-[11px] font-medium tabular-nums">
              <span class="text-emerald font-semibold">{{ item.year }}</span>
              <span class="text-secondary">{{ item.duration }}</span>
            </div>

            <span class="inline-flex items-center gap-1 font-semibold text-primary group-hover:text-emerald transition-colors">
              Смотреть
              <ArrowUpRight class="h-3.5 w-3.5" :stroke-width="2" />
            </span>
          </div>
        </article>
      </div>

      <div
        v-else
        class="rounded-2xl border border-white/10 bg-surface p-10 text-center space-y-3"
      >
        <p class="text-base font-semibold text-primary">
          По выбранной комбинации фильтров кейсов нет
        </p>
        <button
          type="button"
          class="px-4 py-2 text-sm btn-ghost"
          @click="selectedStack = 'all'; selectedFormat = 'all'"
        >
          Сбросить фильтры
        </button>
      </div>
    </div>

    <CaseDetailDrawer
      :item="activeDrawerCase"
      @close="activeDrawerCase = null"
      @discuss="handleDiscussCase"
    />
  </section>
</template>
