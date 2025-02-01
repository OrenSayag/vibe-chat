import {
  Message,
  MessageInputAndActionProps,
  WhatsappTemplate,
} from '@monday-whatsapp/shared-types';
import { isBefore, subHours } from 'date-fns';
import { useWhatsappMessageTemplates } from '../../../whatsapp/use-whatsapp-message-templates';
import { useEffect, useState } from 'react';

type Input = {
  onSend: Output['onSend'];
  latestMessage?: Message;
  subscriptionId?: number;
};

type Output = MessageInputAndActionProps;

export const useMessageInputAndAction = ({
  onSend,
  latestMessage,
  subscriptionId,
}: Input): Output => {
  const { loading, error, getTemplates, templates } =
    useWhatsappMessageTemplates({
      subscriptionId,
    });
  useEffect(() => {
    if (subscriptionId) {
      getTemplates(undefined);
    }
  }, [subscriptionId]);
  const [selectedTemplateName, setSelectedTemplateName] = useState<string>('');
  return {
    onSend,
    templatesOnly:
      !latestMessage?.timestamp ||
      isBefore(
        Number(latestMessage.timestamp) * 1_000,
        subHours(new Date(), 24)
      ),
    // templatesOnly: true,
    templateSelectorProps: {
      templates,
      loading,
      error: Boolean(error),
      onSelect(template: WhatsappTemplate) {
        setSelectedTemplateName(template.name);
      },
      selectedTemplateName,
    },
  };
};
