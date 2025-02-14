import { useBackendRequest } from '@vibe-chat/next-services';
import { WhatsappTemplate } from '@vibe-chat/shared-types';
import { useState } from 'react';
import { getTemplate } from '../../server/whatsapp/get-template';

type Input = {
  subscriptionId?: string;
  templateName?: string;
};

export const useGetTemplate = ({ subscriptionId, templateName }: Input) => {
  const [error, setError] = useState<string>();

  const { pending, startAction } = useBackendRequest<WhatsappTemplate>({
    apiCall: () =>
      getTemplate({
        subscriptionId: subscriptionId!,
        templateName: templateName!,
      }),
    onError() {
      setError('Error getting template');
    },
    onSuccess: () => {
      setError('');
    },
  });

  return {
    loading: pending,
    error,
    getTemplate: startAction,
  };
};
