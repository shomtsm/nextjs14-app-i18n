import { MetadataRoute } from 'next'
import i18nConfig from '@/i18nConfig'

const root = 'https://your-site.com'

type ChangeFrequency =
  | 'weekly'
  | 'yearly'
  | 'monthly'
  | 'always'
  | 'hourly'
  | 'daily'
  | 'never'
  | undefined

const pages: {
  path: string
  changeFrequency: ChangeFrequency
  priority: number
}[] = [
  {
    path: '/',
    changeFrequency: 'weekly',
    priority: 1,
  },
  {
    path: '/contact',
    changeFrequency: 'yearly',
    priority: 0.8,
  },
  {
    path: '/about',
    changeFrequency: 'monthly',
    priority: 0.7,
  },
]

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = []

  pages.forEach((page) => {
    i18nConfig.locales.forEach((locale) => {
      const path =
        locale === i18nConfig.defaultLocale && i18nConfig.prefixDefault
          ? `/${locale}${page.path}`
          : page.path
      sitemapEntries.push({
        url: `${root}${path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
      })
    })
  })

  return sitemapEntries
}
