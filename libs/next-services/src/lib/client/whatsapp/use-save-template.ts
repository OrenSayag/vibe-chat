import { useBackendRequest } from '@vibe-chat/next-services';
import {
  SaveTemplateRequest,
  SaveTemplateResponse,
} from '@vibe-chat/shared-types';
import { useState } from 'react';
import { saveTemplate } from '../../server/whatsapp/save-template';
import { useToast } from '@vibe-chat/components';
export const useSaveTemplate = () => {
  const [error, setError] = useState<string>();

  const { toast } = useToast();

  const { pending, startAction } = useBackendRequest<
    SaveTemplateResponse['data'],
    SaveTemplateRequest
  >({
    apiCall: saveTemplate,
    onError() {
      setError('Error saving template');
      toast({
        type: 'negative',
        children: 'Error saving template',
        actions: [],
      });
    },
    onSuccess: () => {
      setError('');
    },
  });

  return {
    loading: pending,
    error,
    saveTemplate: startAction,
  };
};
