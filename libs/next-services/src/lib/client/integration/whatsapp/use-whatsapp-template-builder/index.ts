import {
  WhatsappTemplate,
  WhatsappTemplateBuilderProps
} from '@vibe-chat/shared-types';
import { useMetadata } from './methods/use-metadata';
import { useWorkbench } from './methods/use-workbench';
import { getConsts } from './utils';

type Output = WhatsappTemplateBuilderProps;

type Input = {
  template?: WhatsappTemplate;
};

export const useWhatsappTemplateEditor = ({ template }: Input): Output => {
  const { categories, languages } = getConsts();
  const metadataProps = useMetadata({ template, categories, languages });
  const workbenchProps = useWorkbench({ template, categories });

  return {
    isNewTemplate: !template,
    metadataProps,
    workbenchProps,
    onGoBack: () => {},
    onSubmit: {
      label: template ? 'Save Changes' : 'Create Template',
      onClick: () => {},
    },
  };
};
