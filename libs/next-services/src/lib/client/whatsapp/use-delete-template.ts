import { useBackendRequest } from '@vibe-chat/next-services';
import { useState } from 'react';
import { deleteTemplate } from '../../server/whatsapp/delete-template';
import { useToast } from '@vibe-chat/components';

type DeleteTemplateInput = {
  subscriptionId: string;
  templateIds: string[];
};

export const useDeleteTemplate = ({
  subscriptionId,
}: {
  subscriptionId: string;
}) => {
  const [error, setError] = useState<string>();

  const { toast } = useToast();

  const { pending, startAction } = useBackendRequest<
    undefined,
    Omit<DeleteTemplateInput, 'subscriptionId'>
  >({
    apiCall: (input) =>
      deleteTemplate({
        subscriptionId,
        type: 'id',
        ...input,
      }),
    onError() {
      toast({
        children: `Error deleting template`,
        type: 'negative',
        actions: [],
      });
    },
    onSuccess: () => {
      toast({
        children: `Template deleted successfully`,
        type: 'positive',
        actions: [],
      });
    },
  });

  return {
    loading: pending,
    error,
    deleteTemplate: startAction,
  };
};
