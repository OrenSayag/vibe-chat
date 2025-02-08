import 'next-auth';
import { User as CustomUser } from '@vibe-chat/shared-types';

declare module 'next-auth' {
  interface Session {}
  // interface User extends CustomUser {}
}
