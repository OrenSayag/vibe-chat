import { useRouter } from '@vibe-chat/next-services/server';
import {
  WhatsappTemplate,
  WhatsappTemplateBuilderProps,
} from '@vibe-chat/shared-types';
import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { useSaveTemplateDraft } from '../../../whatsapp/use-save-template-draft';
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
  const { canSave, ...metadataProps } = useMetadata({
    template,
    categories,
    languages,
  });
  const workbenchProps = useWorkbench({
    template,
    categories,
    onNameChange: metadataProps.onChange.name,
    onCategoryChange: metadataProps.onChange.category,
  });
  const { subscriptionId } = useParams();
  const isNewTemplate = useMemo(() => !template, [template]);
  const {
    error,
    loading: pendingSaveDraft,
    saveTemplate: saveTemplateDraft,
  } = useSaveTemplateDraft({
    subscriptionId: subscriptionId as string,
    isNewTemplate,
  });

  return {
    isNewTemplate,
    metadataProps,
    workbenchProps,
    onGoBack: () =>
      router.push(
        `/dashboard/${subscriptionId}/integration/whatsapp/templates`
      ),
    onSubmit: {
      label: template ? 'Save Changes' : 'Create Template',
      onClick: () => {},
    },
    onSaveDraft: () => {
      if (isNewTemplate) {
        saveTemplateDraft({
          category: metadataProps.formData.category,
          components: Object.values(workbenchProps.formData),
          language: metadataProps.formData.languages[0].value,
          name: metadataProps.formData.name,
        });
      }
    },
    pendingSave: pendingSaveDraft,
    onPublish: () => {},
    canSave,
  };
};
