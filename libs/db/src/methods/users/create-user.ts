import { LoginForm } from '@monday-whatsapp/shared-types';
import { db } from '../../config';
import { users } from '../../schema';
import { saltAndHashPassword } from '@monday-whatsapp/utils';

type Input = LoginForm;

export const createUser = async ({ username, password }: Input) => {
  const hashedPassword = saltAndHashPassword(password);
  await db.insert(users).values({
    password: hashedPassword,
    email: username,
  });
};
