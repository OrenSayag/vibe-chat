import { LoginTemplate } from '@monday-whatsapp/components';
import { auth, signIn } from '../../../../auth';
import { LoginType } from '@monday-whatsapp/shared-types';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await auth();
  console.log({
    session,
  });
  if (session) {
    redirect('/dashboard');
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
            redirectTo: '/dashboard',
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
