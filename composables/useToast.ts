export interface ToastMessage {
  id: number
  text: string
  tone: 'emerald' | 'info' | 'error'
}

export function useToast() {
  const toasts = useState<ToastMessage[]>('layer-toasts', () => [])

  function showToast(text: string, tone: ToastMessage['tone'] = 'emerald') {
    const id = Date.now() + Math.floor(Math.random() * 1000)
    toasts.value = [...toasts.value, { id, text, tone }]

    if (import.meta.client) {
      setTimeout(() => {
        toasts.value = toasts.value.filter(item => item.id !== id)
      }, 3200)
    }
  }

  function dismissToast(id: number) {
    toasts.value = toasts.value.filter(item => item.id !== id)
  }

  return {
    toasts,
    showToast,
    dismissToast
  }
}
