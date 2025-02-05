import { redirect } from '@monday-whatsapp/next-services/server';

export default function Index() {
  redirect({ href: 'auth/login', locale: 'en' });
}
