<script setup lang="ts">
import { computed, ref } from 'vue'
import { CheckCircle2, Clock, FileCheck2, GitBranch, Lock, ShieldCheck } from 'lucide-vue-next'
import { securityGuarantees, stealthWorkflowNodes } from '~/data/studio'

const iconMap = {
  shield: ShieldCheck,
  git: GitBranch,
  lock: Lock,
  file: FileCheck2,
  check: CheckCircle2,
  clock: Clock
} as const

const activeNodeId = ref<string>('nda-gate')
const activeNode = computed(() => {
  return stealthWorkflowNodes.find(n => n.id === activeNodeId.value) ?? stealthWorkflowNodes[2]!
})
</script>

<template>
  <section id="nda-manifest" class="light-band py-16 sm:py-22 lg:py-28">
    <div class="mx-auto max-w-container px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="max-w-2xl mb-10 sm:mb-12 reveal-item">
        <span class="inline-flex items-center gap-2 rounded-full border border-[#09090B]/15 bg-white px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#8E6A3A]">
          <ShieldCheck class="h-3.5 w-3.5" :stroke-width="2" />
          Стандарты студии
        </span>
        <h2 class="mt-4 font-display text-[1.5rem] sm:text-[2.1rem] lg:text-[2.4rem] font-bold leading-[1.15] tracking-[-0.025em] text-inverse-primary">
          Принципы, за которые нас выбирают
        </h2>
        <p class="mt-3 text-base sm:text-lg text-inverse-secondary leading-relaxed">
          Никакой воды и технических сложностей — только чистая эстетика, соблюдение сроков и прозрачные договорённости.
        </p>
      </div>

      <!-- 6 Guarantees Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <article
          v-for="item in securityGuarantees"
          :key="item.id"
          class="light-card p-6 flex flex-col gap-4 reveal-item"
        >
          <div class="flex items-center justify-between">
            <div class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[#E5C79B]/25 text-[#8E6A3A]">
              <component :is="iconMap[item.icon]" class="h-5 w-5" :stroke-width="1.75" />
            </div>
            <span class="font-mono text-xs font-bold text-inverse-secondary/60 tabular-nums">
              {{ item.number }}
            </span>
          </div>

          <h3 class="font-sans text-lg font-bold text-inverse-primary">
            {{ item.title }}
          </h3>

          <p class="text-sm leading-relaxed text-inverse-secondary">
            {{ item.description }}
          </p>
        </article>
      </div>

      <!-- Interactive Workflow Diagram Pill -->
      <div class="mt-10 rounded-2xl bg-[#09090B] p-5 sm:p-7 text-primary shadow-elevated reveal-item">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
          <span class="text-xs font-bold uppercase tracking-wider text-emerald">
            Путь создания проекта (нажмите на этап)
          </span>
          <span class="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-medium text-secondary">
            Полный цикл и NDA
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <button
            v-for="(node, idx) in stealthWorkflowNodes"
            :key="node.id"
            type="button"
            class="relative rounded-xl border p-4 text-left transition-all duration-200"
            :class="
              activeNodeId === node.id
                ? node.isGateway
                  ? 'border-[#F43F5E]/60 bg-[#F43F5E]/12'
                  : 'border-emerald bg-emerald/12'
                : 'border-white/10 bg-surface hover:border-white/25'
            "
            @mouseenter="activeNodeId = node.id"
            @focus="activeNodeId = node.id"
            @click="activeNodeId = node.id"
          >
            <div class="flex items-center justify-between gap-2">
              <span class="font-mono text-[10px] uppercase tracking-wider text-muted">
                0{{ idx + 1 }} · {{ node.role }}
              </span>
              <Lock
                v-if="node.isGateway"
                class="h-3.5 w-3.5 text-[#F43F5E]"
                :stroke-width="2"
              />
            </div>
            <div class="mt-1.5 font-sans text-sm font-bold text-primary">
              {{ node.label }}
            </div>
          </button>
        </div>

        <div class="mt-4 rounded-xl border border-white/10 bg-surface-elevated px-4 py-3 text-sm text-secondary flex items-start gap-3">
          <span class="font-mono text-xs font-bold text-emerald shrink-0 mt-0.5">
            [{{ activeNode.label }}]:
          </span>
          <span>{{ activeNode.description }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
