import { LoginForm, User } from '@vibe-chat/shared-types';
import { db } from '../../config';
import { users } from '../../schema';
import { and, eq } from 'drizzle-orm';
import { validatePassword } from '@vibe-chat/utils';

type Input = {
  loginForm: LoginForm;
};

type Output = {
  user: User | null;
};

export const getUserByLogin = async ({ loginForm }: Input): Promise<Output> => {
  let user = null;

  const queryRes = await db
    .select()
    .from(users)
    .where(and(eq(users.email, loginForm.username)));

  if (queryRes.length === 0) {
    return {
      user,
    };
  }
  const [res] = queryRes;
  const isValid = validatePassword(loginForm.password, res.password);

  if (!isValid) {
    return { user };
  }
  return {
    user: {
      name: res.name,
      image: res.image,
      mail: res.email,
      id: res.id,
    } as User,
  };
};
