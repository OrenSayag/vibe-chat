import { LoginTemplate } from '@monday-whatsapp/components';
import { signIn } from '../../../../auth';
import { LoginType } from '@monday-whatsapp/shared-types';
import { redirect } from 'next/navigation';

export default function LoginPage() {
  return (
    <LoginTemplate
      type={LoginType.SIGN_IN}
      onLogin={async (provider, formData) => {
        'use server';
        let success;
        try {
          await signIn(provider, {
            redirect: false,
            ...formData,
            type: LoginType.SIGN_IN,
          });
          success = true;
        } catch (e: any) {
          return {
            error: e.message,
          };
        }
        if (success) {
          redirect('/');
        }
      }}
    />
  );
}
