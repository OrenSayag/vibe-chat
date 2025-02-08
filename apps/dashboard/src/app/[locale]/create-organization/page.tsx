import { CreateOrganizationTemplateProvider } from '@vibe-chat/components';
import { getUserOrganizations } from '@vibe-chat/db';
import { User } from '@vibe-chat/shared-types';
import { auth } from '../../../auth';

export default async function CreateOrganizationPage({
  params: { locale },
}: {
  params: {
    locale: string;
  };
}) {
  const session = await auth();
  const { organizations } = await getUserOrganizations({
    userId: session!.user!.id as string,
  });
  return <CreateOrganizationTemplateProvider user={session!.user! as User} />;
}
