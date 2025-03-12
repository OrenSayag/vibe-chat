import { useRouter } from '@vibe-chat/next-services/server';
import {
  Locale,
  metadataSchema,
  NEW_WHATSAPP_TEMPLATE_ID,
  SaveTemplateRequest,
  saveTemplateSchema,
  WhatsappContentForm,
  WhatsappTemplate,
  WhatsappTemplateBuilderProps,
  WhatsappTemplateComponent,
  WhatsappTemplateStatus,
} from '@vibe-chat/shared-types';
import { useParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { z } from 'zod';
import { useSaveTemplate } from '../../../whatsapp/use-save-template';
import { useMetadata } from './methods/use-metadata';
import { useTemplateLocales } from './methods/use-template-locales';
import { useWorkbench } from './methods/use-workbench';
import { getConsts } from './utils';

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
    data: templateByLocale
      ? {
          name: templateByLocale[0].name,
          category: templateByLocale[0].category,
          languages: templateByLocale[0].language
            ? templateByLocale.map((t) => t.language.split('_')[0])
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
    templateByLocale,
  });

  const { subscriptionId, templateName } = useParams();
  const isNewTemplate = useMemo(
    () => templateName === NEW_WHATSAPP_TEMPLATE_ID,
    [templateName]
  );

  const [step, setStep] = useState<'metadata' | 'workbench'>(
    isNewTemplate ? 'metadata' : 'workbench'
  );

  const requests = useMemo<SaveTemplateRequest[]>(() => {
    return locales.map((locale) => {
      return {
        template: {
          name: metadataProps.formData.name,
          category: metadataProps.formData.category,
          language: locale,
          components: Object.values(workbenchProps.formData).map(
            (component) => {
              if ((component as WhatsappContentForm['body']).text) {
                return {
                  ...component,
                  text: (component as WhatsappContentForm['body']).text[locale],
                };
              }
              if ((component as WhatsappContentForm['buttons'])?.buttons) {
                return {
                  ...component,
                  buttons: (
                    component as WhatsappContentForm['buttons']
                  )?.buttons.map((button) => ({
                    ...button,
                    text: button.text[locale],
                  })),
                };
              }
              return component;
            }
          ) as WhatsappTemplateComponent[],
        },
      };
    });
  }, [
    locales,
    JSON.stringify(metadataProps.formData),
    JSON.stringify(workbenchProps.formData),
  ]);

  const canSave = useMemo(() => {
    if (step === 'metadata') {
      return metadataSchema.safeParse(metadataProps.formData).success;
    }

    return z.array(saveTemplateSchema).safeParse(requests).success;
  }, [
    requests,
    step,
    JSON.stringify(metadataProps.formData),
    JSON.stringify(workbenchProps.formData),
  ]);

  const { onSave, loading: pendingSave } = useSaveTemplate({
    subscriptionId: subscriptionId as string,
    isNewTemplate,
    requests,
  });

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
        onSave();
      }
    },
    pendingSave,
    canSave: !isReadOnly && canSave,
    step,
  };
};
