import {
  Message,
  MessageDirection,
  MessageStatus,
  SendMessageRequestBody,
  WhatsappMessageType,
  WhatsappSendMessageRequestBody,
  WhatsappSendMessageResponseBody,
} from '@monday-whatsapp/shared-types';
import { sendRequestToWhatsappGraph } from './send-request-to-whatsapp-graph';
import { getSubscriptionPhoneNumberId } from '../../subscription/methods/get-subscription-phone-number-id';
import {
  getContactByPhoneNumberId,
  upsertMessageInHistory,
} from '@monday-whatsapp/db';

type Input = SendMessageRequestBody & {
  subscriptionId: number;
};

type Output = Message;

export const sendMessage = async ({
  subscriptionId,
  to,
  text,
}: Input): Promise<Output> => {
  const { phoneNumberId } = await getSubscriptionPhoneNumberId({
    subscriptionId,
  });
  const rb: WhatsappSendMessageRequestBody = {
    messaging_product: 'whatsapp',
    type: WhatsappMessageType.TEXT,
    to,
    text,
    recipient_type: 'individual',
  };
  const { id: contactId } = await getContactByPhoneNumberId({
    subscriptionId,
    phoneNumberId: to,
    name: to,
    displayedPhoneNumber: to,
  });
  const res = await sendRequestToWhatsappGraph({
    path: `${phoneNumberId}/messages`,
    options: {
      body: JSON.stringify(rb),
      method: 'POST',
    },
  });
  const resBody: WhatsappSendMessageResponseBody = await res.json();
  const { id: messageId } = resBody.messages[0];
  const message: Message = {
    id: messageId,
    from: phoneNumberId,
    text,
    type: 'text',
    timestamp: Math.floor(new Date().getTime() / 1_000).toString(),
    direction: MessageDirection.OUTGOING,
    status: MessageStatus.PENDING,
  };
  await upsertMessageInHistory({
    subscriptionId,
    contactId,
    message: message,
  });
  return message;
};
