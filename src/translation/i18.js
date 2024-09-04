import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import vi from '../translation/locales/vi.json'
import en from '../translation/locales/en.json'


const resources = {
  en: {
    translation: en
  },
  vi: {
    translation: vi
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng:'en',
    lng: localStorage.getItem('language') || 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
