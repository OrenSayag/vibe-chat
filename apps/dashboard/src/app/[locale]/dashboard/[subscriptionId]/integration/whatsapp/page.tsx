import { redirect } from 'next/navigation';

export default function WhatsappIntegrationPage({
  params,
}: {
  params: { subscriptionId: string };
}) {
  redirect(
    `/dashboard/${params.subscriptionId}/integration/whatsapp/connection`
  );
}
