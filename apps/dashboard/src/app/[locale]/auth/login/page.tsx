import { LoginType } from '@monday-whatsapp/shared-types';
import { auth, signIn } from '../../../../auth';
import { LoginTemplate } from '@monday-whatsapp/components';
import { redirect } from '@monday-whatsapp/next-services/server';

export default async function LoginPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const session = await auth();
  console.log({
    session,
  });
  if (session) {
    redirect({
      href: '/dashboard',
      locale,
    });
  }
  return (
    <LoginTemplate
      type={LoginType.SIGN_IN}
      onLogin={async (provider, formData) => {
        'use server';
        try {
          await signIn(provider, {
            ...formData,
            type: LoginType.SIGN_IN,
            redirectTo: `/${locale}/dashboard`,
          });
        } catch (e: any) {
          if (!e.message.includes('|||')) {
            throw e;
          }
          return {
            error: e.message.split('|||')[0],
          };
        }
      }}
    />
  );
}
