import { redirect } from '@vibe-chat/next-services/server';

export default function Index() {
  redirect({ href: 'auth/login', locale: 'en' });
}
