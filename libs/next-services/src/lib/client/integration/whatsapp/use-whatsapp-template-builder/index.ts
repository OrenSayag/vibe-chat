import {
  Locale,
  localeOriginalNameMap,
  locales,
  WhatsappTemplate,
  WhatsappTemplateBuilderProps,
  WhatsappTemplateCategory,
  whatsappTemplateCategoryTranslations,
} from '@vibe-chat/shared-types';

type Output = WhatsappTemplateBuilderProps;

type Input = {
  template?: WhatsappTemplate;
};

export const useWhatsappTemplateEditor = ({ template }: Input): Output => {
  const { categories, languages } = getConsts();

  return {
    isNewTemplate: !template,
    metadataProps: {
      categories,
      languages,
      onSubmit: () => {},
      pendingSubmit: false,
    },
    workbenchProps: {
      onSubmit: () => {},
      pendingSubmit: false,
      categories,
      localesProps: {
        locales: Object.values(Locale),
        selectedLocale: defaultLocale,
        onChange: () => {},
        onCreateLocale: () => {},
      },
    },
    onGoBack: () => {},
    onSubmit: () => {},
  };
};

const getConsts = () => ({
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
