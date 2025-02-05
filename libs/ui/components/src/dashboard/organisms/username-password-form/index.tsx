'use client';

import { CSSProperties, FC } from 'react';
import { cn } from '@monday-whatsapp/ui-utils';
import { Box, Button, Text, TextField } from '@vibe/core';
import { LoginType } from '@monday-whatsapp/shared-types';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface Props {
  className?: string;
  loginType: LoginType;
  onSubmit(formData: FormData): void;
  style?: CSSProperties;
}

const titlesMap: Record<LoginType, { submitButton: string }> = {
  [LoginType.SIGN_IN]: {
    submitButton: 'Sign In',
  },
  [LoginType.SIGN_UP]: {
    submitButton: 'Sign Up',
  },
};

const schema = z.object({
  username: z.string().email(),
  password: z.string().min(8),
});

type FormData = z.infer<typeof schema>;

export const UsernamePasswordForm: FC<Props> = ({
  className,
  loginType,
  onSubmit,
  style,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={cn('max-w-96 mx-auto flex flex-col gap-4', className)}
        style={{
          maxWidth: '30em',
          margin: '1em auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '1em',
          ...style,
        }}
      >
        <Box>
          <Text type={'text1'}>Mail</Text>
          <TextField
            {...register('username')}
            onChange={(_, e) => register('username').onChange(e)}
          />
          {errors.username && (
            <Text style={{ color: 'red' }}>{errors.username.message}</Text>
          )}
        </Box>
        <Box>
          <Text type={'text1'}>Password</Text>
          <TextField
            type={'password'}
            {...register('password')}
            onChange={(_, e) => register('password').onChange(e)}
          />
          {errors.password && (
            <Text style={{ color: 'red' }}>{errors.password.message}</Text>
          )}
        </Box>
        <Button type={'submit'}>{titlesMap[loginType].submitButton}</Button>
      </form>
    </>
  );
};
