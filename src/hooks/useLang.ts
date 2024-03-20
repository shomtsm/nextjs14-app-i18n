import { useCurrentLocale } from 'next-i18n-router/client'
import i18nConfig, { type Langs } from '@/i18n/config'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export default function useLang() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const defaultLocale = i18nConfig.defaultLocale

  const locale = useCurrentLocale(i18nConfig)
  const locales = i18nConfig.locales
  const changeLang = (lang: Langs) => {
    let newPath = pathname
    if (locale === defaultLocale) {
      if (lang !== defaultLocale) {
        newPath = `/${lang}${pathname}`
      }
    } else {
      newPath = pathname.replace(new RegExp(`^/${locale}(\/|$)`), `/${lang}$1`)
    }

    const searchParamsString = searchParams.toString()
      ? `?${searchParams.toString()}`
      : ''
    router.replace(`${newPath}${searchParamsString}`)
  }

  return { locale, locales, changeLang }
}
