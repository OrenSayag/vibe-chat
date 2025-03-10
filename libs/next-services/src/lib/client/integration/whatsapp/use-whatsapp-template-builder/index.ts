import { useRouter } from '@vibe-chat/next-services/server';
import {
  Locale,
  metadataSchema,
  NEW_WHATSAPP_TEMPLATE_ID,
  SaveTemplateRequest,
  saveTemplateSchema,
  WhatsappTemplate,
  WhatsappTemplateBuilderProps,
  WhatsappTemplateStatus,
} from '@vibe-chat/shared-types';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useSaveTemplate } from '../../../whatsapp/use-save-template';
import { useMetadata } from './methods/use-metadata';
import { useWorkbench } from './methods/use-workbench';
import { getConsts } from './utils';
import { useTemplateLocales } from './methods/use-template-locales';

type Output = WhatsappTemplateBuilderProps;

type Input = {
  templateByLocale?: WhatsappTemplate[];
};

export const useWhatsappTemplateBuilder = ({
  templateByLocale,
}: Input): Output => {
  const router = useRouter();
  const { categories, languages } = getConsts();

  const { templateLocale, selectLocale, locales, setLocales } =
    useTemplateLocales({
      templateByLocale,
    });

  const templateStatus = useMemo(() => {
    return templateByLocale?.[0]?.status;
  }, [templateByLocale]);

  const isReadOnly = useMemo(() => {
    if (!templateStatus) return false;
    return templateStatus !== WhatsappTemplateStatus.REJECTED;
  }, [templateStatus]);

  const metadataProps = useMetadata({
    categories,
    languages,
    data: templateByLocale?.[0]
      ? {
          name: templateByLocale?.[0]?.name,
          category: templateByLocale?.[0]?.category,
          languages: templateByLocale?.[0]?.language
            ? [templateByLocale?.[0]?.language.split('_')[0]]
            : [],
        }
      : undefined,
  });

  useEffect(() => {
    const newLocales =
      metadataProps.formData.languages.map((language) => {
        if (typeof language === 'string') {
          return language;
        }
        return language.value as Locale;
      }) ??
      templateByLocale?.map((template) => template.language.split('_')[0]);
    setLocales(newLocales as Locale[]);
  }, [metadataProps.formData.languages, templateByLocale]);

  const { locale, ...workbenchProps } = useWorkbench({
    locales,
    categories,
    onCategoryChange: metadataProps.onChange.category,
    category: metadataProps.formData.category,
    templateName: metadataProps.formData.name,
    onChangeTemplateName: metadataProps.onChange.name,
    onCreateLocale: (locale: Locale) => setLocales([...locales, locale]),
    onSelectLocale: selectLocale,
    selectedLocale: templateLocale,
    onRemoveLocale: (locale: Locale) =>
      setLocales(locales.filter((l) => l !== locale)),
    isReadOnly,
  });

  const { subscriptionId, templateName } = useParams();
  const isNewTemplate = useMemo(
    () => templateName === NEW_WHATSAPP_TEMPLATE_ID,
    [templateName]
  );

  const { saveTemplate, loading: pendingSave } = useSaveTemplate({
    subscriptionId: subscriptionId as string,
    isNewTemplate,
  });

  const [step, setStep] = useState<'metadata' | 'workbench'>(
    isNewTemplate ? 'metadata' : 'workbench'
  );

  const canSave = useMemo(() => {
    if (step === 'metadata') {
      return metadataSchema.safeParse(metadataProps.formData).success;
    }

    const data: SaveTemplateRequest = {
      template: {
        name: metadataProps.formData.name,
        category: metadataProps.formData.category,
        language: locale,
        components: Object.values(workbenchProps.formData),
      },
    };
    return saveTemplateSchema.safeParse(data).success;
  }, [
    JSON.stringify(metadataProps.formData),
    JSON.stringify(workbenchProps.formData),
    step,
    locale,
  ]);

  return {
    templateStatus,
    isNewTemplate,
    metadataProps: {
      ...metadataProps,
      readOnly: isReadOnly,
    },
    workbenchProps: {
      ...workbenchProps,
      headerProps: {
        ...workbenchProps.headerProps,
      },
    },
    onGoBack: () =>
      router.push(
        `/dashboard/${subscriptionId}/integration/whatsapp/templates`
      ),
    onSave: () => {
      if (isReadOnly) return;
      if (step === 'metadata') {
        setStep('workbench');
      } else {
        saveTemplate({
          template: {
            name: metadataProps.formData.name,
            category: metadataProps.formData.category,
            language: locale,
            components: Object.values(workbenchProps.formData),
          },
          templateId: templateByLocale?.[0]?.id
            ? parseInt(templateByLocale?.[0]?.id)
            : undefined,
        });
      }
    },
    pendingSave,
    canSave: !isReadOnly && canSave,
    step,
  };
};
