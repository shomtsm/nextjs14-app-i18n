import ClientComponentSample from './_lib/ClientComponentSample'
export default function Home({
  params: { locale },
}: {
  params: {
    locale: string
  }
}) {
  return (
    <main>
      <h1>Server Component</h1>
      <p>Locale: {locale}</p>
      <ClientComponentSample />
    </main>
  )
}
