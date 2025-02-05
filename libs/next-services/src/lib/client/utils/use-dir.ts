import { useLocale } from 'next-intl';
import { Locale, rtlLocales } from '@monday-whatsapp/shared-types';

export const useDir = () => {
  const locale = useLocale();
  return rtlLocales.includes(locale as Locale) ? 'rtl' : 'ltr';
};
