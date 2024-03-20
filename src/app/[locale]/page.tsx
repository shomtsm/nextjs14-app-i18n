import { type Langs } from '@/i18n/config'
import { createTranslator } from '@/i18n'

import ClientComponentSample from './_lib/ClientComponentSample'
import SampleComponenet from './_lib/SampleComponent'

export default async function Home({
  params: { locale },
}: {
  params: {
    locale: Langs
  }
}) {
  const t = await createTranslator(locale)
  return (
    <main>
      <h1>Server Component</h1>
      <p>Locale: {locale}</p>
      <SampleComponenet t={t} />
      <ClientComponentSample />
    </main>
  )
}
