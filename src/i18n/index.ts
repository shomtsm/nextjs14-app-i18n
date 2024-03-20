import i18nConfig, { type Langs } from '@/i18n/config'

const dictionaries = i18nConfig.locales.reduce((acc, lang) => {
  acc[lang] = () =>
    import(`./dictionaries/${lang}.json`).then((module) => module.default)
  return acc
}, {} as { [K in Langs]: () => Promise<any> })

export const getDictionary = async (locale: Langs) => dictionaries[locale]()

export const getTranslation = (dict: any, path: string) => {
  const keys = path.split('.')
  let result = dict
  for (let key of keys) {
    if (result === undefined) {
      return path
    }
    result = result[key]
  }
  if (typeof result !== 'string') {
    return path
  }
  return result
}

export const createTranslator = async (locale: Langs) => {
  const dict = await getDictionary(locale)
  return (path: string) => getTranslation(dict, path)
}
