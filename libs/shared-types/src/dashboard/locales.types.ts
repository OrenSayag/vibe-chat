export enum Locale {
  HEBREW = 'he',
  ENGLISH = 'en',
}

export const locales = [Locale.HEBREW, Locale.ENGLISH];

export const defaultLocale = Locale.ENGLISH;

export const rtlLocales: Locale[] = [Locale.HEBREW];

export const localeOriginalNameMap: Record<Locale, string> = {
  [Locale.ENGLISH]: 'English',
  [Locale.HEBREW]: 'עברית',
};

export const whatsappTemplateLocaleMap: Record<Locale, string> = {
  [Locale.ENGLISH]: 'en',
  [Locale.HEBREW]: 'he',
};
