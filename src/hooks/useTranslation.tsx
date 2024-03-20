import { useAppContext } from '@/contexts/AppContext'
import { getTranslation } from '@/i18n'

export default function useTranslation() {
  const { dict } = useAppContext()

  const translate = (path: string) => getTranslation(dict, path)

  return { t: translate }
}
