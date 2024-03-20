const i18nConfig = {
  locales: ['en', 'ja', 'zh'] as const, // as constを追加
  defaultLocale: 'ja',
  prefixDefault: false, // デフォルトlocalのprefixを付けるかどうか
}

export type Langs = (typeof i18nConfig.locales)[number] // 型の作成

export default i18nConfig
