import type { FaqItem } from '~/types'
import { siteConfig } from '~/config/site'

export interface PageSeoOptions {
  title: string
  description: string
  path?: string
  ogImage?: string
  serviceName?: string
  serviceDescription?: string
  faqs?: FaqItem[]
}

/**
 * Sets consistent OpenGraph, Twitter Card, canonical URL,
 * and Schema.org JSON-LD metadata for SSR/SSG pages.
 */
export function useSeoSchema(options: PageSeoOptions) {
  const config = useRuntimeConfig()
  const siteUrl = ((config.public.siteUrl as string) || siteConfig.brand.siteUrl).replace(/\/$/, '')
  const pageUrl = `${siteUrl}${options.path ?? '/'}`
  const ogImage = options.ogImage
    ? `${siteUrl}${options.ogImage}`
    : `${siteUrl}/og-cover.svg`

  useSeoMeta({
    title: options.title,
    description: options.description,
    ogTitle: options.title,
    ogDescription: options.description,
    ogType: 'website',
    ogSiteName: siteConfig.brand.name,
    ogUrl: pageUrl,
    ogImage,
    ogLocale: 'ru_RU',
    twitterCard: 'summary_large_image',
    twitterTitle: options.title,
    twitterDescription: options.description,
    twitterImage: ogImage
  })

  const scripts: Array<{ type: string, innerHTML: string }> = [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: siteConfig.brand.name,
        url: siteUrl,
        description: siteConfig.brand.description,
        email: siteConfig.contacts.email,
        sameAs: [siteConfig.contacts.telegramUrl, siteConfig.contacts.vkUrl]
      })
    }
  ]

  if (options.serviceName) {
    scripts.push({
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: options.serviceName,
        description: options.serviceDescription ?? options.description,
        provider: {
          '@type': 'Organization',
          name: siteConfig.brand.name,
          url: siteUrl
        },
        areaServed: 'RU'
      })
    })
  }

  if (options.faqs && options.faqs.length > 0) {
    scripts.push({
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: options.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      })
    })
  }

  useHead({
    link: [{ rel: 'canonical', href: pageUrl }],
    script: scripts
  })
}
