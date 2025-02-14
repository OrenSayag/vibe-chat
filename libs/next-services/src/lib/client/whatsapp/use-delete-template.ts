import { useBackendRequest } from '@vibe-chat/next-services';
import { useState } from 'react';
import { deleteTemplate } from '../../server/whatsapp/delete-template';

type DeleteTemplateInput = {
  subscriptionId: string;
} & (
  | { type: 'id'; templateId: string }
  | { type: 'name'; templateName: string }
);

export const useDeleteTemplate = () => {
  const [error, setError] = useState<string>();

  const { pending, startAction } = useBackendRequest<
    undefined,
    DeleteTemplateInput
  >({
    apiCall: deleteTemplate,
    onError() {
      setError('Error deleting template');
    },
    onSuccess: () => {
      setError('');
    },
  });

  return {
    loading: pending,
    error,
    deleteTemplate: startAction,
  };
};
