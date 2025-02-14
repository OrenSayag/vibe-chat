import { useBackendRequest } from '@vibe-chat/next-services';
import { SaveTemplateRequest } from '@vibe-chat/shared-types';
import { useState } from 'react';
import { saveTemplate } from '../../server/whatsapp/save-template';

export const useSaveTemplate = () => {
  const [error, setError] = useState<string>();

  const { pending, startAction } = useBackendRequest<
    undefined,
    SaveTemplateRequest
  >({
    apiCall: saveTemplate,
    onError() {
      setError('Error saving template');
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
