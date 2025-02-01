'use client';

import { ChatLayout } from '@monday-whatsapp/components';
import { useChat } from '../../../../../libs/next-services/src/lib/client/chat/use-chat';

export default function TestChat() {
  const chatProps = useChat({
    subscriptionId: 1,
  });
  return <ChatLayout {...chatProps} />;
}
