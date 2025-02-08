import { LoginTemplate } from '@vibe-chat/components';
import { signIn } from '../../../../auth';
import { LoginType } from '@vibe-chat/shared-types';

export default function LoginPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <LoginTemplate
      type={LoginType.SIGN_UP}
      onLogin={async (provider, formData) => {
        'use server';
        try {
          await signIn(provider, {
            ...formData,
            redirectTo: `/${locale}/dashboard`,
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
