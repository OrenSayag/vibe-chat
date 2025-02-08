import { createUser, getUserByLogin } from '@monday-whatsapp/db';
import { LoginType, User } from '@monday-whatsapp/shared-types';

export async function POST(request: Request) {
  const body = await request.json();
  const { username, password, type } = body;
  if (!username || !password) {
    return Response.json(
      { success: false, message: 'bad request' },
      { status: 400 }
    );
  }
  let user: null | User = null;

  switch (type as LoginType) {
    case LoginType.SIGN_UP:
      user = (
        await getUserByLogin({
          loginForm: {
            username: username as string,
            password: password as string,
          },
        })
      ).user;
      if (user) {
        return Response.json(
          { success: false, message: 'User exists|||' },
          { status: 401 }
        );
      }
      const { id } = await createUser({
        username: username as string,
        password: password as string,
      });
      user = {
        mail: username as string,
        id,
      };
      break;
    case LoginType.SIGN_IN:
      user = (
        await getUserByLogin({
          loginForm: {
            username: username as string,
            password: password as string,
          },
        })
      ).user;
      if (!user) {
        return Response.json(
          { success: false, message: 'Invalid credentials|||' },
          { status: 401 }
        );
      }
      break;
  }

  return Response.json(
    { success: true, message: 'success', data: user },
    { status: 200 }
  );
}
