import { useBackendRequest } from '@vibe-chat/next-services';
import { SaveTemplateDraftRequest } from '@vibe-chat/shared-types';
import { useState } from 'react';
import { saveTemplateDraft } from '../../server/whatsapp/save-template-draft';
import { useToast } from '@vibe-chat/components';

type Input = {
  subscriptionId: string;
  isNewTemplate?: boolean;
};

export const useSaveTemplateDraft = ({
  subscriptionId,
  isNewTemplate,
}: Input) => {
  const [error, setError] = useState<string>();

  const { toast } = useToast();

  const { pending, startAction } = useBackendRequest<
    { id: number },
    SaveTemplateDraftRequest['template']
  >({
    apiCall: (template: SaveTemplateDraftRequest['template']) =>
      saveTemplateDraft({ template, subscriptionId }),
    onError() {
      setError('Error saving template draft');
      toast({
        type: 'negative',
        children: 'Error saving template draft',
        actions: [],
      });
    },
    onSuccess() {
      if (isNewTemplate) {
        toast({
          type: 'normal',
          children: 'Template draft created successfully - should continue',
          actions: [],
        });
      }
    },
  });

  return {
    loading: pending,
    error,
    saveTemplate: startAction,
  };
};
