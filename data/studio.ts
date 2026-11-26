import type {
  CalculatorOption,
  CalculatorPreset,
  CaseItem,
  CooperationModel,
  FaqItem,
  GuaranteeItem,
  HeroScenario,
  NavItem,
  OutstaffRole,
  PartnerSegment,
  ProcessStep,
  StealthNode,
  TechStackCategory,
  TransparencyTabData
} from '~/types'

export const mainNavigation: NavItem[] = [
  { label: 'Портфолио', to: '/#cases', sectionId: 'cases' },
  { label: 'Услуги', to: '/#for-whom', sectionId: 'for-whom' },
  { label: 'Форматы', to: '/#models', sectionId: 'models' },
  { label: 'Процесс', to: '/#process', sectionId: 'process' },
  { label: 'Калькулятор', to: '/#calculator', sectionId: 'calculator' }
]

export const heroScenarios: HeroScenario[] = [
  {
    key: 'white-label',
    tabLabel: 'Имиджевые сайты',
    headlineAccent: 'с живой анимацией и характером',
    subtitle:
      'Создаём минималистичные сайты, промо-страницы и цифровые флагманы с плавным параллаксом, 3D-графикой и безупречной типографикой.',
    showcaseTitle: 'KRONA Architects',
    showcaseNiche: 'Архитектурный флагман · Промо и параллакс',
    showcaseImage: '/images/cases/case-3-arch.jpg',
    showcaseCaseSlug: 'architectural-promo-gsap',
    modeBadge: 'BRAND FLAGSHIP',
    highlights: ['Плавный параллакс', '3D & Motion', 'Мгновенный отклик'],
    footerMetric: 'Имиджевый веб-сайт · 3 недели до запуска'
  },
  {
    key: 'pod',
    tabLabel: 'Сервисы и магазины',
    headlineAccent: 'где каждая деталь работает на бизнес',
    subtitle:
      'Проектируем интернет-магазины, SaaS-кабинеты и интерактивные платформы. Понятный UX, высокая скорость и масштабируемая дизайн-система.',
    showcaseTitle: 'QUANTUM Fintech',
    showcaseNiche: 'Финансовая платформа · Дизайн-система',
    showcaseImage: '/images/cases/case-2-fintech.jpg',
    showcaseCaseSlug: 'fintech-saas-cabinet-nda',
    modeBadge: 'DIGITAL PRODUCT',
    highlights: ['Дизайн-система', 'Живая аналитика', 'Высокая конверсия'],
    footerMetric: 'Продуктовый дизайн и разработка · 5 недель'
  },
  {
    key: 'outstaff',
    tabLabel: 'Студиям и агентствам',
    headlineAccent: 'как надёжный технический партнёр',
    subtitle:
      'Помогаем дизайн-студиям и агентствам запускать сложные веб-проекты под их брендом и строгим NDA — от оценки за 24 часа до релиза.',
    showcaseTitle: 'Nordic 3D Configurator',
    showcaseNiche: 'Интерактивный 3D-конфигуратор продуктов',
    showcaseImage: '/images/cases/case-6-3d.jpg',
    showcaseCaseSlug: 'industrial-configurator-vue',
    modeBadge: 'WHITE LABEL & NDA',
    highlights: ['100% конфиденциально', 'Старт за 48 ч', 'Гарантия качества'],
    footerMetric: '+42% к заявкам · Поддержка после запуска'
  }
]

export const partnerSegments: PartnerSegment[] = [
  {
    id: 'design-studios',
    number: '01',
    title: 'Бренды и компании',
    pain: 'Шаблонные сайты на конструкторах выглядят одинаково и не передают уровень продукта.',
    solution:
      'Создаём уникальный визуальный образ с чистой эстетикой, продуманной анимацией и высокой конверсией.',
    tag: 'Сайты под ключ',
    icon: 'sparkles'
  },
  {
    id: 'full-cycle',
    number: '02',
    title: 'E-commerce и маркетплейсы',
    pain: 'Медленные каталоги, неудобный поиск и перегруженный интерфейс снижают средний чек.',
    solution:
      'Проектируем быстрые витрины с мгновенной фильтрацией, личным кабинетом и интеграцией с CRM/оплатой.',
    tag: 'Интернет-магазины',
    icon: 'layers'
  },
  {
    id: 'seo-perf',
    number: '03',
    title: 'Стартапы и онлайн-сервисы',
    pain: 'Сложно превратить идею в удобный, быстрый и визуально целостный цифровой продукт.',
    solution:
      'Проходим путь от прототипов и UX/UI дизайна до запуска рабочего сервиса и личных кабинетов.',
    tag: 'Веб-приложения',
    icon: 'zap'
  },
  {
    id: 'producers',
    number: '04',
    title: 'Дизайн-студии и агентства',
    pain: 'Не хватает сильных рук под сложные анимации или горят сроки по клиентским контрактам.',
    solution:
      'Подключаемся по модели White Label под строгим NDA или делимся доходом 10–20% по партнёрской программе.',
    tag: 'White Label / Партнёрство',
    icon: 'users'
  }
]

export const collaborationModels: CooperationModel[] = [
  {
    slug: 'white-label',
    number: '01',
    title: 'Разработка под ключ',
    billingBadge: 'Фиксированный бюджет',
    accent: 'emerald',
    bullets: [
      'Проектирование, дизайн и вёрстка с анимациями',
      'Понятная поэтапная смета и чёткие дедлайны',
      'Запуск, базовая SEO-настройка и 90 дней поддержки'
    ],
    priceLabel: 'от 180 000 ₽',
    timelineLabel: 'от 2 недель',
    ctaLabel: 'Рассчитать проект',
    actionType: 'calc-project'
  },
  {
    slug: 'dedicated-pod',
    number: '02',
    title: 'Выделенная команда',
    billingBadge: 'Спринты / Месяц',
    accent: 'indigo',
    bullets: [
      'Дизайнер, ведущий разработчик и QA под ваш проект',
      'Еженедельные живые демо и прозрачный план работ',
      'Гибкое развитие продукта без найма сотрудников в штат'
    ],
    priceLabel: 'от 2 400 ₽/ч',
    timelineLabel: 'или фикс за месяц',
    ctaLabel: 'Собрать команду',
    actionType: 'calc-team'
  },
  {
    slug: 'outstaff',
    number: '03',
    title: 'Усиление вашей команды',
    billingBadge: 'Почасовая оплата',
    accent: 'cyan',
    bullets: [
      'Подключаем опытных специалистов за 48 часов',
      'Знакомство и созвон с командой до начала работ',
      'Оплата по факту часов и быстрая замена при необходимости'
    ],
    priceLabel: 'от 2 200 ₽/ч',
    timelineLabel: 'старт за 48 ч',
    ctaLabel: 'Рассчитать стоимость',
    actionType: 'calc-team'
  },
  {
    slug: 'presale-partner',
    number: '04',
    title: 'White Label для агентств',
    billingBadge: 'NDA & Партнёрство',
    accent: 'emerald',
    bullets: [
      'Бесплатная оценка ваших макетов за 24 часа',
      'Работаем под брендом вашего агентства без прямых контактов',
      'Или 10–20% агентской комиссии за переданный проект'
    ],
    priceLabel: '10–20% комиссия',
    timelineLabel: 'оценка 0 ₽',
    ctaLabel: 'Обсудить условия',
    actionType: 'brief'
  }
]

export const securityGuarantees: GuaranteeItem[] = [
  {
    id: 'client-yours',
    number: '01',
    title: 'Единый стандарт эстетики',
    description:
      'Продумываем типографику, сетки, отступы и микроанимации так, чтобы сайт выглядел дорого и целостно на любом экране.',
    icon: 'shield'
  },
  {
    id: 'stealth',
    number: '02',
    title: 'Живой доступ на каждом этапе',
    description:
      'Вы видите прогресс не только на скриншотах, но и на закрытом тестовом стенде — можно покликать анимации в реальном времени.',
    icon: 'git'
  },
  {
    id: 'nda-first',
    number: '03',
    title: 'Строгий NDA и конфиденциальность',
    description:
      'Подписываем NDA до изучения материалов. При работе с агентствами гарантируем полное соблюдение прав и запрет прямых контактов.',
    icon: 'lock'
  },
  {
    id: 'margin-safe',
    number: '04',
    title: 'Прозрачная стоимость без доплат',
    description:
      'Фиксируем бюджет и этапы в договоре до старта — вы точно знаете, сколько и за какой результат платите.',
    icon: 'file'
  },
  {
    id: 'no-lockin',
    number: '05',
    title: 'Полная передача прав и доступов',
    description:
      'Все исходники, дизайн-система, домены и админ-панель с первого дня принадлежат вам — без привязки к студии.',
    icon: 'check'
  },
  {
    id: 'sla-warranty',
    number: '06',
    title: 'Гарантия и поддержка 90 дней',
    description:
      'После запуска остаёмся на связи, обучаем вашу команду работе с контентом и оперативно вносим доработки.',
    icon: 'clock'
  }
]

export const stealthWorkflowNodes: StealthNode[] = [
  {
    id: 'client',
    label: 'Идея и задачи',
    role: 'Старт проекта',
    description: 'Изучаем продукт, аудиторию и визуальные референсы, чтобы предложить решение с характером и высокой конверсией.'
  },
  {
    id: 'agency',
    label: 'UX/UI и Анимации',
    role: 'Дизайн-система',
    description: 'Создаём прототипы, уникальный дизайн, сценарии параллакса и переходов, сохраняя чистоту и минимализм.'
  },
  {
    id: 'nda-gate',
    label: 'Контроль качества & NDA',
    role: 'Безопасность и скорость',
    description: 'Проверяем адаптив, плавность 60 FPS, быструю загрузку и соблюдение строгой конфиденциальности на каждом этапе.',
    isGateway: true
  },
  {
    id: 'engineers',
    label: 'Запуск и поддержка',
    role: 'Релиз под ключ',
    description: 'Переносим сайт на ваш домен, настраиваем аналитику и SEO, передаём все права и поддерживаем после релиза.'
  }
]

export const calculatorPresets: CalculatorPreset[] = [
  {
    id: 'promo-gsap',
    title: 'Промо-сайт / Имиджевый лендинг',
    priceRub: 180000,
    durationLabel: '2–3 нед.',
    weeksMin: 2,
    weeksMax: 3,
    description: 'Эффектный сайт компании или продукта с авторской анимацией и параллаксом.',
    defaultOptions: ['cwv-seo']
  },
  {
    id: 'corp-ssr',
    title: 'Корпоративный сайт / Портал',
    priceRub: 320000,
    durationLabel: '3–5 нед.',
    weeksMin: 3,
    weeksMax: 5,
    description: 'Многостраничный сайт бренда с удобным управлением контентом и каталогом.',
    defaultOptions: ['headless-cms', 'cwv-seo']
  },
  {
    id: 'ecom-cabinet',
    title: 'Интернет-магазин / Каталог',
    priceRub: 540000,
    durationLabel: '6–8 нед.',
    weeksMin: 6,
    weeksMax: 8,
    description: 'Быстрый каталог с фильтрами, корзиной, онлайн-оплатой и личным кабинетом.',
    defaultOptions: ['ui-kit', 'cwv-seo']
  },
  {
    id: 'custom-zero',
    title: 'Веб-сервис / Личный кабинет',
    priceRub: 420000,
    durationLabel: 'от 4 нед.',
    weeksMin: 4,
    weeksMax: 7,
    description: 'Индивидуальный онлайн-сервис или платформа под бизнес-задачи с аналитикой.',
    defaultOptions: ['ui-kit']
  }
]

export const calculatorOptions: CalculatorOption[] = [
  {
    id: 'ui-kit',
    title: 'Дизайн-система и библиотека блоков',
    priceRub: 45000,
    days: 4,
    tooltip: 'Единый набор фирменных компонентов, кнопок и карточек для лёгкого масштабирования сайта в будущем.'
  },
  {
    id: 'gsap-motion',
    title: 'Авторские анимации и параллакс',
    priceRub: 55000,
    days: 5,
    tooltip: 'Плавный скролл, многослойный параллакс, переходы между экранами и живые микроинтеракции.'
  },
  {
    id: 'webgl-3d',
    title: 'Интерактивная 3D-графика',
    priceRub: 95000,
    days: 7,
    tooltip: '3D-объекты, конфигураторы или эффекты с плавной работой на компьютерах и смартфонах.'
  },
  {
    id: 'headless-cms',
    title: 'Удобная панель управления (CMS)',
    priceRub: 65000,
    days: 5,
    tooltip: 'Редактируйте тексты, кейсы, товары и фотографии без участия программистов.'
  },
  {
    id: 'i18n',
    title: 'Мультиязычная версия сайта',
    priceRub: 35000,
    days: 3,
    tooltip: 'Переключение языков (RU / EN и другие) с корректной индексацией каждой версии.'
  },
  {
    id: 'cwv-seo',
    title: 'Базовая SEO-подготовка и скорость',
    priceRub: 30000,
    days: 2,
    tooltip: 'Мета-теги, красивые превью для Telegram и соцсетей, карта сайта и оптимизация скорости.'
  },
  {
    id: 'adaptive-design',
    title: 'Проработка мобильной версии (если макет только для ПК)',
    priceRub: 40000,
    days: 4,
    tooltip: 'Детальный дизайн всех экранов для смартфонов и планшетов в едином стиле.'
  }
]

export const outstaffRoles: OutstaffRole[] = [
  {
    id: 'frontend-vue',
    title: 'Ведущий веб-разработчик',
    subtitle: 'Вёрстка, архитектура, интерактивные интерфейсы',
    ratesRub: {
      'middle-plus': 2300,
      senior: 2900
    },
    hasGradeSwitch: true,
    defaultCount: 1
  },
  {
    id: 'tech-lead',
    title: 'Арт-директор / Тимлид',
    subtitle: 'Концепция, контроль качества, координация команды',
    ratesRub: {
      'middle-plus': 3400,
      senior: 3400
    },
    hasGradeSwitch: false,
    defaultCount: 0
  },
  {
    id: 'creative-dev',
    title: 'Motion & 3D разработчик',
    subtitle: 'Плавные анимации 60 FPS, параллакс, 3D-сцены',
    ratesRub: {
      'middle-plus': 2800,
      senior: 2800
    },
    hasGradeSwitch: false,
    defaultCount: 0
  },
  {
    id: 'qa-engineer',
    title: 'Тестировщик (QA)',
    subtitle: 'Проверка всех устройств, браузеров и сценариев',
    ratesRub: {
      'middle-plus': 1800,
      senior: 1800
    },
    hasGradeSwitch: false,
    defaultCount: 0
  }
]

export const casesData: CaseItem[] = [
  {
    id: 'case-1',
    slug: 'b2b-marketplace-nda',
    title: 'TITANBUILD — B2B-маркетплейс стройматериалов на 45 000 SKU',
    category: 'E-commerce · B2B',
    year: '2026',
    image: '/images/cases/case-1-b2b.jpg',
    clientLabel: 'Федеральный дистрибьютор (NDA)',
    partnerLabel: 'Подряд для digital-агентства, Москва',
    isNda: true,
    format: 'white-label',
    formatLabel: 'White Label / NDA',
    stacks: ['nuxt3', 'headless'],
    stackLabels: ['Каталог 45k SKU', 'Умный поиск', 'Личный кабинет', 'Интеграция 1С'],
    duration: '6 недель',
    team: '2 Senior devs + QA',
    summary:
      'Перенесли тяжёлый каталог на 45 000 SKU с устаревшего фронта на Nuxt 3 SSR с гибридным кэшированием (ISR), сохранив действующий бэкенд 1С-Битрикс по REST API.',
    architectureNote:
      'Разделение слоёв BFF на Nitro server routes, виртуальный скролл для прайс-листов, мгновенная фасетная фильтрация с синхронизацией URL и pre-render популярных категорий.',
    deliverables: [
      'Nuxt 3 SSR + Nitro BFF кэширование каталога',
      'B2B-кабинет оптовых закупок и выгрузка спецификаций',
      'Автотесты корзины и чекаута на Playwright',
      'Полная передача GitLab CI/CD и документации партнёру'
    ],
    metrics: {
      lighthouse: 99,
      lcp: '0.9s',
      cls: '0.00',
      inp: '38ms'
    },
    previewScheme: {
      route: '/catalog/bulk-order?sku=45000',
      accent: 'emerald',
      highlights: ['SSR Catalog 45k SKU', 'Nitro Redis Cache', 'Zero CLS']
    },
    partnerQuote: {
      text: 'Сдали сложный проект нашему ключевому клиенту на 5 дней раньше дедлайна. Заказчик уверен, что весь код написала наша инхаус-команда.',
      author: 'Руководитель продакшна',
      role: 'Digital-агентство (под NDA)'
    }
  },
  {
    id: 'case-2',
    slug: 'fintech-saas-cabinet-nda',
    title: 'QUANTUM — SaaS-кабинет и аналитика платежей для финтеха',
    category: 'Fintech · SaaS UI',
    year: '2026',
    image: '/images/cases/case-2-fintech.jpg',
    clientLabel: 'Платёжный B2B-провайдер (NDA)',
    partnerLabel: 'Подряд для дизайн-студии, Санкт-Петербург',
    isNda: true,
    format: 'white-label',
    formatLabel: 'White Label / NDA',
    stacks: ['vue3', 'nuxt3'],
    stackLabels: ['Дизайн-система', 'Живая аналитика', 'Личный кабинет', 'Адаптив'],
    duration: '5 недель',
    team: 'Tech Lead + Vue Senior',
    summary:
      'Реализовали интерфейсный UI-кит (48 компонентов) и личный кабинет аналитики транзакций по макетам Figma с жёстким соответствием пиксель-в-пиксель и строгим TypeScript.',
    architectureNote:
      'Модульная feature-sliced структура, табличные виджеты с `tabular-nums`, WebSocket-стриминг статусов платежей и ролевая модель доступа.',
    deliverables: [
      'Design System + Storybook из 48 компонентов',
      'Личный кабинет с графиками и экспортом отчётов',
      'Сквозная типизация API-схем через OpenAPI',
      'Покрытие критической логики тестами на Vitest (92%)'
    ],
    metrics: {
      lighthouse: 98,
      lcp: '1.0s',
      cls: '0.00',
      inp: '41ms'
    },
    previewScheme: {
      route: '/dashboard/analytics/payouts',
      accent: 'indigo',
      highlights: ['48 UI Components', 'WebSocket Live', '92% Vitest']
    },
    partnerQuote: {
      text: 'Редкий случай, когда разработчики не упрощают макеты арт-директора, а дотягивают микроинтеракции лучше, чем на статике в Figma.',
      author: 'Арт-директор студии',
      role: 'Бутиковая дизайн-студия (под NDA)'
    }
  },
  {
    id: 'case-3',
    slug: 'architectural-promo-gsap',
    title: 'KRONA Architects — имиджевый промо-сайт с GSAP & WebGL',
    category: 'Promo · Motion & 3D',
    year: '2026',
    image: '/images/cases/case-3-arch.jpg',
    clientLabel: 'KRONA Architects',
    partnerLabel: 'Совместный проект с брендинговым агентством',
    isNda: false,
    format: 'fixed',
    formatLabel: 'Под ключ',
    stacks: ['nuxt3', 'gsap'],
    stackLabels: ['Авторский дизайн', 'Параллакс', '3D-сцена', 'Плавный скролл'],
    duration: '3 недели',
    team: 'Creative Dev + Nuxt Senior',
    summary:
      'Сверхплавный промо-сайт с кинематографичными переходами между проектами, параллакс-галереями и WebGL-шейдером обложек на стабильных 60 FPS даже на мобильных.',
    architectureNote:
      'Статическая генерация (SSG) всех маршрутов, адаптивный WebGL fallback на CSS для слабых GPU, предзагрузка ассетов следующего экрана.',
    deliverables: [
      'Кастомные page transitions на Nuxt + GSAP Flip',
      'Оптимизированная видео- и WebP-галерея без CLS',
      'Настройка превью и микроразметки для соцсетей',
      '98+ баллов Lighthouse Mobile & Desktop'
    ],
    metrics: {
      lighthouse: 98,
      lcp: '0.8s',
      cls: '0.00',
      inp: '29ms'
    },
    previewScheme: {
      route: '/projects/nordic-pavilion',
      accent: 'cyan',
      highlights: ['60 FPS Scroll', 'SSG Pre-rendered', 'WebGL Fallback']
    },
    partnerQuote: {
      text: 'Сложные анимации и высокий Lighthouse обычно конфликтуют, но команда выжала 98 баллов даже с Three.js на борту.',
      author: 'Продюсер проекта',
      role: 'Брендинговое агентство'
    }
  },
  {
    id: 'case-4',
    slug: 'headless-media-portal',
    title: 'SYNTHETIC — высоконагруженный медиа-портал о дизайне и технологиях',
    category: 'Editorial · Media',
    year: '2026',
    image: '/images/cases/case-4-media.jpg',
    clientLabel: 'TechPulse / Synthetic Media',
    partnerLabel: 'Выделенный Pod для контент-агентства',
    isNda: false,
    format: 'outstaff',
    formatLabel: 'Аутстафф / Pod',
    stacks: ['nuxt3', 'headless'],
    stackLabels: ['Редакционная сетка', 'Админ-панель', 'Быстрая загрузка', 'SEO-структура'],
    duration: '4 недели',
    team: '1 Senior + 1 Middle+ Vue Dev',
    summary:
      'Миграция медиа-ресурса с медленного монолита на Nuxt 3 с инкрементальной регенерацией (ISR) и мгновенной публикацией статей из Directus без пересборки.',
    architectureNote:
      'Webhook-ревалидация кэша Nuxt по публикации материала, оптимизированная лента с lazy-гидрацией компонентов и чистая схема Schema.org NewsArticle.',
    deliverables: [
      'Nuxt 3 ISR с TTFB < 45ms по всей РФ',
      'Интеграция Directus CMS + редакторский предпросмотр Drafts',
      'Автогенерация OpenGraph-карточек статей',
      'Рост органического SEO-трафика на 34% за 2 месяца'
    ],
    metrics: {
      lighthouse: 100,
      lcp: '0.7s',
      cls: '0.00',
      inp: '24ms'
    },
    previewScheme: {
      route: '/editorial/nuxt-isr-architecture',
      accent: 'emerald',
      highlights: ['Lighthouse 100', 'TTFB 39ms', 'Directus Webhook']
    }
  },
  {
    id: 'case-5',
    slug: 'medtech-booking-outstaff-nda',
    title: 'MedPulse — платформа телемедицины и умной записи в клиники',
    category: 'MedTech · Web App',
    year: '2026',
    image: '/images/cases/case-5-medtech.jpg',
    clientLabel: 'Сеть клиник (NDA)',
    partnerLabel: 'Аутстафф для продуктового агентства',
    isNda: true,
    format: 'outstaff',
    formatLabel: 'White Label / NDA',
    stacks: ['vue3', 'headless'],
    stackLabels: ['Умное расписание', 'Видеозвонки', 'Онлайн-оплата', 'Личный кабинет'],
    duration: '8 недель',
    team: '2 Senior Vue Devs в команде клиента',
    summary:
      'Встроились за 48 часов в действующий скрам-поток партнёра, закрыли модуль расписания врачей, онлайн-оплату и интеграцию видеоконсультаций без единого срыва спринта.',
    architectureNote:
      'Работа внутри корпоративного GitLab и Jira партнёра, строгие MR-ревью, унифицированные composables работы с часовыми поясами.',
    deliverables: [
      'Модуль слотов записи и расписания врачей',
      'Интеграция онлайн-оплаты и уведомлений',
      'Снижение времени рендеринга календаря в 4 раза',
      'Передача знаний инхаус-разработчикам перед финалом'
    ],
    metrics: {
      lighthouse: 97,
      lcp: '1.1s',
      cls: '0.00',
      inp: '35ms'
    },
    previewScheme: {
      route: '/clinic/schedule-slots',
      accent: 'indigo',
      highlights: ['48h Onboarding', 'Partner GitLab', 'Strict TS']
    },
    partnerQuote: {
      text: 'Подключились ровно на второй день после тех-интервью и с первого спринта держали темп выше нашего штатного бенчмарка.',
      author: 'CTO партнёра',
      role: 'Продуктовое агентство (под NDA)'
    }
  },
  {
    id: 'case-6',
    slug: 'industrial-configurator-vue',
    title: 'Nordic 3D — интерактивный конфигуратор оборудования на Three.js',
    category: '3D WebGL · Configurator',
    year: '2026',
    image: '/images/cases/case-6-3d.jpg',
    clientLabel: 'Nordic Engineering',
    partnerLabel: 'White Label для B2B-агентства',
    isNda: false,
    format: 'fixed',
    formatLabel: 'Под ключ',
    stacks: ['vue3', 'gsap'],
    stackLabels: ['Интерактивный 3D', 'Конфигуратор', 'PDF-смета', 'Анимации'],
    duration: '4 недели',
    team: 'Creative Dev + Vue Dev + QA',
    summary:
      'Интерактивный браузерный конфигуратор модульного оборудования с мгновенным пересчётом спецификации, генерацией PDF-сметы и шарингом конфигурации по ссылке.',
    architectureNote:
      'Сжатые Draco-модели с прогрессивной загрузкой, реактивный стор конфигурации с URL-сериализацией и серверная генерация КП.',
    deliverables: [
      'Интерактивная 3D-сцена со сменой узлов в реальном времени',
      'Синхронизация параметров конфигурации в URL',
      'Автоматический экспорт коммерческого предложения',
      'Повышение конверсии в заявку на 42% по замерам партнёра'
    ],
    metrics: {
      lighthouse: 96,
      lcp: '1.1s',
      cls: '0.00',
      inp: '44ms'
    },
    previewScheme: {
      route: '/configurator?unit=pro-400&mod=heat',
      accent: 'cyan',
      highlights: ['Draco 3D', 'URL Share State', '+42% Conversion']
    }
  }
]

export const techStackCategories: TechStackCategory[] = [
  {
    id: 'core',
    title: 'Core & Frameworks',
    subtitle: 'Основной инженерный фундамент',
    items: [
      { name: 'Vue 3', level: 'Composition API · <script setup>' },
      { name: 'Nuxt 3', level: 'SSR · SSG · ISR · Nitro' },
      { name: 'TypeScript', level: 'Strict Mode' },
      { name: 'Vite', level: 'Bundle Optimization' },
      { name: 'Pinia', level: 'Typed Stores' }
    ]
  },
  {
    id: 'ui',
    title: 'UI & Styling',
    subtitle: 'Масштабируемые дизайн-системы',
    items: [
      { name: 'Tailwind CSS', level: 'Design Tokens' },
      { name: 'Nuxt UI', level: 'Enterprise Apps' },
      { name: 'Reka UI / Radix Vue', level: 'A11y Primitives' },
      { name: 'CSS Grid / Variables', level: 'Zero-Runtime Tokens' },
      { name: 'Storybook', level: 'UI Kits' }
    ]
  },
  {
    id: 'motion',
    title: 'Motion & Creative',
    subtitle: 'Кинематографичные интерфейсы 60 FPS',
    items: [
      { name: 'GSAP', level: 'ScrollTrigger · Flip' },
      { name: 'Lenis', level: 'Smooth Scroll' },
      { name: 'Three.js / WebGL', level: 'Interactive 3D' },
      { name: 'Lottie', level: 'Vector Motion' },
      { name: 'Canvas / SVG', level: 'Data Viz' }
    ]
  },
  {
    id: 'backend',
    title: 'Backend & Headless',
    subtitle: 'Любые CMS и корпоративные API',
    items: [
      { name: 'Strapi', level: 'Headless CMS' },
      { name: 'Directus', level: 'Data Studio' },
      { name: 'Laravel / Symfony', level: 'REST / BFF' },
      { name: 'NestJS', level: 'Node Backend' },
      { name: '1С-Битрикс API', level: 'REST / GraphQL' },
      { name: 'WordPress Headless', level: 'WPGraphQL' }
    ]
  },
  {
    id: 'ops',
    title: 'Quality & DevOps',
    subtitle: 'Предсказуемость релизов и SLA',
    items: [
      { name: 'Vitest', level: 'Unit & Logic' },
      { name: 'Playwright', level: 'E2E Scenarios' },
      { name: 'ESLint / Biome', level: 'CI Gate' },
      { name: 'Docker', level: 'Reproducible Env' },
      { name: 'GitHub Actions / GitLab CI', level: 'Auto Staging' },
      { name: 'Sentry', level: 'Error Telemetry' }
    ]
  }
]

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Брифинг и концепция',
    timing: '1–2 дня',
    description:
      'Погружаемся в бизнес, собираем мудборд, формируем структуру страниц и фиксируем понятную смету и сроки.'
  },
  {
    step: '02',
    title: 'Арт-дирекшн и UX/UI',
    timing: '5–10 дн.',
    description:
      'Рисуем дизайн-концепт главного экрана, согласовываем эстетику, затем проектируем все страницы и адаптив.'
  },
  {
    step: '03',
    title: 'Разработка и анимации',
    timing: '7–14 дн.',
    description:
      'Оживляем макеты: настраиваем параллакс, плавные переходы, 3D-сцены, формы заявок и админ-панель.'
  },
  {
    step: '04',
    title: 'Тесты, запуск и поддержка',
    timing: '2–3 дня',
    description:
      'Проверяем сайт на всех экранах, подключаем домен, аналитику, базовое SEO и передаём все доступы вам.'
  }
]

export const transparencyTabs: TransparencyTabData[] = [
  {
    key: 'staging',
    label: 'Живой стенд',
    urlOrTitle: 'https://preview.layer.dev/your-project',
    statusBadge: 'Доступен 24/7',
    rows: [
      {
        primary: 'Главная страница и интерактивный первый экран',
        secondary: 'Параллакс, плавная прокрутка и адаптив под смартфоны',
        meta: 'Готово',
        badge: 'LIVE'
      },
      {
        primary: 'Каталог, фильтры и карточки проектов',
        secondary: 'Мгновенный отклик без перезагрузки страницы',
        meta: 'Готово',
        badge: 'LIVE'
      },
      {
        primary: 'Проверка на iOS, Android и десктопах',
        secondary: 'Идеальная сетка и чёткая типографика на всех экранах',
        meta: 'Проверено',
        badge: 'OK'
      }
    ]
  },
  {
    key: 'commits',
    label: 'Дизайн и макеты',
    urlOrTitle: 'Figma · Единая дизайн-система проекта',
    statusBadge: 'Согласовано',
    rows: [
      {
        primary: 'Визуальная концепция и арт-дирекшн',
        secondary: 'Типографика, палитра и настроение бренда',
        meta: 'Этап 1',
        badge: 'DONE'
      },
      {
        primary: 'Десктопные и мобильные экраны',
        secondary: 'Все состояния кнопок, форм, меню и всплывающих окон',
        meta: 'Этап 2',
        badge: 'DONE'
      },
      {
        primary: 'Сценарий анимаций и параллакса',
        secondary: 'Интерактивный прототип переходов перед вёрсткой',
        meta: 'Этап 3',
        badge: 'REVIEW'
      }
    ]
  },
  {
    key: 'budget',
    label: 'Сроки и этапы',
    urlOrTitle: 'Прозрачный график выпуска проекта',
    statusBadge: 'Точно в срок',
    rows: [
      {
        primary: 'Аналитика, прототип и дизайн-концепция',
        secondary: 'Согласование структуры и ключевых акцентов',
        meta: '1 неделя',
        badge: 'DONE'
      },
      {
        primary: 'Дизайн всех страниц, UI-кит и адаптив',
        secondary: 'Готовые макеты для передачи в разработку',
        meta: '1–2 недели',
        badge: 'DONE'
      },
      {
        primary: 'Разработка, анимации, тестирование и запуск',
        secondary: 'Выход на боевой домен + обучение управлению сайтом',
        meta: '2 недели',
        badge: 'IN WORK'
      }
    ]
  }
]

export const studioFaqs: FaqItem[] = [
  {
    id: 'faq-nda',
    question: 'Сколько времени занимает создание сайта под ключ?',
    answer:
      'Имиджевый промо-сайт или лендинг с анимациями запускаем за 2–3 недели. Корпоративный сайт или интернет-магазин с каталогом и админ-панелью — за 4–7 недель. Точные сроки фиксируем в договоре после изучения задачи.'
  },
  {
    id: 'faq-presale',
    question: 'Можно ли редактировать тексты и кейсы самостоятельно после запуска?',
    answer:
      'Да. Мы подключаем удобную административную панель, где вы можете менять тексты, цены, фотографии и добавлять новые проекты в портфолио без помощи программистов.'
  },
  {
    id: 'faq-start',
    question: 'Работаете ли вы с агентствами и дизайн-студиями по White Label?',
    answer:
      'Да, это одно из наших направлений. Мы подписываем строгий NDA и выполняем разработку по вашим макетам под брендом вашего агентства — без каких-либо упоминаний нашей студии.'
  },
  {
    id: 'faq-legal',
    question: 'Как проходит оплата и какие документы вы предоставляете?',
    answer:
      'Работаем официально по договору с ООО, ИП и международными компаниями (поддерживаем ЭДО Диадок / СБИС). Оплата разбивается на комфортные этапы по мере приёмки результатов.'
  }
]
