import type { Metadata } from 'next'
import { type Langs } from '@/i18n/config'
import { getDictionary } from '@/i18n'
import { AppProvider } from '@/contexts/AppContext'

export const metadata: Metadata = {
  title: 'Your Application Name',
  description: 'Your description',
}

interface RootLayoutProps {
  children: React.ReactNode
  params: { locale: Langs }
}

export default async function RootLayout({
  children,
  params,
}: Readonly<RootLayoutProps>) {
  const { locale } = params
  const dict = await getDictionary(locale)

  return (
    <html lang={locale}>
      <body>
        <AppProvider dict={dict}>{children}</AppProvider>
      </body>
    </html>
  )
}
