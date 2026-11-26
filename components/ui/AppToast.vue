<script setup lang="ts">
import { AlertCircle, CheckCircle2, Info, X } from 'lucide-vue-next'
import { useToast } from '~/composables/useToast'

const { toasts, dismissToast } = useToast()
</script>

<template>
  <div
    aria-live="polite"
    aria-atomic="true"
    class="pointer-events-none fixed bottom-20 lg:bottom-6 right-4 z-[80] flex flex-col gap-2 max-w-sm w-[calc(100vw-2rem)] sm:w-auto"
  >
    <TransitionGroup
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-2"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        role="status"
        class="pointer-events-auto flex items-center gap-3 rounded-lg border px-4 py-3 text-sm font-medium shadow-elevated backdrop-blur-md"
        :class="{
          'bg-surface-elevated/95 border-emerald/40 text-primary': toast.tone === 'emerald',
          'bg-surface-elevated/95 border-indigo/40 text-primary': toast.tone === 'info',
          'bg-surface-elevated/95 border-danger/40 text-primary': toast.tone === 'error'
        }"
      >
        <CheckCircle2
          v-if="toast.tone === 'emerald'"
          class="h-4 w-4 text-emerald shrink-0"
          :stroke-width="2"
        />
        <Info
          v-else-if="toast.tone === 'info'"
          class="h-4 w-4 text-indigo shrink-0"
          :stroke-width="2"
        />
        <AlertCircle
          v-else
          class="h-4 w-4 text-danger shrink-0"
          :stroke-width="2"
        />
        <span class="flex-1">{{ toast.text }}</span>
        <button
          type="button"
          class="rounded p-1 text-muted hover:text-primary transition-colors"
          aria-label="Закрыть уведомление"
          @click="dismissToast(toast.id)"
        >
          <X class="h-3.5 w-3.5" :stroke-width="2" />
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>
