'use client';

import { SocketProvider, useDir } from '@vibe-chat/next-services';
import { usePathname } from '@vibe-chat/next-services/server';
import { MainLayoutProps } from '@vibe-chat/shared-types';
import { Divider, Flex } from '@vibe/core';
import { FC } from 'react';
import { Header } from '../../molecules/header';
import { Navbar } from '../../organisms/navbar';
import { ToastProvider } from '../../providers/toast-provider';
export const MainLayout: FC<MainLayoutProps> = ({
  className,
  children,
  headerProps,
  organizations,
}) => {
  const pathname = usePathname();
  const dir = useDir();
  return (
    <ToastProvider>
      <SocketProvider>
        <Flex
          style={{
            height: '100vh',
            flexDirection: dir === 'rtl' ? 'row-reverse' : undefined,
          }}
        >
          <div
            style={{
              width: '20em',
              minWidth: '20em',
              maxWidth: '20em',
              height: '100%',
            }}
            dir={dir}
          >
            <Navbar selectedPath={pathname} organizations={organizations} />
          </div>
          <Divider direction={'vertical'} withoutMargin />
          <div
            style={{
              flexGrow: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Header
              {...headerProps}
              signOut={() => {
                headerProps.signOut();
              }}
            />
            <div
              style={{
                flexGrow: 1,
                overflow: 'auto',
              }}
              dir={dir}
            >
              {children}
            </div>
          </div>
        </Flex>
      </SocketProvider>
    </ToastProvider>
  );
};
