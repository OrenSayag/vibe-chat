import { useSocket } from '@monday-whatsapp/next-services';
import { EventType, SendMessageRequest } from '@monday-whatsapp/shared-types';

type Input = {
  subscriptionId: number;
};

export const useSendTextMessage = ({ subscriptionId }: Input) => {
  const socket = useSocket({
    subscriptionId,
  });
  const sendTextMessage = (input: SendMessageRequest) => {
    socket?.emit(EventType.SEND_TEXT_MESSAGE, input);
  };
  return {
    sendTextMessage,
  };
};
