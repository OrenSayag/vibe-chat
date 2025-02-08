import { MainLayout } from '@vibe-chat/components';
import { auth, signOut } from '../../../../auth';
import { redirect } from '@vibe-chat/next-services/server';
import { getUserOrganizations } from '@vibe-chat/db';

export const metadata = {
  title: 'VibeChat - Dashboard',
};

export default async function RootLayout({
  children,
  params: { locale, subscriptionId },
}: {
  children: React.ReactNode;
  params: { locale: string; subscriptionId: string };
}) {
  const session = await auth();
  if (!session) {
    redirect({ href: '/auth/login', locale });
  }

  const userOrganizations = await getUserOrganizations({
    userId: session!.user!.id!,
  });

  const currentOrganizationNotOfUser = !userOrganizations.organizations.find(
    (organization) => organization.subscriptionId === subscriptionId
  );

  if (currentOrganizationNotOfUser) {
    redirect({ href: '/dashboard', locale });
  }

  const onSignOut = async () => {
    'use server';
    await signOut();
  };
  return (
    <MainLayout
      organizations={userOrganizations.organizations}
      headerProps={{
        profileName: session!.user?.name ?? '',
        avatarSrc: session!.user?.image ?? '',
        signOut: async () => {
          'use server';
          await onSignOut();
        },
      }}
    >
      {children}
    </MainLayout>
  );
}
