# Next.js 14 i18n with App Router Sample

This repository demonstrates a simple yet effective way to implement internationalization (i18n) in a Next.js 14 application using the `next-i18n-router` library. This approach simplifies the setup compared to traditional methods, offering a seamless i18n routing mechanism for both server and client components.

## Getting Started

### Installation

First, install the `next-i18n-router` package in your project:

```bash
npm install next-i18n-router
```

### Configuration

1. **Locale Directory Setup**: Create a `[locale]` directory under `app` and move all existing pages under this new `[locale]` directory. Non-page directories like `/app/api` need not be moved unless endpoint changes are required for different languages.

2. **i18n Configuration**: Create a `config.ts` file to configure your locales and default locale settings:

```ts
const i18nConfig = {
  locales: ['en', 'ja', 'zh'] as const,
  defaultLocale: 'ja',
  prefixDefault: false, // Whether to prefix the default locale in the path
}

export type Langs = (typeof i18nConfig.locales)[number]

export default i18nConfig
```

### Middleware Setup

Configure middleware for routing based on the locale.

```ts
// middleware.ts
import { i18nRouter } from 'next-i18n-router'
import i18nConfig from '@/i18n/config'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  return i18nRouter(request, i18nConfig)
}

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
}
```

## Features

- **Multilingual Routing**: Automatically routes pages based on the locale with support for default and specified locales.
- **Current Locale Detection**: Easily access the current locale in both server and client components.
- **i18n Sitemap Generation**: Supports generating a sitemap with multilingual paths to improve SEO.
- **Language Switching**: Provides a custom hook for changing the application's language through path manipulation.
- **Dictionary Usage**: Demonstrates how to use locale-specific dictionaries for rendering localized texts in components.

## Examples

### Retrieving Current Locale

Server Component:

```tsx
export default function ExampleServerComponent({ params: { locale } }) {
  return (
    <div>
      <p>{locale}</p>
    </div>
  )
}
```

Client Component:

```tsx
function ExampleClientComponent() {
  const locale = useCurrentLocale(i18nConfig)
  // Usage example
}
```

### Language Switching

The `changeLang` function provides a seamless way for users to switch languages within the application. It is part of our custom hook that abstracts the complexity of routing and state management involved in language switching.

```tsx
import useLang from '@/hooks/useLang'

export default function Memo() {
  const { locale, locales, changeLang } = useLang()

  return (
    <div>
      {locales.map((lang) => (
        <button key={lang} onClick={() => changeLang(lang)}>
          change lang to {lang}
        </button>
      ))}
    </div>
  )
}
```

Here's a breakdown of how `changeLang` works:

1. **Detect Current Locale and Path**: The function first identifies the current locale and the current path of the application. This step is essential to understand which language version of the page the user is currently viewing.

2. **Path Manipulation**: Based on the selected language, `changeLang` modifies the application's URL. If the default language is selected, and `prefixDefault` in our `i18nConfig` is set to `false`, the function removes the language prefix from the URL. For any other language, it adds or updates the prefix in the URL to match the selected language.

3. **Redirection**: After modifying the path, `changeLang` uses Next.js's `router.replace` method to update the URL without reloading the page. This method ensures a smooth and fast transition between languages, providing a better user experience.

4. **Query Parameters Preservation**: `changeLang` also takes care of preserving any query parameters present in the URL during the language switch. This detail is crucial for maintaining the application state and ensuring that the user returns to the same context in the new language.


### Improved Translation Approach: Client and Server Components

This approach enhances the application's internationalization by providing a custom translation function that simplifies accessing localized strings.

#### Server Component Example:

When working on the server side, you can use `createTranslator` to fetch and apply translations within server components. Here's how you can use it:

```tsx
import { type Langs } from '@/i18n/config';
import { createTranslator } from '@/i18n';

interface ExampleServerComponentProps {
  params: { locale: Langs };
}
export default async function ExampleServerComponent({
  params: { locale },
}: ExampleServerComponentProps) {
  const t = await createTranslator(locale);

  return return <button>{t('products.cart')}</button>
}
```

#### Client Component Example:

For the client side, `useTranslation` provides a hook to easily fetch and use translations within client components:

```tsx
'use client'
import useTranslation from '@/hooks/useTranslation'

export default function SampleClientComponent() {
  const { t } = useTranslation()

  return <button>{t('products.cart')}</button>
}
```

## References

- [Next.js Official Documentation](https://nextjs.org/docs/app/building-your-application/routing/internationalization)
- [next-i18n-router GitHub](https://github.com/vercel/next.js/tree/canary/examples/with-i18n-router)
