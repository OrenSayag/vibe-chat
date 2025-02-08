import { LoginTemplate } from '@monday-whatsapp/components';
import { LoginType } from '@monday-whatsapp/shared-types';
import { signIn } from '../../../../auth';

export default async function LoginPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
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
