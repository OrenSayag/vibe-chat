import {
  SendMessageRequestBody,
  WhatsappMessageType,
  WhatsappSendMessageRequestBody,
} from '@monday-whatsapp/shared-types';
import { sendRequestToWhatsappGraph } from './send-request-to-whatsapp-graph';
import { getSubscriptionPhoneNumberId } from '../../subscription/methods/get-subscription-phone-number-id';

type Input = SendMessageRequestBody & {
  subscriptionId: number;
};

export const sendMessage = async ({ subscriptionId, to, text }: Input) => {
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
  await sendRequestToWhatsappGraph({
    path: `${phoneNumberId}/messages`,
    options: {
      body: JSON.stringify(rb),
      method: 'POST',
    },
  });
};
