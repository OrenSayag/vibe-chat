import { ComponentPropsWithoutRef, FC } from 'react';
import GoogleIcon from '../../assets/icons/social/google.svg';
import Image from 'next/image';
import { Button } from '@vibe/core';
import { cn } from '@vibe-chat/ui-utils';

export enum SocialProvider {
  GOOGLE = 'google',
}

const iconMap: Record<SocialProvider, string> = {
  [SocialProvider.GOOGLE]: GoogleIcon,
};

interface Props extends ComponentPropsWithoutRef<typeof Button> {
  className?: string;
  socialProvider: SocialProvider;
}

export const SocialProviderLoginButton: FC<Props> = ({
  className,
  socialProvider,
  children,
  ...props
}) => {
  return (
    <Button className={cn('p-4', className)} {...props}>
      <Image
        src={iconMap[socialProvider]}
        alt={socialProvider}
        className={'w-5'}
      />
      {children}
    </Button>
  );
};
