import { useToast } from '@vibe-chat/components';
import { useBackendRequest } from '@vibe-chat/next-services';
import {
  BackendBaseResponse,
  SaveTemplateError,
  SaveTemplateRequest,
  SaveTemplateResponse,
  WhatsappTemplateComponentFormat,
} from '@vibe-chat/shared-types';
import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { saveTemplate } from '../../server/whatsapp/save-template';
import { useTranslations } from 'next-intl';
type Input = {
  subscriptionId: string;
  isNewTemplate?: boolean;
  requests: SaveTemplateRequest[];
};

export const useSaveTemplate = ({
  subscriptionId,
  isNewTemplate,
  requests,
}: Input) => {
  const [error, setError] = useState<string>();

  const { toast } = useToast();

  const { push } = useRouter();
  const t = useTranslations('WhatsappTemplatesView');

  const { pending, startAction } = useBackendRequest<
    SaveTemplateResponse['data'],
    SaveTemplateRequest[]
  >({
    apiCall: (input) => saveTemplate(input, subscriptionId),
    onError(err) {
      const errMessage =
        (err as BackendBaseResponse<unknown>).message ===
        SaveTemplateError.TEMPLATE_NAME_ALREADY_EXISTS
          ? t('templateNameAlreadyExistsError')
          : 'Error saving template';
      setError(errMessage);
      toast({
        type: 'negative',
        children: errMessage,
        actions: [],
      });
    },
    onSuccess: ({ name }) => {
      setError('');
      toast({
        type: 'positive',
        children: t('templateSaveSuccessfullyMessage'),
        actions: [],
      });
      if (isNewTemplate) {
        push(
          `/dashboard/${subscriptionId}/integration/whatsapp/template/${name}`
        );
      }
    },
  });

  const onSave = useCallback(() => {
    startAction(requests.map(normalizeInput));
  }, [requests, startAction]);

  return {
    loading: pending,
    error,
    onSave,
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
