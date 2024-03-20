'use client'

import { useCurrentLocale } from 'next-i18n-router/client'
import i18nConfig from '@/i18n/config'
import useLang from '@/hooks/useLang'
import useTranslation from '@/hooks/useTranslation'
import SampleComponenet from './SampleComponent'

function ClientComponentSample() {
  const locale = useCurrentLocale(i18nConfig)
  const { locales, changeLang } = useLang()
  const { t } = useTranslation()
  return (
    <div style={{ backgroundColor: 'lightblue' }}>
      <h1>Client Component</h1>
      <p>Locale: {locale}</p>
      {locales.map((lang) => (
        <button key={lang} onClick={() => changeLang(lang)}>
          change lang to {lang}
        </button>
      ))}
      <SampleComponenet t={t} />
    </div>
  )
}
export default ClientComponentSample
