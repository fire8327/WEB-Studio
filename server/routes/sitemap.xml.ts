import type { H3Event } from 'h3'
import { casesData } from '~/data/studio'

export default defineEventHandler((event: H3Event) => {
  const config = useRuntimeConfig(event)
  const siteUrl = ((config.public.siteUrl as string) || 'https://layer.dev').replace(/\/$/, '')

  const routes = [
    { loc: '/', priority: '1.0', changefreq: 'weekly' },
    { loc: '/white-label', priority: '0.9', changefreq: 'weekly' },
    { loc: '/outstaffing-vue', priority: '0.9', changefreq: 'weekly' },
    { loc: '/nuxt-development', priority: '0.9', changefreq: 'weekly' },
    { loc: '/cases', priority: '0.8', changefreq: 'weekly' },
    { loc: '/calculator', priority: '0.8', changefreq: 'monthly' },
    { loc: '/brief', priority: '0.8', changefreq: 'monthly' },
    ...casesData.map(item => ({
      loc: `/cases/${item.slug}`,
      priority: '0.7',
      changefreq: 'monthly'
    }))
  ]

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .map(
    route => `  <url>
    <loc>${siteUrl}${route.loc}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>`

  return new Response(xml, {
    status: 200,
    headers: {
      'content-type': 'application/xml; charset=utf-8'
    }
  })
})
