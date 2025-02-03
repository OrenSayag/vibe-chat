import { LoginTemplate } from '@monday-whatsapp/components';
import { signIn } from '../../../../auth';
import { LoginType } from '@monday-whatsapp/shared-types';

export default function LoginPage() {
  return (
    <LoginTemplate
      type={LoginType.SIGN_UP}
      onLogin={async (provider, formData) => {
        'use server';
        try {
          await signIn(provider, {
            ...formData,
            redirectTo: '/dashboard',
            type: LoginType.SIGN_UP,
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
