'use client';

import { FC } from 'react';
import { Navbar } from '../../organisms/navbar';
import { usePathname } from 'next/navigation';
import { Divider, Flex } from '@vibe/core';
import { Header } from '../../molecules/header';
import { MainLayoutProps } from '@monday-whatsapp/shared-types';

export const MainLayout: FC<MainLayoutProps> = ({
  className,
  children,
  headerProps,
}) => {
  const pathname = usePathname();
  return (
    <>
      <Flex style={{ height: '100vh' }}>
        <div
          style={{
            width: '20em',
            height: '100%',
          }}
        >
          <Navbar selectedPath={pathname} />
        </div>
        <Divider direction={'vertical'} withoutMargin />
        <div
          style={{
            flexGrow: 1,
            height: '100%',
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
              padding: '1em',
            }}
          >
            {children}
          </div>
        </div>
      </Flex>
    </>
  );
};
