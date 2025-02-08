'use client';

import { FC } from 'react';
import { Navbar } from '../../organisms/navbar';
import { Divider, Flex } from '@vibe/core';
import { Header } from '../../molecules/header';
import { MainLayoutProps } from '@vibe-chat/shared-types';
import { SocketProvider, useDir } from '@vibe-chat/next-services';
import { usePathname } from '@vibe-chat/next-services/server';

export const MainLayout: FC<MainLayoutProps> = ({
  className,
  children,
  headerProps,
  organizations,
}) => {
  const pathname = usePathname();
  const dir = useDir();
  return (
    <>
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
              }}
            >
              {children}
            </div>
          </div>
        </Flex>
      </SocketProvider>
    </>
  );
};
