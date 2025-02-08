import { ChatTemplateProvider } from '@vibe-chat/components';

export default async function ChatsPage({
  params: { subscriptionId },
}: {
  params: { subscriptionId: string };
}) {
  return <ChatTemplateProvider subscriptionId={subscriptionId} />;
}
