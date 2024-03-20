'use client'

import { useCurrentLocale } from 'next-i18n-router/client'
import i18nConfig from '@/i18nConfig'
import useLang from '@/hooks/useLang'

function ClientComponentSample() {
  const locale = useCurrentLocale(i18nConfig)
  const { locales, changeLang } = useLang()
  return (
    <div style={{ backgroundColor: 'lightblue' }}>
      <h1>Client Component</h1>
      <p>Locale: {locale}</p>
      {locales.map((lang) => (
        <button key={lang} onClick={() => changeLang(lang)}>
          change lang to {lang}
        </button>
      ))}
    </div>
  )
}
export default ClientComponentSample
