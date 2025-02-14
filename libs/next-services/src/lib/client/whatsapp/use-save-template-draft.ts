import { useBackendRequest } from '@vibe-chat/next-services';
import { SaveTemplateDraftRequest } from '@vibe-chat/shared-types';
import { useState } from 'react';
import { saveTemplateDraft } from '../../server/whatsapp/save-template-draft';

export const useSaveTemplateDraft = () => {
  const [error, setError] = useState<string>();

  const { pending, startAction } = useBackendRequest<{ id: number }>({
    apiCall: (template: SaveTemplateDraftRequest['template']) =>
      saveTemplateDraft({ template }),
    onError() {
      setError('Error saving template draft');
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
