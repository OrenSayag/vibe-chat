import 'next-auth';
import { User as CustomUser } from '@monday-whatsapp/shared-types';

declare module 'next-auth' {
  interface Session {}
  // interface User extends CustomUser {}
}
