'use client';

import './global.css';
import '@vibe/core/tokens';
import { Box, SystemTheme, ThemeProvider } from '@vibe/core';
import mondaySdk from 'monday-sdk-js';

import { useEffect, useState } from 'react';
import { Theme } from 'monday-sdk-js/types/theme-config.type';

const monday = mondaySdk();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const context = useGetContext();

  return (
    <html lang="en">
      <body>
        <ThemeProvider
          themeConfig={context.themeConfig}
          systemTheme={context.theme ?? 'dark'}
        >
          <Box
            backgroundColor={'primaryBackgroundColor'}
            className={'h-screen p-4'}
          >
            {children}
          </Box>
        </ThemeProvider>
      </body>
    </html>
  );
}

type ThemeCtxData = {
  themeConfig: Theme | undefined;
  theme: SystemTheme | undefined;
};

function useGetContext() {
  const [context, setContext] = useState<ThemeCtxData>({
    theme: undefined,
    themeConfig: undefined,
  });

  useEffect(() => {
    monday.listen('context', (res: { data: ThemeCtxData }) => {
      setContext(res.data);
    });
  }, []);

  return context;
}
