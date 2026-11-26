<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import {
  ArrowRight,
  Calculator,
  Check,
  Copy,
  HelpCircle,
  Minus,
  Plus,
  SlidersHorizontal,
  Sparkles,
  X
} from 'lucide-vue-next'
import TelegramIcon from '~/components/icons/TelegramIcon.vue'
import AnimatedNumber from '~/components/ui/AnimatedNumber.vue'
import { siteConfig } from '~/config/site'
import { useCalculatorState } from '~/composables/useCalculatorState'
import { useToast } from '~/composables/useToast'
import {
  calculatorOptions,
  calculatorPresets,
  outstaffRoles
} from '~/data/studio'

const props = withDefaults(
  defineProps<{
    syncUrl?: boolean
  }>(),
  {
    syncUrl: true
  }
)

const route = useRoute()
const router = useRouter()
const { showToast } = useToast()

const {
  mode,
  currency,
  presetId,
  selectedOptions,
  urgency,
  roleCounts,
  frontendGrade,
  hoursPerMonth,
  durationMonths,
  includeInHouseHiddenCosts,
  activePreset,
  chosenOptionItems,
  projectEstimate,
  teamEstimate,
  convertMoney,
  formatMoney,
  selectPreset,
  toggleOption,
  updateRoleCount,
  attachCurrentEstimateToBrief,
  buildShareQuery,
  hydrateFromQuery
} = useCalculatorState()

const openTooltipId = ref<string | null>(null)

function toggleTooltip(id: string) {
  openTooltipId.value = openTooltipId.value === id ? null : id
}

function handleGlobalKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') {
    openTooltipId.value = null
  }
}

function handleOutsideClick(e: MouseEvent) {
  const target = e.target as HTMLElement | null
  if (!target?.closest('[data-tooltip-container]')) {
    openTooltipId.value = null
  }
}

onMounted(() => {
  if (!import.meta.client) return
  hydrateFromQuery(route.query as Record<string, unknown>)
  window.addEventListener('keydown', handleGlobalKeydown)
  window.addEventListener('click', handleOutsideClick)
})

onUnmounted(() => {
  if (!import.meta.client) return
  window.removeEventListener('keydown', handleGlobalKeydown)
  window.removeEventListener('click', handleOutsideClick)
})

watch(
  [mode, currency, presetId, selectedOptions, urgency, frontendGrade, hoursPerMonth, durationMonths, includeInHouseHiddenCosts],
  () => {
    if (!props.syncUrl || !import.meta.client) return
    const nextQuery = { ...route.query, ...buildShareQuery() }
    router.replace({ query: nextQuery })
  },
  { deep: true }
)

async function copyShareLink() {
  if (!import.meta.client) return
  const query = new URLSearchParams(buildShareQuery()).toString()
  const basePath = route.path === '/calculator' ? '/calculator' : '/'
  const url = `${window.location.origin}${basePath}?${query}#calculator`
  try {
    await navigator.clipboard.writeText(url)
    showToast('Ссылка на смету скопирована в буфер')
  }
  catch {
    showToast('Скопируйте ссылку из адресной строки', 'info')
  }
}

async function lockEstimateIntoBrief() {
  attachCurrentEstimateToBrief()
  showToast('Расчёт прикреплён к шагу 3 брифа')
  if (document.getElementById('brief')) {
    document.getElementById('brief')?.scrollIntoView({ behavior: 'smooth' })
  }
  else {
    await router.push('/brief')
  }
}
</script>

<template>
  <section id="calculator" class="bg-canvas py-16 sm:py-22 lg:py-28 border-t border-white/[0.06]">
    <div class="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
      <!-- Calculator Header -->
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 reveal-item">
        <div class="space-y-3">
          <div class="studio-eyebrow">
            <span>Калькулятор стоимости</span>
          </div>
          <h2 class="font-display text-[1.5rem] sm:text-[2.1rem] lg:text-[2.4rem] font-bold leading-[1.15] tracking-[-0.025em] text-primary">
            Прозрачный расчёт за 30 секунд
          </h2>
        </div>

        <!-- Mode Switcher + Currency Toggle -->
        <div class="flex flex-wrap items-center gap-3">
          <div
            role="tablist"
            aria-label="Режим расчёта"
            class="inline-flex rounded-xl border border-white/10 bg-surface p-1 gap-1"
          >
            <button
              type="button"
              role="tab"
              :aria-selected="mode === 'project'"
              class="inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all"
              :class="
                mode === 'project'
                  ? 'bg-emerald/15 text-emerald border border-emerald/40'
                  : 'text-secondary hover:text-primary border border-transparent'
              "
              @click="mode = 'project'"
            >
              <Calculator class="h-4 w-4 shrink-0" :stroke-width="1.75" />
              <span>Проект под ключ (Fixed)</span>
            </button>

            <button
              type="button"
              role="tab"
              :aria-selected="mode === 'team'"
              class="inline-flex items-center gap-2 rounded-lg px-3.5 py-2 text-xs sm:text-sm font-semibold transition-all"
              :class="
                mode === 'team'
                  ? 'bg-indigo/20 text-indigo-hover border border-indigo/40'
                  : 'text-secondary hover:text-primary border border-transparent'
              "
              @click="mode = 'team'"
            >
              <SlidersHorizontal class="h-4 w-4 shrink-0" :stroke-width="1.75" />
              <span>Команда под проект</span>
            </button>
          </div>

          <div
            role="group"
            aria-label="Валюта расчёта"
            class="inline-flex rounded-xl border border-white/10 bg-surface p-1"
          >
            <button
              type="button"
              class="rounded-lg px-3 py-2 font-mono text-xs font-bold transition-colors"
              :class="currency === 'RUB' ? 'bg-surface-elevated text-emerald' : 'text-muted hover:text-primary'"
              @click="currency = 'RUB'"
            >
              ₽ RUB
            </button>
            <button
              type="button"
              class="rounded-lg px-3 py-2 font-mono text-xs font-bold transition-colors"
              :class="currency === 'USD' ? 'bg-surface-elevated text-emerald' : 'text-muted hover:text-primary'"
              @click="currency = 'USD'"
            >
              $ USD
            </button>
          </div>
        </div>
      </div>

      <!-- Mode A: Fixed Price Project Calculator -->
      <div
        v-if="mode === 'project'"
        class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
      >
        <!-- Left Config Panel (60% -> 7 cols) -->
        <div class="lg:col-span-7 space-y-6">
          <!-- Step 1: Presets -->
          <div class="rounded-2xl border border-white/10 bg-surface p-5 sm:p-6 space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="font-sans text-base sm:text-lg font-bold text-primary">
                1. Выберите стартовый пресет
              </h3>
              <span class="font-mono text-xs text-muted">Fixed Price</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                v-for="preset in calculatorPresets"
                :key="preset.id"
                type="button"
                class="rounded-xl border p-4 text-left transition-all duration-200"
                :class="
                  presetId === preset.id
                    ? 'border-emerald bg-emerald/10 shadow-sm'
                    : 'border-white/10 bg-surface-elevated hover:border-white/25'
                "
                @click="selectPreset(preset.id)"
              >
                <div class="flex items-start justify-between gap-2">
                  <span class="font-sans text-sm font-bold text-primary">
                    {{ preset.title }}
                  </span>
                  <span
                    class="h-4 w-4 rounded-full border flex items-center justify-center shrink-0 mt-0.5"
                    :class="presetId === preset.id ? 'border-emerald bg-emerald text-[#090B10]' : 'border-white/25'"
                  >
                    <Check v-if="presetId === preset.id" class="h-3 w-3" :stroke-width="3" />
                  </span>
                </div>
                <p class="mt-1.5 text-xs text-secondary leading-relaxed">
                  {{ preset.description }}
                </p>
                <div class="mt-3 flex items-center justify-between font-mono text-xs tabular-nums">
                  <span class="font-bold text-emerald">от {{ formatMoney(preset.priceRub) }}</span>
                  <span class="text-muted">{{ preset.durationLabel }}</span>
                </div>
              </button>
            </div>
          </div>

          <!-- Step 2: Modular Options with accessible '?' Tooltips -->
          <div class="rounded-2xl border border-white/10 bg-surface p-5 sm:p-6 space-y-4">
            <div class="flex items-center justify-between">
              <h3 class="font-sans text-base sm:text-lg font-bold text-primary">
                2. Дополнительные опции и фишки
              </h3>
              <span class="font-mono text-xs text-muted">Нажмите ? для деталей</span>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div
                v-for="opt in calculatorOptions"
                :key="opt.id"
                data-tooltip-container
                class="relative rounded-xl border p-3.5 transition-all"
                :class="
                  selectedOptions.includes(opt.id)
                    ? 'border-emerald bg-emerald/10'
                    : 'border-white/10 bg-surface-elevated hover:border-white/25'
                "
              >
                <div class="flex items-start justify-between gap-2">
                  <button
                    type="button"
                    class="flex flex-1 items-start gap-2.5 text-left"
                    :aria-pressed="selectedOptions.includes(opt.id)"
                    @click="toggleOption(opt.id)"
                  >
                    <span
                      class="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-colors"
                      :class="
                        selectedOptions.includes(opt.id)
                          ? 'border-emerald bg-emerald text-[#090B10]'
                          : 'border-white/25 bg-transparent'
                      "
                    >
                      <Check v-if="selectedOptions.includes(opt.id)" class="h-3 w-3" :stroke-width="3" />
                    </span>
                    <span class="text-xs sm:text-sm font-semibold text-primary leading-snug">
                      {{ opt.title }}
                    </span>
                  </button>

                  <button
                    type="button"
                    class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/20 text-secondary hover:border-emerald hover:bg-emerald hover:text-[#090B10] transition-colors"
                    :aria-expanded="openTooltipId === opt.id"
                    :aria-label="`Подробнее об опции: ${opt.title}`"
                    @click.stop="toggleTooltip(opt.id)"
                    @mouseenter="openTooltipId = opt.id"
                    @mouseleave="openTooltipId = null"
                  >
                    <HelpCircle class="h-3.5 w-3.5" :stroke-width="2" />
                  </button>
                </div>

                <div class="mt-2.5 pl-6 flex items-center justify-between font-mono text-[11px] tabular-nums">
                  <span class="text-emerald font-semibold">+{{ formatMoney(opt.priceRub) }}</span>
                  <span class="text-muted">+{{ opt.days }} дн.</span>
                </div>

                <!-- Accessible Tooltip Popover -->
                <div
                  v-if="openTooltipId === opt.id"
                  role="tooltip"
                  class="absolute left-2 right-2 bottom-full mb-2 z-[90] rounded-lg border border-emerald/35 bg-[#0D1017] p-3 text-xs leading-relaxed text-primary shadow-elevated"
                >
                  {{ opt.tooltip }}
                </div>
              </div>
            </div>
          </div>

          <!-- Step 3: Urgency -->
          <div class="rounded-2xl border border-white/10 bg-surface p-5 sm:p-6 space-y-4">
            <h3 class="font-sans text-base sm:text-lg font-bold text-primary">
              3. Темп и срочность запуска
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                class="rounded-xl border p-4 text-left transition-all"
                :class="urgency === 'standard' ? 'border-emerald bg-emerald/10' : 'border-white/10 bg-surface-elevated hover:border-white/25'"
                @click="urgency = 'standard'"
              >
                <div class="flex items-center justify-between">
                  <span class="text-sm font-bold text-primary">Стандартный темп</span>
                  <span class="font-mono text-xs font-semibold text-emerald">×1.0</span>
                </div>
                <p class="mt-1 text-xs text-secondary">
                  Плановые спринты, еженедельные демо, комфортный запас на QA.
                </p>
              </button>

              <button
                type="button"
                class="rounded-xl border p-4 text-left transition-all"
                :class="urgency === 'express' ? 'border-emerald bg-emerald/10' : 'border-white/10 bg-surface-elevated hover:border-white/25'"
                @click="urgency = 'express'"
              >
                <div class="flex items-center justify-between">
                  <span class="text-sm font-bold text-primary">Ускоренный старт / Hotfix дедлайна</span>
                  <span class="font-mono text-xs font-semibold text-[#F59E0B]">×1.25</span>
                </div>
                <p class="mt-1 text-xs text-secondary">
                  Выделяем двойную смену разработки для сдачи к жёсткому тендерному сроку.
                </p>
              </button>
            </div>
          </div>
        </div>

        <!-- Right Sticky Summary Card (40% -> 5 cols) -->
        <aside class="lg:col-span-5 lg:sticky lg:top-24 rounded-2xl border border-emerald/40 bg-surface-elevated p-6 sm:p-7 shadow-elevated space-y-5">
          <div class="flex items-center justify-between gap-2">
            <span class="font-mono text-xs uppercase tracking-wider text-emerald">
              Предварительная смета
            </span>
            <span class="rounded-full bg-emerald/15 border border-emerald/35 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-emerald">
              Фиксируем в договоре
            </span>
          </div>

          <div>
            <div class="font-mono text-2xl sm:text-3xl font-bold text-primary tabular-nums">
              <template v-if="currency === 'USD'">$</template>
              <AnimatedNumber :value="convertMoney(projectEstimate.minRub)" />
              <span class="text-muted"> – </span>
              <template v-if="currency === 'USD'">$</template>
              <AnimatedNumber :value="convertMoney(projectEstimate.maxRub)" />
              <template v-if="currency === 'RUB'"> ₽</template>
            </div>
            <div class="mt-2 font-mono text-sm text-secondary tabular-nums">
              Ориентировочный срок: <span class="text-primary font-semibold">{{ projectEstimate.weeksMin }}–{{ projectEstimate.weeksMax }} недели</span>
            </div>
          </div>

          <!-- Value Hint -->
          <div class="rounded-xl border border-emerald/25 bg-emerald/10 px-4 py-3 flex items-center gap-2.5 text-xs text-emerald font-medium">
            <Sparkles class="h-4 w-4 shrink-0" :stroke-width="2" />
            <span>Для агентств и дизайн-студий действуют партнёрские условия</span>
          </div>

          <!-- Selected Items List -->
          <div class="space-y-2 border-t border-white/[0.08] pt-4">
            <div class="flex items-center justify-between text-xs text-secondary">
              <span>Пресет: <strong class="text-primary">{{ activePreset.title }}</strong></span>
              <span class="font-mono tabular-nums">{{ formatMoney(activePreset.priceRub) }}</span>
            </div>

            <div
              v-for="opt in chosenOptionItems"
              :key="opt.id"
              class="flex items-center justify-between gap-2 text-xs text-secondary"
            >
              <span class="truncate">{{ opt.title }}</span>
              <div class="flex items-center gap-2 shrink-0">
                <span class="font-mono tabular-nums text-primary">+{{ formatMoney(opt.priceRub) }}</span>
                <button
                  type="button"
                  class="rounded p-0.5 text-muted hover:text-[#EF4444] transition-colors"
                  :aria-label="`Убрать ${opt.title}`"
                  @click="toggleOption(opt.id)"
                >
                  <X class="h-3.5 w-3.5" :stroke-width="2" />
                </button>
              </div>
            </div>

            <p v-if="chosenOptionItems.length === 0" class="text-xs text-muted">
              Дополнительные модули не выбраны — базовая сборка пресета.
            </p>
          </div>

          <!-- Actions -->
          <div class="space-y-2.5 pt-2">
            <button
              type="button"
              class="flex w-full items-center justify-center gap-2 px-5 py-3.5 text-sm btn-emerald"
              @click="lockEstimateIntoBrief"
            >
              <span>Зафиксировать расчёт в брифе</span>
              <ArrowRight class="h-4 w-4" :stroke-width="2" />
            </button>

            <button
              type="button"
              class="flex w-full items-center justify-center gap-2 px-4 py-3 text-xs sm:text-sm font-semibold btn-ghost"
              @click="copyShareLink"
            >
              <Copy class="h-4 w-4 text-secondary" :stroke-width="1.75" />
              <span>Скопировать ссылку на смету</span>
            </button>
          </div>
        </aside>
      </div>

      <!-- Mode B: Team & Outstaff vs In-House -->
      <div
        v-else
        class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
      >
        <!-- Left Config Panel -->
        <div class="lg:col-span-7 space-y-6">
          <div class="rounded-2xl border border-white/10 bg-surface p-5 sm:p-6 space-y-4">
            <div class="flex flex-wrap items-center justify-between gap-3">
              <h3 class="font-sans text-base sm:text-lg font-bold text-primary">
                1. Соберите состав команды
              </h3>
              <div class="inline-flex rounded-lg border border-white/10 bg-surface-elevated p-1">
                <button
                  type="button"
                  class="rounded-md px-2.5 py-1 font-mono text-xs font-semibold transition-colors"
                  :class="frontendGrade === 'middle-plus' ? 'bg-indigo/25 text-indigo-hover' : 'text-muted hover:text-primary'"
                  @click="frontendGrade = 'middle-plus'"
                >
                  Middle+
                </button>
                <button
                  type="button"
                  class="rounded-md px-2.5 py-1 font-mono text-xs font-semibold transition-colors"
                  :class="frontendGrade === 'senior' ? 'bg-indigo/25 text-indigo-hover' : 'text-muted hover:text-primary'"
                  @click="frontendGrade = 'senior'"
                >
                  Senior
                </button>
              </div>
            </div>

            <div class="space-y-3">
              <div
                v-for="role in outstaffRoles"
                :key="role.id"
                class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-xl border p-4 transition-colors"
                :class="
                  (roleCounts[role.id] ?? 0) > 0
                    ? 'border-indigo/45 bg-indigo/10'
                    : 'border-white/10 bg-surface-elevated'
                "
              >
                <div class="space-y-1">
                  <div class="font-sans text-sm font-bold text-primary">
                    {{ role.title }}
                  </div>
                  <div class="text-xs text-secondary">
                    {{ role.subtitle }}
                  </div>
                </div>

                <div class="flex items-center justify-between sm:justify-end gap-4">
                  <div class="font-mono text-xs font-bold text-emerald tabular-nums">
                    {{ formatMoney(role.hasGradeSwitch ? role.ratesRub[frontendGrade] : role.ratesRub.senior) }}/ч
                  </div>

                  <div class="inline-flex items-center gap-2 rounded-lg border border-white/12 bg-canvas px-2 py-1">
                    <button
                      type="button"
                      class="flex h-7 w-7 items-center justify-center rounded text-secondary hover:bg-white/10 hover:text-primary"
                      :aria-label="`Уменьшить количество: ${role.title}`"
                      @click="updateRoleCount(role.id, -1)"
                    >
                      <Minus class="h-3.5 w-3.5" :stroke-width="2" />
                    </button>
                    <span class="w-5 text-center font-mono text-sm font-bold text-primary tabular-nums">
                      {{ roleCounts[role.id] ?? 0 }}
                    </span>
                    <button
                      type="button"
                      class="flex h-7 w-7 items-center justify-center rounded text-secondary hover:bg-white/10 hover:text-primary"
                      :aria-label="`Увеличить количество: ${role.title}`"
                      @click="updateRoleCount(role.id, 1)"
                    >
                      <Plus class="h-3.5 w-3.5" :stroke-width="2" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Sliders & In-House Comparison -->
          <div class="rounded-2xl border border-white/10 bg-surface p-5 sm:p-6 space-y-5">
            <h3 class="font-sans text-base sm:text-lg font-bold text-primary">
              2. Загрузка и горизонт контракта
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <label for="hours-slider" class="text-secondary font-medium">Загрузка на специалиста</label>
                  <span class="font-mono font-bold text-emerald tabular-nums">{{ hoursPerMonth }} ч/мес</span>
                </div>
                <input
                  id="hours-slider"
                  v-model.number="hoursPerMonth"
                  type="range"
                  min="40"
                  max="160"
                  step="20"
                  class="w-full accent-[#E5C79B] cursor-pointer"
                >
                <div class="flex justify-between font-mono text-[10px] text-muted">
                  <span>40 ч (Part-time)</span>
                  <span>160 ч (Full-time)</span>
                </div>
              </div>

              <div class="space-y-2">
                <div class="flex items-center justify-between text-xs">
                  <label for="months-slider" class="text-secondary font-medium">Длительность</label>
                  <span class="font-mono font-bold text-primary tabular-nums">{{ durationMonths }} мес.</span>
                </div>
                <input
                  id="months-slider"
                  v-model.number="durationMonths"
                  type="range"
                  min="1"
                  max="12"
                  step="1"
                  class="w-full accent-[#6366F1] cursor-pointer"
                >
                <div class="flex justify-between font-mono text-[10px] text-muted">
                  <span>1 мес</span>
                  <span>12 мес</span>
                </div>
              </div>
            </div>

            <label class="flex items-start gap-3 rounded-xl border border-white/10 bg-surface-elevated p-4 cursor-pointer">
              <input
                v-model="includeInHouseHiddenCosts"
                type="checkbox"
                class="mt-0.5 h-4 w-4 rounded border-white/25 accent-[#E5C79B]"
              >
              <span class="text-xs sm:text-sm text-secondary leading-relaxed">
                Учитывать скрытые расходы штата (налоги РФ ~30%, найм/рекрутер, отпускные, техника и простой между проектами)
              </span>
            </label>
          </div>
        </div>

        <!-- Right Sticky Team Summary + Comparison -->
        <aside class="lg:col-span-5 lg:sticky lg:top-24 rounded-2xl border border-indigo/45 bg-surface-elevated p-6 sm:p-7 shadow-elevated space-y-5">
          <div class="flex items-center justify-between">
            <span class="font-mono text-xs uppercase tracking-wider text-indigo-hover">
              Расчёт команды · {{ teamEstimate.totalSpecialists }} спец.
            </span>
            <span class="rounded-full bg-indigo/15 border border-indigo/35 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-indigo-hover">
              Старт за 48 ч
            </span>
          </div>

          <div>
            <div class="font-mono text-2xl sm:text-3xl font-bold text-primary tabular-nums">
              <template v-if="currency === 'USD'">$</template>
              <AnimatedNumber :value="convertMoney(teamEstimate.monthlyTeamCostRub)" />
              <template v-if="currency === 'RUB'"> ₽</template>
              <span class="text-base font-normal text-secondary"> / мес</span>
            </div>
            <div class="mt-1 font-mono text-xs text-muted tabular-nums">
              {{ teamEstimate.totalHours }} часов/мес · Почасовая постоплата по трекеру
            </div>
          </div>

          <!-- In-House vs Outstaff Visual Comparison (Firecode Pattern) -->
          <div class="rounded-xl border border-white/10 bg-canvas/70 p-4 space-y-3.5">
            <div class="font-mono text-[11px] uppercase tracking-wider text-secondary">
              Аутстафф vs Инхаус-найм
            </div>

            <div class="space-y-1.5">
              <div class="flex justify-between text-xs">
                <span class="text-secondary">Штат того же грейда</span>
                <span class="font-mono font-semibold text-primary/80 tabular-nums">
                  ~{{ formatMoney(teamEstimate.monthlyInHouseCostRub) }}/мес
                </span>
              </div>
              <div class="h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
                <div class="h-full w-full rounded-full bg-[#64748B]" />
              </div>
            </div>

            <div class="space-y-1.5">
              <div class="flex justify-between text-xs">
                <span class="text-emerald font-semibold">Команда LAYER.DEV</span>
                <span class="font-mono font-bold text-emerald tabular-nums">
                  {{ formatMoney(teamEstimate.monthlyTeamCostRub) }}/мес
                </span>
              </div>
              <div class="h-2.5 w-full rounded-full bg-white/10 overflow-hidden">
                <div
                  class="h-full rounded-full bg-emerald transition-all duration-300"
                  :style="{ width: `${Math.max(45, 100 - teamEstimate.savingsPercent)}%` }"
                />
              </div>
            </div>

            <div class="pt-1 font-mono text-xs font-bold text-emerald tabular-nums">
              Экономия до {{ teamEstimate.savingsPercent }}% (~{{ formatMoney(teamEstimate.savingsRub) }}/мес) + старт за 48 ч вместо 2 мес. найма
            </div>
          </div>

          <div class="space-y-2.5">
            <button
              type="button"
              class="flex w-full items-center justify-center gap-2 px-5 py-3.5 text-sm btn-emerald"
              @click="lockEstimateIntoBrief"
            >
              <span>Запросить CV кандидатов</span>
              <ArrowRight class="h-4 w-4" :stroke-width="2" />
            </button>

            <div class="grid grid-cols-2 gap-2">
              <a
                :href="siteConfig.contacts.telegramUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold btn-ghost hover:border-telegram/50"
              >
                <TelegramIcon class="text-telegram h-4 w-4" />
                <span>В Telegram</span>
              </a>

              <button
                type="button"
                class="flex items-center justify-center gap-1.5 px-3 py-2.5 text-xs font-semibold btn-ghost"
                @click="copyShareLink"
              >
                <Copy class="h-3.5 w-3.5 text-secondary" :stroke-width="1.75" />
                <span>Ссылка</span>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>

    <!-- Mobile Sticky Summary Strip (visible on < lg inside calculator context) -->
    <div class="lg:hidden sticky bottom-16 z-20 mx-4 mt-4 rounded-xl border border-emerald/40 bg-surface-elevated/95 backdrop-blur-lg p-3 shadow-elevated flex items-center justify-between gap-3">
      <div class="min-w-0">
        <div class="font-mono text-[10px] text-muted uppercase">
          {{ mode === 'project' ? 'Оценка проекта' : 'Команда в месяц' }}
        </div>
        <div class="font-mono text-sm font-bold text-primary tabular-nums truncate">
          <template v-if="mode === 'project'">
            {{ formatMoney(projectEstimate.minRub) }} – {{ formatMoney(projectEstimate.maxRub) }}
          </template>
          <template v-else>
            {{ formatMoney(teamEstimate.monthlyTeamCostRub) }}/мес
          </template>
        </div>
      </div>

      <button
        type="button"
        class="shrink-0 px-3.5 py-2 text-xs btn-emerald"
        @click="lockEstimateIntoBrief"
      >
        В бриф →
      </button>
    </div>
  </section>
</template>
