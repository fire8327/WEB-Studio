import { computed } from 'vue'
import { siteConfig } from '~/config/site'
import {
  calculatorOptions,
  calculatorPresets,
  outstaffRoles
} from '~/data/studio'
import type {
  BriefAttachedEstimate,
  CalculatorMode,
  CurrencyCode,
  OutstaffGrade,
  UrgencyMode
} from '~/types'

export function useCalculatorState() {
  const mode = useState<CalculatorMode>('calc-mode', () => 'project')
  const currency = useState<CurrencyCode>('calc-currency', () => 'RUB')
  const presetId = useState<string>('calc-preset', () => 'corp-ssr')
  const selectedOptions = useState<string[]>('calc-options', () => ['headless-cms', 'cwv-seo'])
  const urgency = useState<UrgencyMode>('calc-urgency', () => 'standard')

  const roleCounts = useState<Record<string, number>>('calc-role-counts', () => ({
    'frontend-vue': 1,
    'tech-lead': 0,
    'creative-dev': 0,
    'qa-engineer': 0
  }))
  const frontendGrade = useState<OutstaffGrade>('calc-frontend-grade', () => 'senior')
  const hoursPerMonth = useState<number>('calc-hours', () => 160)
  const durationMonths = useState<number>('calc-months', () => 3)
  const includeInHouseHiddenCosts = useState<boolean>('calc-inhouse', () => true)

  const attachedEstimate = useState<BriefAttachedEstimate | null>('brief-estimate', () => null)

  const activePreset = computed(() => {
    return calculatorPresets.find(p => p.id === presetId.value) ?? calculatorPresets[1]!
  })

  const chosenOptionItems = computed(() => {
    return calculatorOptions.filter(opt => selectedOptions.value.includes(opt.id))
  })

  const projectEstimate = computed(() => {
    const base = activePreset.value.priceRub
    const optionsCost = chosenOptionItems.value.reduce((sum, item) => sum + item.priceRub, 0)
    const optionsDays = chosenOptionItems.value.reduce((sum, item) => sum + item.days, 0)
    const urgencyFactor = urgency.value === 'express' ? 1.25 : 1

    const rawMin = Math.round((base + optionsCost) * urgencyFactor)
    const rawMax = Math.round(rawMin * 1.16)

    const extraWeeks = Math.ceil(optionsDays / 5)
    const weeksMin = Math.max(2, activePreset.value.weeksMin + Math.floor(extraWeeks * 0.6) - (urgency.value === 'express' ? 1 : 0))
    const weeksMax = Math.max(weeksMin + 1, activePreset.value.weeksMax + extraWeeks - (urgency.value === 'express' ? 1 : 0))

    return {
      minRub: rawMin,
      maxRub: rawMax,
      weeksMin,
      weeksMax
    }
  })

  const teamEstimate = computed(() => {
    let hourlySum = 0
    let totalSpecialists = 0

    for (const role of outstaffRoles) {
      const count = roleCounts.value[role.id] ?? 0
      if (count <= 0) continue
      totalSpecialists += count
      const rate = role.hasGradeSwitch ? role.ratesRub[frontendGrade.value] : role.ratesRub.senior
      hourlySum += rate * count
    }

    const monthlyTeamCostRub = hourlySum * hoursPerMonth.value

    // In-house benchmark includes +30% payroll taxes, recruiting amortization, equipment, paid leave & bench idle
    const inHouseMultiplier = includeInHouseHiddenCosts.value ? 1.32 : 1.08
    const monthlyInHouseCostRub = Math.round(monthlyTeamCostRub * inHouseMultiplier)
    const savingsRub = Math.max(0, monthlyInHouseCostRub - monthlyTeamCostRub)
    const savingsPercent = monthlyInHouseCostRub > 0
      ? Math.round((savingsRub / monthlyInHouseCostRub) * 100)
      : 0

    return {
      totalSpecialists,
      hourlySumRub: hourlySum,
      monthlyTeamCostRub,
      monthlyInHouseCostRub,
      savingsRub,
      savingsPercent,
      totalHours: totalSpecialists * hoursPerMonth.value
    }
  })

  function convertMoney(amountRub: number): number {
    if (currency.value === 'USD') {
      return Math.round(amountRub / siteConfig.currency.usdRate)
    }
    return amountRub
  }

  function formatMoney(amountRub: number): string {
    const value = convertMoney(amountRub)
    const formatted = new Intl.NumberFormat('ru-RU').format(value)
    return currency.value === 'USD' ? `$${formatted}` : `${formatted} ₽`
  }

  function selectPreset(id: string) {
    presetId.value = id
    const found = calculatorPresets.find(p => p.id === id)
    if (found) {
      selectedOptions.value = [...found.defaultOptions]
    }
  }

  function toggleOption(id: string) {
    if (selectedOptions.value.includes(id)) {
      selectedOptions.value = selectedOptions.value.filter(item => item !== id)
    }
    else {
      selectedOptions.value = [...selectedOptions.value, id]
    }
  }

  function updateRoleCount(roleId: string, delta: number) {
    const current = roleCounts.value[roleId] ?? 0
    const next = Math.max(0, Math.min(6, current + delta))
    const nextMap = { ...roleCounts.value, [roleId]: next }
    const total = Object.values(nextMap).reduce((sum, n) => sum + n, 0)
    if (total === 0) return
    roleCounts.value = nextMap
  }

  function attachCurrentEstimateToBrief() {
    if (mode.value === 'project') {
      const budgetLabel = `${formatMoney(projectEstimate.value.minRub)} – ${formatMoney(projectEstimate.value.maxRub)}`
      const timelineLabel = `${projectEstimate.value.weeksMin}–${projectEstimate.value.weeksMax} нед.`
      const optionNames = chosenOptionItems.value.map(o => o.title).join(', ')
      attachedEstimate.value = {
        mode: 'project',
        summaryText: `${activePreset.value.title}${optionNames ? ` + ${optionNames}` : ''} (${urgency.value === 'express' ? 'Ускоренно' : 'Стандарт'})`,
        budgetLabel,
        timelineLabel,
        modelSlug: 'white-label'
      }
    }
    else {
      const activeRoles = outstaffRoles
        .filter(r => (roleCounts.value[r.id] ?? 0) > 0)
        .map(r => `${r.title} ×${roleCounts.value[r.id]}`)
        .join(', ')
      const budgetLabel = `${formatMoney(teamEstimate.value.monthlyTeamCostRub)}/мес (${teamEstimate.value.totalHours} ч)`
      const timelineLabel = `${durationMonths.value} мес · старт 48 ч`
      attachedEstimate.value = {
        mode: 'team',
        summaryText: `${activeRoles} · ${hoursPerMonth.value} ч/мес`,
        budgetLabel,
        timelineLabel,
        modelSlug: teamEstimate.value.totalSpecialists > 1 ? 'dedicated-pod' : 'outstaff'
      }
    }
  }

  function clearAttachedEstimate() {
    attachedEstimate.value = null
  }

  function buildShareQuery(): Record<string, string> {
    if (mode.value === 'project') {
      return {
        mode: 'project',
        currency: currency.value,
        preset: presetId.value,
        options: selectedOptions.value.join(','),
        urgency: urgency.value
      }
    }
    return {
      mode: 'team',
      currency: currency.value,
      grade: frontendGrade.value,
      hours: String(hoursPerMonth.value),
      months: String(durationMonths.value),
      inhouse: includeInHouseHiddenCosts.value ? '1' : '0'
    }
  }

  function hydrateFromQuery(query: Record<string, unknown>) {
    if (query.mode === 'project' || query.mode === 'team') {
      mode.value = query.mode
    }
    if (query.currency === 'RUB' || query.currency === 'USD') {
      currency.value = query.currency
    }
    if (typeof query.preset === 'string' && calculatorPresets.some(p => p.id === query.preset)) {
      presetId.value = query.preset
    }
    if (typeof query.options === 'string') {
      const validIds = new Set(calculatorOptions.map(o => o.id))
      selectedOptions.value = query.options
        .split(',')
        .map(s => s.trim())
        .filter(id => validIds.has(id))
    }
    if (query.urgency === 'standard' || query.urgency === 'express') {
      urgency.value = query.urgency
    }
    if (query.grade === 'middle-plus' || query.grade === 'senior') {
      frontendGrade.value = query.grade
    }
    if (typeof query.hours === 'string') {
      const parsed = Number(query.hours)
      if (!Number.isNaN(parsed) && parsed >= 40 && parsed <= 160) {
        hoursPerMonth.value = parsed
      }
    }
    if (typeof query.months === 'string') {
      const parsed = Number(query.months)
      if (!Number.isNaN(parsed) && parsed >= 1 && parsed <= 12) {
        durationMonths.value = parsed
      }
    }
    if (query.inhouse === '0' || query.inhouse === '1') {
      includeInHouseHiddenCosts.value = query.inhouse === '1'
    }
  }

  return {
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
    attachedEstimate,
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
    clearAttachedEstimate,
    buildShareQuery,
    hydrateFromQuery
  }
}
