import { useToast } from '@vibe-chat/components';
import { useBackendRequest } from '@vibe-chat/next-services';
import {
  SaveTemplateRequest,
  SaveTemplateResponse,
  WhatsappTemplateComponentFormat,
} from '@vibe-chat/shared-types';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { saveTemplate } from '../../server/whatsapp/save-template';
type Input = {
  subscriptionId: string;
  isNewTemplate?: boolean;
};

export const useSaveTemplate = ({ subscriptionId, isNewTemplate }: Input) => {
  const [error, setError] = useState<string>();

  const { toast } = useToast();

  const { push } = useRouter();

  const { pending, startAction } = useBackendRequest<
    SaveTemplateResponse['data'],
    SaveTemplateRequest
  >({
    apiCall: (input) => saveTemplate(input, subscriptionId),
    onError(err) {
      setError('Error saving template');
      toast({
        type: 'negative',
        children: 'Error saving template',
        actions: [],
      });
    },
    onSuccess: ({ name }) => {
      setError('');
      toast({
        type: 'positive',
        children: 'Template saved successfully',
        actions: [],
      });
      if (isNewTemplate) {
        push(
          `/dashboard/${subscriptionId}/integration/whatsapp/template/${name}`
        );
      }
    },
  });

  return {
    loading: pending,
    error,
    saveTemplate: (input: SaveTemplateRequest) =>
      startAction(normalizeInput(input)),
  };
};
function normalizeInput(input: SaveTemplateRequest) {
  return {
    ...input,
    template: {
      ...input.template,
      components: input.template.components.filter((component) => {
        if (component.type === 'FOOTER' && !component.text) {
          return false;
        }
        if (component.type === 'HEADER') {
          if (component.format !== WhatsappTemplateComponentFormat.LOCATION) {
            return component.text;
          }
          return true;
        }
        if (
          component.type === 'BUTTONS' &&
          (!component.buttons || component.buttons.length === 0)
        ) {
          return false;
        }
        return true;
      }),
    },
  };
}
