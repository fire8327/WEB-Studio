export interface NavItem {
  label: string
  to: string
  sectionId?: string
}

export type HeroScenarioKey = 'white-label' | 'pod' | 'outstaff'

export interface HeroScenario {
  key: HeroScenarioKey
  tabLabel: string
  headlineAccent: string
  subtitle: string
  showcaseTitle: string
  showcaseNiche: string
  showcaseImage: string
  showcaseCaseSlug: string
  modeBadge: string
  highlights: string[]
  footerMetric: string
}

export interface PartnerSegment {
  id: string
  number: string
  title: string
  pain: string
  solution: string
  tag: string
  icon: 'sparkles' | 'layers' | 'zap' | 'users'
}

export type CooperationSlug =
  | 'white-label'
  | 'dedicated-pod'
  | 'outstaff'
  | 'presale-partner'

export interface CooperationModel {
  slug: CooperationSlug
  number: string
  title: string
  billingBadge: string
  accent: 'emerald' | 'indigo' | 'cyan'
  bullets: string[]
  priceLabel: string
  timelineLabel: string
  ctaLabel: string
  actionType: 'calc-project' | 'calc-team' | 'brief'
}

export interface GuaranteeItem {
  id: string
  number: string
  title: string
  description: string
  icon: 'shield' | 'git' | 'lock' | 'file' | 'check' | 'clock'
}

export interface StealthNode {
  id: string
  label: string
  role: string
  description: string
  isGateway?: boolean
}

export type CaseStackTag = 'nuxt3' | 'vue3' | 'gsap' | 'headless'
export type CaseFormatTag = 'white-label' | 'fixed' | 'outstaff'

export interface CoreWebVitalsMetrics {
  lighthouse: number
  lcp: string
  cls: string
  inp: string
}

export interface CaseItem {
  id: string
  slug: string
  title: string
  category: string
  year: string
  image: string
  clientLabel: string
  partnerLabel: string
  isNda: boolean
  format: CaseFormatTag
  formatLabel: string
  stacks: CaseStackTag[]
  stackLabels: string[]
  duration: string
  team: string
  summary: string
  architectureNote: string
  deliverables: string[]
  metrics: CoreWebVitalsMetrics
  previewScheme: {
    route: string
    accent: 'emerald' | 'indigo' | 'cyan'
    highlights: string[]
  }
  partnerQuote?: {
    text: string
    author: string
    role: string
  }
}

export type CalculatorMode = 'project' | 'team'
export type CurrencyCode = 'RUB' | 'USD'
export type UrgencyMode = 'standard' | 'express'
export type OutstaffGrade = 'middle-plus' | 'senior'

export interface CalculatorPreset {
  id: string
  title: string
  priceRub: number
  durationLabel: string
  weeksMin: number
  weeksMax: number
  description: string
  defaultOptions: string[]
}

export interface CalculatorOption {
  id: string
  title: string
  priceRub: number
  days: number
  tooltip: string
}

export interface OutstaffRole {
  id: string
  title: string
  subtitle: string
  ratesRub: Record<OutstaffGrade, number>
  hasGradeSwitch: boolean
  defaultCount: number
}

export interface BriefAttachedEstimate {
  mode: CalculatorMode
  summaryText: string
  budgetLabel: string
  timelineLabel: string
  modelSlug: CooperationSlug
}

export interface BriefFormState {
  model: CooperationSlug
  figmaOrRepoUrl: string
  stacks: string[]
  needNda: boolean
  notes: string
  budgetChip: string
  startChip: string
  contactChannel: string
  contactName: string
  consent: boolean
}

export interface TechStackCategory {
  id: string
  title: string
  subtitle: string
  items: Array<{
    name: string
    level: string
  }>
}

export interface ProcessStep {
  step: string
  title: string
  timing: string
  description: string
}

export interface TransparencyTabData {
  key: 'staging' | 'commits' | 'budget'
  label: string
  urlOrTitle: string
  statusBadge: string
  rows: Array<{
    primary: string
    secondary: string
    meta: string
    badge?: string
  }>
}

export interface FaqItem {
  id: string
  question: string
  answer: string
}
