import { useBackendRequest } from '@vibe-chat/next-services';
import { WhatsappTemplate } from '@vibe-chat/shared-types';
import { getWhatsappMessageTemplates } from '../../server/whatsapp/get-whatsapp-message-templates';
import { useState } from 'react';

type Input = {
  subscriptionId?: string;
};

export const useWhatsappMessageTemplates = ({ subscriptionId }: Input) => {
  const [error, setError] = useState<string>();
  const [templates, setTemplates] = useState<WhatsappTemplate[]>([]);
  const { pending, startAction } = useBackendRequest<WhatsappTemplate[]>({
    apiCall: () => {
      return getWhatsappMessageTemplates({
        subscriptionId: subscriptionId!,
      });
    },
    onError() {
      setError('Error getting templates list');
    },
    onSuccess: (data) => {
      setTemplates(data);
      setError('');
    },
  });
  return {
    loading: pending,
    error: error,
    templates,
    getTemplates: startAction,
  };
};
