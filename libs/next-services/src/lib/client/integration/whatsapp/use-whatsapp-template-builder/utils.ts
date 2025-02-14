import {
  Locale,
  WhatsappTemplateCategory,
  localeOriginalNameMap,
  locales,
  whatsappTemplateCategoryTranslations,
} from '@vibe-chat/shared-types';

export const getConsts = () => ({
  categories: Object.values(WhatsappTemplateCategory).map((category) => ({
    id: category,
    label:
      whatsappTemplateCategoryTranslations[
        category as WhatsappTemplateCategory
      ][Locale.ENGLISH as Locale],
    value: category,
  })),
  languages: locales.map((locale) => ({
    id: locale,
    label: localeOriginalNameMap[locale],
    value: locale,
  })),
});
