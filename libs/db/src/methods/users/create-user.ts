import { LoginForm } from '@monday-whatsapp/shared-types';
import { db } from '../../config';
import { users } from '../../schema';
import { saltAndHashPassword } from '@monday-whatsapp/utils';

type Input = LoginForm;
type Output = { id: string };

export const createUser = async ({ username, password }: Input): Promise<Output> => {
  const hashedPassword = saltAndHashPassword(password);
  const [result] = await db.insert(users).values({
    password: hashedPassword,
    email: username,
  }).returning({ id: users.id });
  
  return { id: result.id };
};
