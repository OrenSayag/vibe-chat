import { useBackendRequest } from '@vibe-chat/next-services';
import { WhatsappTemplate } from '@vibe-chat/shared-types';
import { useState } from 'react';
import { getTemplateDrafts } from '../../server/whatsapp/get-template-drafts';

export const useTemplateDrafts = () => {
  const [error, setError] = useState<string>();
  const [templates, setTemplates] = useState<WhatsappTemplate[]>([]);

  const { pending, startAction } = useBackendRequest<WhatsappTemplate[]>({
    apiCall: () => getTemplateDrafts(),
    onError() {
      setError('Error getting template drafts');
    },
    onSuccess: (data) => {
      setTemplates(data);
      setError('');
    },
  });

  return {
    loading: pending,
    error,
    templates,
    getTemplates: startAction,
  };
};
