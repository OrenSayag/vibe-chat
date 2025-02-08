'use client';

import { ChatLayout } from '@vibe-chat/components';
import { useChat } from '@vibe-chat/next-services';

export default function TestChat() {
  const chatProps = useChat({
    subscriptionId: 1,
  });
  return <ChatLayout {...chatProps} />;
}
