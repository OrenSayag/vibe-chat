'use client';

import { ChatLayout } from '@monday-whatsapp/components';
import { useChat } from '@monday-whatsapp/next-services';

export default function TestChat() {
  const chatProps = useChat({
    subscriptionId: 1,
  });
  return <ChatLayout {...chatProps} />;
}
