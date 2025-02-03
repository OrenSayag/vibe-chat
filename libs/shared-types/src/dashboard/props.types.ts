import { ReactNode } from 'react';

export type MainLayoutProps = {
  className?: string;
  children: ReactNode;
  headerProps: HeaderProps;
};

export type HeaderProps = {
  className?: string;
  avatarSrc?: string;
  profileName: string;
  signOut(): void;
};
