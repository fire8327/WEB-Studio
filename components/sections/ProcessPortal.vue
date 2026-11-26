<script setup lang="ts">
import { computed, ref } from 'vue'
import { CheckCircle2, Clock, GitBranch, Terminal } from 'lucide-vue-next'
import { processSteps, transparencyTabs } from '~/data/studio'

const activeTabKey = ref<'staging' | 'commits' | 'budget'>('staging')

const activeTab = computed(() => {
  return transparencyTabs.find(t => t.key === activeTabKey.value) ?? transparencyTabs[0]!
})
</script>

<template>
  <section id="process" class="bg-canvas-alt py-16 sm:py-22 lg:py-28 border-t border-white/[0.06]">
    <div class="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mb-10 sm:mb-12 reveal-item">
        <div class="studio-eyebrow">
          <span>Как мы работаем</span>
        </div>
        <h2 class="mt-4 font-display text-[1.5rem] sm:text-[2.1rem] lg:text-[2.4rem] font-bold leading-[1.15] tracking-[-0.025em] text-primary">
          Понятный процесс от идеи до запуска
        </h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <!-- Left: 4 Launch Steps Timeline -->
        <div class="space-y-4 reveal-item">
          <article
            v-for="item in processSteps"
            :key="item.step"
            class="bento-card p-5 flex items-start gap-4"
          >
            <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-emerald/35 bg-emerald/12 font-mono text-sm font-bold text-emerald tabular-nums">
              {{ item.step }}
            </div>
            <div class="space-y-1">
              <div class="flex flex-wrap items-center gap-2.5">
                <h3 class="font-sans text-base sm:text-lg font-bold text-primary">
                  {{ item.title }}
                </h3>
                <span class="rounded-full border border-white/12 bg-white/[0.04] px-2.5 py-0.5 font-mono text-[11px] font-semibold text-cyan">
                  {{ item.timing }}
                </span>
              </div>
              <p class="text-sm text-secondary leading-relaxed">
                {{ item.description }}
              </p>
            </div>
          </article>
        </div>

        <!-- Right: Project Progress Preview Card -->
        <div class="rounded-2xl border border-white/12 bg-surface-elevated shadow-elevated overflow-hidden reveal-item">
          <!-- Mockup Top Bar -->
          <div class="border-b border-white/[0.08] bg-[#121216] px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div class="text-[11px] font-semibold uppercase tracking-wider text-muted">
                Прозрачность работы
              </div>
              <div class="font-sans text-sm font-bold text-primary">
                Что вы видите на каждом этапе
              </div>
            </div>

            <!-- Interactive Switcher -->
            <div
              role="tablist"
              aria-label="Вкладки панели прозрачности"
              class="inline-flex rounded-lg border border-white/10 bg-canvas p-1 gap-1"
            >
              <button
                v-for="tab in transparencyTabs"
                :key="tab.key"
                type="button"
                role="tab"
                :aria-selected="activeTabKey === tab.key"
                class="rounded-md px-2.5 py-1.5 font-mono text-[11px] font-semibold transition-colors"
                :class="
                  activeTabKey === tab.key
                    ? 'bg-emerald/15 text-emerald'
                    : 'text-secondary hover:text-primary'
                "
                @click="activeTabKey = tab.key"
              >
                {{ tab.label }}
              </button>
            </div>
          </div>

          <!-- Active View Header -->
          <div class="border-b border-white/[0.06] bg-[#0D1017] px-5 py-3 flex flex-wrap items-center justify-between gap-2">
            <span class="inline-flex items-center gap-2 font-mono text-xs text-cyan truncate">
              <Terminal v-if="activeTab.key === 'staging'" class="h-3.5 w-3.5 shrink-0" :stroke-width="2" />
              <GitBranch v-else-if="activeTab.key === 'commits'" class="h-3.5 w-3.5 shrink-0" :stroke-width="2" />
              <Clock v-else class="h-3.5 w-3.5 shrink-0" :stroke-width="2" />
              <span class="truncate">{{ activeTab.urlOrTitle }}</span>
            </span>

            <span class="inline-flex items-center gap-1.5 rounded-full border border-emerald/35 bg-emerald/12 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-emerald">
              <CheckCircle2 class="h-3 w-3" :stroke-width="2" />
              {{ activeTab.statusBadge }}
            </span>
          </div>

          <!-- Rows -->
          <div class="divide-y divide-white/[0.06] p-2 sm:p-3">
            <div
              v-for="row in activeTab.rows"
              :key="row.primary"
              class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 rounded-lg p-3 hover:bg-white/[0.03] transition-colors"
            >
              <div class="space-y-0.5 min-w-0">
                <div class="font-mono text-xs font-semibold text-primary truncate">
                  {{ row.primary }}
                </div>
                <div class="text-xs text-secondary truncate">
                  {{ row.secondary }}
                </div>
              </div>

              <div class="flex items-center gap-2.5 shrink-0">
                <span class="font-mono text-[11px] text-muted tabular-nums">
                  {{ row.meta }}
                </span>
                <span
                  v-if="row.badge"
                  class="rounded border border-emerald/30 bg-emerald/10 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald"
                >
                  {{ row.badge }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
