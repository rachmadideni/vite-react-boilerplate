import enMessages from './en/messages'
import idMessages from './id/messages'

type Locale = 'en' | 'id'
type Messages = Record<string, string>

const messagesMap: Record<Locale, Messages> = {
  en: enMessages,
  id: idMessages,
}

export function getMessages(locale: Locale): Messages {
  return messagesMap[locale] ?? messagesMap.en
}

export { enMessages, idMessages }
