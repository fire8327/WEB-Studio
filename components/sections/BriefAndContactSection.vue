<script setup lang="ts">
import { computed, reactive, ref, watch } from 'vue'
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  FileDown,
  Link2,
  Lock,
  Mail,
  Send
} from 'lucide-vue-next'
import TelegramIcon from '~/components/icons/TelegramIcon.vue'
import VkIcon from '~/components/icons/VkIcon.vue'
import { useCalculatorState } from '~/composables/useCalculatorState'
import { useToast } from '~/composables/useToast'
import { siteConfig } from '~/config/site'
import type { BriefFormState, CooperationSlug } from '~/types'

const { attachedEstimate, clearAttachedEstimate } = useCalculatorState()
const { showToast } = useToast()

const currentStep = ref<1 | 2 | 3 | 4>(1)
const isSubmitting = ref(false)
const submittedTicket = ref<string | null>(null)
const contactError = ref<string>('')
const consentError = ref<string>('')

const form = reactive<BriefFormState>({
  model: 'white-label',
  figmaOrRepoUrl: '',
  stacks: ['Промо-сайт'],
  needNda: true,
  notes: '',
  budgetChip: '200–500 тыс. ₽',
  startChip: 'Срочно (48 ч)',
  contactChannel: '',
  contactName: '',
  consent: true
})

watch(
  attachedEstimate,
  (val) => {
    if (!val) return
    form.model = val.modelSlug
    form.budgetChip = val.budgetLabel
    currentStep.value = 3
  }
)

const modelOptions: Array<{ slug: CooperationSlug, title: string, desc: string }> = [
  { slug: 'white-label', title: 'Сайт под ключ', desc: 'Дизайн, анимации, разработка и запуск' },
  { slug: 'dedicated-pod', title: 'Выделенная команда', desc: 'Развитие сервиса и поддержка по спринтам' },
  { slug: 'outstaff', title: 'Усиление команды', desc: 'Подключение специалистов за 48 ч' },
  { slug: 'presale-partner', title: 'White Label для студии', desc: 'Конфиденциальный подряд под вашим брендом' }
]

const stackChoices = ['Промо-сайт', 'Интернет-магазин', 'Анимации и 3D', 'Веб-сервис / ЛК', 'Помочь с выбором']
const budgetChoices = ['до 200 тыс. ₽', '200–500 тыс. ₽', '500 тыс. – 1.2 млн ₽', 'Почасовой T&M', 'Нужна ваша оценка']
const startChoices = ['Срочно (48 ч)', 'В течение 2 недель', 'Пресейл / Тендер']

const stepTitles = [
  { num: 1 as const, label: '01 Формат' },
  { num: 2 as const, label: '02 Проект' },
  { num: 3 as const, label: '03 Бюджет и сроки' },
  { num: 4 as const, label: '04 Контакты' }
]

function toggleStack(stack: string) {
  if (form.stacks.includes(stack)) {
    form.stacks = form.stacks.filter(s => s !== stack)
  }
  else {
    form.stacks = [...form.stacks, stack]
  }
}

const activeModelTitle = computed(() => {
  return modelOptions.find(m => m.slug === form.model)?.title ?? 'White Label'
})

const briefTextTemplate = computed(() => {
  const estimateLine = attachedEstimate.value
    ? `\nСмета из калькулятора: ${attachedEstimate.value.summaryText} (${attachedEstimate.value.budgetLabel}, ${attachedEstimate.value.timelineLabel})`
    : ''
  return [
    `Модель: ${activeModelTitle.value}`,
    `Стек: ${form.stacks.join(', ') || 'Не указан'}`,
    `Ссылка на Figma/ТЗ: ${form.figmaOrRepoUrl || 'Пришлю в чате'}`,
    `NDA до просмотра: ${form.needNda ? 'Да' : 'Не требуется'}`,
    `Бюджет / Старт: ${form.budgetChip} · ${form.startChip}${estimateLine}`,
    `Контакт для ответа: ${form.contactChannel || '—'}`
  ].join('\n')
})

const prefilledMailtoHref = computed(() => {
  const subject = encodeURIComponent(`[LAYER.DEV] Запрос партнёрства — ${activeModelTitle.value}`)
  const body = encodeURIComponent(briefTextTemplate.value)
  return `mailto:${siteConfig.contacts.email}?subject=${subject}&body=${body}`
})

async function copyEmail() {
  if (!import.meta.client) return
  try {
    await navigator.clipboard.writeText(siteConfig.contacts.email)
    showToast(`Email ${siteConfig.contacts.email} скопирован`)
  }
  catch {
    showToast('Не удалось скопировать email', 'error')
  }
}

async function copyBriefTemplate() {
  if (!import.meta.client) return
  try {
    await navigator.clipboard.writeText(briefTextTemplate.value)
    showToast('Шаблон брифа скопирован — можно вставить в TG или VK')
  }
  catch {
    showToast('Не удалось скопировать шаблон', 'error')
  }
}

function downloadSummaryTxt() {
  if (!import.meta.client) return
  const content = `LAYER.DEV — Сводка партнёрского запроса (${submittedTicket.value ?? 'DRAFT'})\n\n${briefTextTemplate.value}\n\nКомментарий:\n${form.notes || '—'}\n`
  const blob = new Blob([content], { type: 'text/plain;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `layer-dev-brief-${submittedTicket.value ?? 'summary'}.txt`
  link.click()
  URL.revokeObjectURL(url)
}

function validateAndSubmit() {
  contactError.value = ''
  consentError.value = ''

  const cleanedContact = form.contactChannel.trim()
  if (cleanedContact.length < 3) {
    contactError.value = 'Укажите телефон, @telegram или email для ответа'
    return
  }
  if (!form.consent) {
    consentError.value = 'Необходимо согласие на обработку данных'
    return
  }

  isSubmitting.value = true
  setTimeout(() => {
    isSubmitting.value = false
    const code = `LD-${Math.floor(1000 + Math.random() * 9000)}`
    submittedTicket.value = code
    showToast(`Заявка ${code} зафиксирована — ответим за 15–30 мин`)
  }, 450)
}

function resetBrief() {
  submittedTicket.value = null
  currentStep.value = 1
}
</script>

<template>
  <section id="brief" class="bg-canvas py-16 sm:py-22 lg:py-28 border-t border-white/[0.06]">
    <div class="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mb-10 reveal-item">
        <div class="studio-eyebrow">
          <span>Бриф и прямая связь</span>
        </div>
        <h2 class="mt-4 font-display text-[1.5rem] sm:text-[2.1rem] lg:text-[2.4rem] font-bold leading-[1.15] tracking-[-0.025em] text-primary">
          Оценка за 24 часа или быстрый старт в мессенджере
        </h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <!-- Left Zone: 4-Step Interactive Brief (7 cols) -->
        <div class="lg:col-span-7 rounded-2xl border border-white/12 bg-surface p-5 sm:p-8 shadow-card">
          <!-- Submitted Success Screen -->
          <div
            v-if="submittedTicket"
            class="py-6 space-y-6"
          >
            <div class="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/15 border border-emerald/35 text-emerald">
              <CheckCircle2 class="h-6 w-6" :stroke-width="2" />
            </div>

            <div class="space-y-2">
              <div class="font-mono text-xs font-semibold text-emerald">
                ЗАЯВКА {{ submittedTicket }} ПРИНЯТА
              </div>
              <h3 class="font-sans text-2xl font-bold text-primary">
                Передали техлиду — вернёмся с планом и сметой
              </h3>
              <p class="text-sm text-secondary leading-relaxed">
                Среднее время первого отклика в рабочие часы ({{ siteConfig.contacts.workHours }}) — 15 минут. Полная декомпозиция по Figma/ТЗ — до 24 часов.
              </p>
            </div>

            <div class="rounded-xl border border-white/10 bg-surface-elevated p-4 font-mono text-xs text-secondary whitespace-pre-line">
              {{ briefTextTemplate }}
            </div>

            <div class="flex flex-wrap gap-3">
              <a
                :href="siteConfig.contacts.telegramUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-4 py-3 text-sm btn-emerald"
              >
                <TelegramIcon />
                <span>Ускорить в Telegram</span>
              </a>

              <button
                type="button"
                class="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold btn-ghost"
                @click="downloadSummaryTxt"
              >
                <FileDown class="h-4 w-4 text-emerald" :stroke-width="1.75" />
                <span>Скачать сводку</span>
              </button>

              <button
                type="button"
                class="inline-flex items-center gap-2 px-4 py-3 text-sm font-semibold btn-ghost"
                @click="resetBrief"
              >
                Отправить ещё запрос
              </button>
            </div>
          </div>

          <!-- Active 4-Step Wizard -->
          <form
            v-else
            class="space-y-6"
            novalidate
            @submit.prevent="validateAndSubmit"
          >
            <!-- Clickable 4-Step Progress Bar -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 border-b border-white/[0.08] pb-4">
              <button
                v-for="st in stepTitles"
                :key="st.num"
                type="button"
                class="rounded-lg border px-3 py-2 text-left font-mono text-xs font-semibold transition-all"
                :class="
                  currentStep === st.num
                    ? 'border-emerald bg-emerald/15 text-emerald'
                    : currentStep > st.num
                      ? 'border-white/15 bg-surface-elevated text-primary'
                      : 'border-white/[0.06] bg-transparent text-muted hover:text-secondary'
                "
                @click="currentStep = st.num"
              >
                {{ st.label }}
              </button>
            </div>

            <!-- Step 01: Cooperation Model -->
            <div v-if="currentStep === 1" class="space-y-4">
              <h3 class="font-sans text-lg font-bold text-primary">
                Какой формат сотрудничества вам актуален?
              </h3>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  v-for="opt in modelOptions"
                  :key="opt.slug"
                  type="button"
                  class="rounded-xl border p-4 text-left transition-all"
                  :class="
                    form.model === opt.slug
                      ? 'border-emerald bg-emerald/12'
                      : 'border-white/10 bg-surface-elevated hover:border-white/25'
                  "
                  @click="form.model = opt.slug"
                >
                  <div class="flex items-center justify-between gap-2">
                    <span class="font-sans text-sm font-bold text-primary">{{ opt.title }}</span>
                    <Check
                      v-if="form.model === opt.slug"
                      class="h-4 w-4 text-emerald shrink-0"
                      :stroke-width="2.5"
                    />
                  </div>
                  <p class="mt-1 text-xs text-secondary">
                    {{ opt.desc }}
                  </p>
                </button>
              </div>
            </div>

            <!-- Step 02: Details & Stack -->
            <div v-else-if="currentStep === 2" class="space-y-5">
              <div class="space-y-2">
                <label for="brief-figma" class="block text-sm font-semibold text-primary">
                  Ссылка на Figma, Notion, репозиторий или ТЗ (опционально)
                </label>
                <div class="relative">
                  <Link2 class="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" :stroke-width="1.75" />
                  <input
                    id="brief-figma"
                    v-model="form.figmaOrRepoUrl"
                    type="url"
                    placeholder="https://figma.com/file/..."
                    class="w-full rounded-lg border border-white/12 bg-surface-elevated py-3 pl-10 pr-4 text-sm text-primary placeholder:text-muted focus:border-emerald focus:outline-none"
                  >
                </div>
              </div>

              <div class="space-y-2">
                <span class="block text-sm font-semibold text-primary">Ожидаемый стек</span>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="stack in stackChoices"
                    :key="stack"
                    type="button"
                    class="rounded-full border px-3 py-1.5 font-mono text-xs font-semibold transition-colors"
                    :class="
                      form.stacks.includes(stack)
                        ? 'border-emerald bg-emerald/15 text-emerald'
                        : 'border-white/12 bg-surface-elevated text-secondary hover:text-primary'
                    "
                    @click="toggleStack(stack)"
                  >
                    {{ stack }}
                  </button>
                </div>
              </div>

              <label class="flex items-center gap-3 rounded-xl border border-white/10 bg-surface-elevated px-4 py-3 cursor-pointer">
                <input
                  v-model="form.needNda"
                  type="checkbox"
                  class="h-4 w-4 rounded border-white/25 accent-[#E5C79B]"
                >
                <span class="inline-flex items-center gap-2 text-xs sm:text-sm text-primary">
                  <Lock class="h-3.5 w-3.5 text-emerald" :stroke-width="2" />
                  Нужно подписать NDA до просмотра макетов
                </span>
              </label>

              <div class="space-y-2">
                <label for="brief-notes" class="block text-sm font-semibold text-primary">
                  Краткий комментарий о задаче
                </label>
                <textarea
                  id="brief-notes"
                  v-model="form.notes"
                  rows="3"
                  placeholder="Например: нужна White Label сборка лендинга с GSAP к 15 декабря или 1 Senior Vue на 3 месяца..."
                  class="w-full rounded-lg border border-white/12 bg-surface-elevated p-3.5 text-sm text-primary placeholder:text-muted focus:border-emerald focus:outline-none"
                />
              </div>
            </div>

            <!-- Step 03: Budget & Start -->
            <div v-else-if="currentStep === 3" class="space-y-5">
              <!-- Attached Calculator Estimate Banner -->
              <div
                v-if="attachedEstimate"
                class="rounded-xl border border-emerald/45 bg-emerald/10 p-4 flex items-start justify-between gap-3"
              >
                <div class="space-y-1">
                  <div class="font-mono text-[11px] font-bold uppercase text-emerald">
                    Прикреплена смета из калькулятора
                  </div>
                  <div class="font-mono text-sm font-bold text-primary">
                    {{ attachedEstimate.budgetLabel }} · {{ attachedEstimate.timelineLabel }}
                  </div>
                  <div class="text-xs text-secondary">
                    {{ attachedEstimate.summaryText }}
                  </div>
                </div>
                <button
                  type="button"
                  class="font-mono text-xs text-muted hover:text-primary underline shrink-0"
                  @click="clearAttachedEstimate"
                >
                  Сбросить
                </button>
              </div>

              <div class="space-y-2.5">
                <span class="block text-sm font-semibold text-primary">Ориентир бюджета</span>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="chip in budgetChoices"
                    :key="chip"
                    type="button"
                    class="rounded-full border px-3.5 py-1.5 font-mono text-xs font-semibold transition-colors"
                    :class="
                      form.budgetChip === chip
                        ? 'border-emerald bg-emerald/15 text-emerald'
                        : 'border-white/12 bg-surface-elevated text-secondary hover:text-primary'
                    "
                    @click="form.budgetChip = chip"
                  >
                    {{ chip }}
                  </button>
                </div>
              </div>

              <div class="space-y-2.5">
                <span class="block text-sm font-semibold text-primary">Когда планируете старт?</span>
                <div class="flex flex-wrap gap-2">
                  <button
                    v-for="chip in startChoices"
                    :key="chip"
                    type="button"
                    class="rounded-full border px-3.5 py-1.5 font-mono text-xs font-semibold transition-colors"
                    :class="
                      form.startChip === chip
                        ? 'border-indigo bg-indigo/20 text-indigo-hover'
                        : 'border-white/12 bg-surface-elevated text-secondary hover:text-primary'
                    "
                    @click="form.startChip = chip"
                  >
                    {{ chip }}
                  </button>
                </div>
              </div>
            </div>

            <!-- Step 04: Contacts -->
            <div v-else class="space-y-5">
              <div class="space-y-2">
                <label for="brief-contact" class="block text-sm font-semibold text-primary">
                  Telegram, телефон или Email <span class="text-emerald">*</span>
                </label>
                <input
                  id="brief-contact"
                  v-model="form.contactChannel"
                  type="text"
                  required
                  placeholder="+7 … или @username"
                  class="w-full rounded-lg border bg-surface-elevated px-4 py-3 text-sm text-primary placeholder:text-muted focus:outline-none"
                  :class="contactError ? 'border-danger' : 'border-white/12 focus:border-emerald'"
                  @input="contactError = ''"
                >
                <p v-if="contactError" class="inline-flex items-center gap-1.5 text-xs text-danger">
                  <AlertCircle class="h-3.5 w-3.5" :stroke-width="2" />
                  {{ contactError }}
                </p>
              </div>

              <div class="space-y-2">
                <label for="brief-agency" class="block text-sm font-semibold text-primary">
                  Имя и название агентства (опционально)
                </label>
                <input
                  id="brief-agency"
                  v-model="form.contactName"
                  type="text"
                  placeholder="Например: Дмитрий, RedBox Studio"
                  class="w-full rounded-lg border border-white/12 bg-surface-elevated px-4 py-3 text-sm text-primary placeholder:text-muted focus:border-emerald focus:outline-none"
                >
              </div>

              <label class="flex items-start gap-3 cursor-pointer">
                <input
                  v-model="form.consent"
                  type="checkbox"
                  class="mt-0.5 h-4 w-4 rounded border-white/25 accent-[#E5C79B]"
                  @change="consentError = ''"
                >
                <span class="text-xs text-secondary leading-relaxed">
                  Согласен на обработку контактных данных для подготовки оценки и согласования NDA. Никакого спама.
                </span>
              </label>
              <p v-if="consentError" class="text-xs text-danger">
                {{ consentError }}
              </p>
            </div>

            <!-- Step Navigation Footer -->
            <div class="flex items-center justify-between gap-3 border-t border-white/[0.08] pt-5">
              <button
                v-if="currentStep > 1"
                type="button"
                class="inline-flex items-center gap-1.5 px-4 py-2.5 text-sm font-semibold btn-ghost"
                @click="currentStep = (currentStep - 1) as 1 | 2 | 3 | 4"
              >
                <ArrowLeft class="h-4 w-4" :stroke-width="2" />
                Назад
              </button>
              <span v-else class="font-mono text-xs text-muted">
                Шаг {{ currentStep }} из 4
              </span>

              <button
                v-if="currentStep < 4"
                type="button"
                class="inline-flex items-center gap-2 px-5 py-3 text-sm btn-emerald"
                @click="currentStep = (currentStep + 1) as 1 | 2 | 3 | 4"
              >
                <span>Далее</span>
                <ArrowRight class="h-4 w-4" :stroke-width="2" />
              </button>

              <button
                v-else
                type="submit"
                :disabled="isSubmitting"
                class="inline-flex items-center gap-2 px-5 py-3 text-sm btn-emerald"
              >
                <Send class="h-4 w-4" :stroke-width="2" />
                <span>{{ isSubmitting ? 'Отправляем...' : 'Получить расчёт и план старта' }}</span>
              </button>
            </div>
          </form>
        </div>

        <!-- Right Zone: Direct Channels TG / VK / Pre-filled Email (5 cols) -->
        <aside id="contact" class="lg:col-span-5 rounded-2xl border border-white/12 bg-surface-elevated p-5 sm:p-7 shadow-elevated space-y-5">
          <div class="flex items-center gap-3 pb-4 border-b border-white/[0.08]">
            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-emerald/40 bg-emerald/15 font-mono text-sm font-bold text-emerald">
              АВ
            </div>
            <div>
              <div class="font-sans text-sm font-bold text-primary">
                {{ siteConfig.availability.leadName }} · {{ siteConfig.availability.leadRole }}
              </div>
              <div class="inline-flex items-center gap-1.5 font-mono text-xs text-emerald">
                <span class="h-2 w-2 rounded-full bg-emerald" />
                {{ siteConfig.availability.statusOnline }}
              </div>
            </div>
          </div>

          <div class="space-y-1.5">
            <h3 class="font-sans text-lg font-bold text-primary">
              Нужно быстрее? Напишите напрямую без форм
            </h3>
            <p class="text-sm text-secondary">
              Можете сразу прислать ссылку на Figma или голосовое — оценим сроки и подскажем состав команды.
            </p>
          </div>

          <div class="space-y-3">
            <!-- Telegram CTA -->
            <a
              :href="siteConfig.contacts.telegramUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-between gap-3 rounded-xl border border-[#2AABEE]/45 bg-[#2AABEE]/12 p-4 hover:bg-[#2AABEE]/20 transition-colors"
            >
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#2AABEE] text-white shrink-0">
                  <TelegramIcon />
                </div>
                <div>
                  <div class="text-sm font-bold text-primary">Написать в Telegram</div>
                  <div class="text-xs text-secondary">Ответим за 15 мин ({{ siteConfig.contacts.workHours }})</div>
                </div>
              </div>
              <ArrowUpRight class="h-4 w-4 text-[#2AABEE] shrink-0" :stroke-width="2" />
            </a>

            <!-- VK CTA -->
            <a
              :href="siteConfig.contacts.vkUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center justify-between gap-3 rounded-xl border border-[#0077FF]/45 bg-[#0077FF]/12 p-4 hover:bg-[#0077FF]/20 transition-colors"
            >
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0077FF] text-white shrink-0">
                  <VkIcon />
                </div>
                <div>
                  <div class="text-sm font-bold text-primary">Написать во ВКонтакте</div>
                  <div class="text-xs text-secondary">Быстрый чат в сообщениях сообщества</div>
                </div>
              </div>
              <ArrowUpRight class="h-4 w-4 text-[#0077FF] shrink-0" :stroke-width="2" />
            </a>

            <!-- Prefilled Mailto (BigTree108 Pattern) -->
            <a
              :href="prefilledMailtoHref"
              class="flex items-center justify-between gap-3 rounded-xl border border-emerald/40 bg-emerald/10 p-4 hover:bg-emerald/18 transition-colors"
            >
              <div class="flex items-center gap-3">
                <div class="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald text-[#090B10] shrink-0">
                  <Mail class="h-5 w-5" :stroke-width="2" />
                </div>
                <div>
                  <div class="text-sm font-bold text-primary">Отправить предзаполненный Email</div>
                  <div class="text-xs text-secondary">Авто-шаблон письма с моделью и параметрами</div>
                </div>
              </div>
              <ArrowUpRight class="h-4 w-4 text-emerald shrink-0" :stroke-width="2" />
            </a>
          </div>

          <!-- One-Click Copy Row -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-white/[0.08]">
            <button
              type="button"
              class="flex items-center justify-center gap-2 rounded-lg border border-white/12 bg-surface px-3 py-2.5 font-mono text-xs font-semibold text-primary hover:border-emerald/40 transition-colors"
              @click="copyEmail"
            >
              <Copy class="h-3.5 w-3.5 text-emerald" :stroke-width="2" />
              <span>{{ siteConfig.contacts.email }}</span>
            </button>

            <button
              type="button"
              class="flex items-center justify-center gap-2 rounded-lg border border-white/12 bg-surface px-3 py-2.5 font-mono text-xs font-semibold text-secondary hover:text-primary hover:border-white/25 transition-colors"
              @click="copyBriefTemplate"
            >
              <Copy class="h-3.5 w-3.5 text-secondary" :stroke-width="2" />
              <span>Копировать шаблон брифа</span>
            </button>
          </div>
        </aside>
      </div>
    </div>
  </section>
</template>
