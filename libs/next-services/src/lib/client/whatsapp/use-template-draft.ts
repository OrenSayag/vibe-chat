import { useBackendRequest } from '@vibe-chat/next-services';
import { WhatsappTemplate } from '@vibe-chat/shared-types';
import { useState } from 'react';
import { getTemplateDraft } from '../../server/whatsapp/get-template-draft';

type Input = {
  name: string;
};

export const useTemplateDraft = ({ name }: Input) => {
  const [error, setError] = useState<string>();
  const [template, setTemplate] = useState<WhatsappTemplate | null>(null);

  const { pending, startAction } = useBackendRequest<WhatsappTemplate | null>({
    apiCall: () => getTemplateDraft({ name }),
    onError() {
      setError('Error getting template draft');
    },
    onSuccess: (data) => {
      setTemplate(data);
      setError('');
    },
  });

  return {
    loading: pending,
    error,
    template,
    getTemplate: startAction,
  };
};
