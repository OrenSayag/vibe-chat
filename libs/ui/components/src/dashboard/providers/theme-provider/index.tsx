'use client';

import '@monday-whatsapp/preset';
import '@vibe/core/tokens';

import { ComponentPropsWithoutRef, FC, ReactNode, useState } from 'react';
import { Box, ThemeProvider as VibeThemeProvider } from '@vibe/core';

interface Props {
  children: ReactNode;
}

type ThemeConfig = ComponentPropsWithoutRef<
  typeof VibeThemeProvider
>['themeConfig'];

type ThemeContext = {
  config: ThemeConfig;
  setConfig: (config: ThemeConfig) => void;
};

export const ThemeProvider: FC<Props> = ({ children }) => {
  const [themeConfig, setThemeConfig] = useState<
    ComponentPropsWithoutRef<typeof VibeThemeProvider>['themeConfig']
  >({
    colors: {
      black: {
        'primary-color': 'slateblue',
        'primary-hover-color': 'darkslateblue',
      },
      dark: {
        'primary-color': 'green',
        'primary-hover-color': 'darkgreen',
      },
      light: {
        'primary-color': 'green',
        'primary-hover-color': 'darkgreen',
      },
    },
    name: 'overview-theme',
  });
  return (
    <VibeThemeProvider themeConfig={themeConfig} systemTheme={'dark'}>
      <Box
        backgroundColor={'primaryBackgroundColor'}
        padding={'large'}
        style={{
          height: '100vh',
        }}
      >
        {children}
      </Box>
    </VibeThemeProvider>
  );
};
