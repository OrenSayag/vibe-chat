export enum Locale {
  HEBREW = 'he',
  ENGLISH = 'en',
}

export const locales = [Locale.HEBREW, Locale.ENGLISH];

export const defaultLocale = Locale.ENGLISH;

export const rtlLocales: Locale[] = [Locale.HEBREW];
