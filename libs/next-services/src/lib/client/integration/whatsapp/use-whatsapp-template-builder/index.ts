import { useRouter } from '@vibe-chat/next-services/server';
import {
  metadataSchema,
  NEW_WHATSAPP_TEMPLATE_ID,
  SaveTemplateRequest,
  saveTemplateSchema,
  WhatsappTemplate,
  WhatsappTemplateBuilderProps,
} from '@vibe-chat/shared-types';
import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useSaveTemplate } from '../../../whatsapp/use-save-template';
import { useMetadata } from './methods/use-metadata';
import { useWorkbench } from './methods/use-workbench';
import { getConsts } from './utils';

type Output = WhatsappTemplateBuilderProps;

type Input = {
  template?: WhatsappTemplate;
};

export const useWhatsappTemplateBuilder = ({ template }: Input): Output => {
  const router = useRouter();
  const { categories, languages } = getConsts();

  const metadataProps = useMetadata({
    categories,
    languages,
    template,
  });

  const { locale, ...workbenchProps } = useWorkbench({
    template,
    categories,
    onCategoryChange: metadataProps.onChange.category,
    category: metadataProps.formData.category,
    templateName: metadataProps.formData.name,
    onChangeTemplateName: metadataProps.onChange.name,
  });
  const { subscriptionId, templateName } = useParams();
  const isNewTemplate = useMemo(
    () => templateName === NEW_WHATSAPP_TEMPLATE_ID,
    [templateName]
  );

  const { saveTemplate, loading: pendingSave } = useSaveTemplate({
    subscriptionId: subscriptionId as string,
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
    isNewTemplate,
    metadataProps,
    workbenchProps,
    onGoBack: () =>
      router.push(
        `/dashboard/${subscriptionId}/integration/whatsapp/templates`
      ),
    onSave: () => {
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
        });
      }
    },
    pendingSave,
    canSave,
    step,
  };
};
