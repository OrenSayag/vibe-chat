'use client';

import { FC, useState } from 'react';
import { LoginType } from '@monday-whatsapp/shared-types';
import Logo from '../../assets/icons/icon.png';
import { Box, Text } from '@vibe/core';
import { UsernamePasswordForm } from '../../organisms/username-password-form';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  onLogin(
    provider: string,
    formData: { username: string; password: string }
  ): Promise<void | { error: string }>;
  type: LoginType;
};

const titlesMap: Record<
  LoginType,
  { title: string; oppositeHref: string; toOppositeTitle: string }
> = {
  [LoginType.SIGN_IN]: {
    title: 'Sign in',
    oppositeHref: '/auth/sign-up',
    toOppositeTitle: "I don't have an account",
  },
  [LoginType.SIGN_UP]: {
    title: 'Sign up',
    oppositeHref: '/auth/login',
    toOppositeTitle: 'I have an account',
  },
};

export const LoginTemplate: FC<Props> = ({ onLogin, type }) => {
  const [error, setError] = useState('');
  return (
    <div>
      <div>
        <Image
          src={Logo}
          alt={'logo'}
          style={{
            margin: '0 auto',
            width: '10em',
          }}
        />
      </div>
      <Box
        style={{
          margin: '2em auto 0',
          maxWidth: '300px',
        }}
      >
        <Box>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text>{titlesMap[type].title}</Text>
            <Text>
              <Link href={titlesMap[type].oppositeHref} className={'underline'}>
                {titlesMap[type].toOppositeTitle}
              </Link>
            </Text>
          </div>
        </Box>
        <UsernamePasswordForm
          loginType={type}
          onSubmit={(formData) =>
            onLogin('credentials', formData).then((res) => {
              if (res) {
                setError(res.error);
              } else {
                setError('');
              }
            })
          }
        />
        <Text style={{ color: 'red' }}>{error}</Text>
      </Box>
    </div>
  );
};
