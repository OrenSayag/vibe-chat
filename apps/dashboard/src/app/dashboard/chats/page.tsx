import { auth } from '../../../../auth';
import { ChatTemplateProvider } from '@monday-whatsapp/components';

export default async function ChatsPage() {
  const session = await auth();
  return <ChatTemplateProvider subscriptionId={1} />;
}
