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
import { useTemplateLocale } from './methods/use-template-locale';

type Output = WhatsappTemplateBuilderProps;

type Input = {
  templateByLocale?: WhatsappTemplate[];
};

export const useWhatsappTemplateBuilder = ({
  templateByLocale,
}: Input): Output => {
  const router = useRouter();
  const { categories, languages } = getConsts();

  const { template, templateLocale } = useTemplateLocale({ templateByLocale });

  const isReadOnly = useMemo(() => {
    if (!template?.status) return false;
    return template.status !== WhatsappTemplateStatus.REJECTED;
  }, [template?.status]);

  const metadataProps = useMetadata({
    categories,
    languages,
    template,
  });

  const [locales, setLocales] = useState(
    metadataProps.formData.languages.map(
      (language) => language.value as Locale
    ) ?? templateByLocale?.map((template) => template.language.split('_')[0])
  );

  const [selectedLocale, setSelectedLocale] = useState(locales[0]);

  useEffect(() => {
    const newLocales =
      templateByLocale
        ?.filter(Boolean)
        .map((template) => template.language?.split('_')[0]) ??
      metadataProps.formData.languages.map(
        (language) => language.value as Locale
      );
    console.log({
      newLocales,
      templateByLocale,
      metadataProps,
    });

    setLocales(newLocales as Locale[]);
    setSelectedLocale(newLocales[0] as Locale);
  }, [metadataProps.formData.languages, templateByLocale]);

  const { locale, ...workbenchProps } = useWorkbench({
    template,
    locales,
    categories,
    onCategoryChange: metadataProps.onChange.category,
    category: metadataProps.formData.category,
    templateName: metadataProps.formData.name,
    onChangeTemplateName: metadataProps.onChange.name,
    onCreateLocale: (locale: Locale) => setLocales([...locales, locale]),
    onSelectLocale: (locale: Locale) => setSelectedLocale(locale),
    selectedLocale,
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
    templateStatus: template?.status,
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
          templateId: template?.id ? parseInt(template.id) : undefined,
        });
      }
    },
    pendingSave,
    canSave: !isReadOnly && canSave,
    step,
  };
};
