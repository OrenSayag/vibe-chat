'use client';

import '@monday-whatsapp/preset';
import '@vibe/core/tokens';

import {
  ComponentPropsWithoutRef,
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { Box, ThemeProvider as VibeThemeProvider } from '@vibe/core';

interface Props {
  children: ReactNode;
}

type ThemeConfig = ComponentPropsWithoutRef<
  typeof VibeThemeProvider
>['themeConfig'];

export enum Theme {
  BLACK = 'black',
  DARK = 'dark',
  LIGHT = 'light',
}

type ThemeContextData = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextData>({
  theme: Theme.DARK,
  setTheme: (theme: Theme) => {},
});

export const ThemeProvider: FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(Theme.DARK);
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      <Wrapped>{children}</Wrapped>
    </ThemeContext.Provider>
  );
};

export function Wrapped({ children }: { children: ReactNode }) {
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
  const { theme } = useContext(ThemeContext);
  return (
    <VibeThemeProvider themeConfig={themeConfig} systemTheme={theme}>
      <Box
        backgroundColor={'primaryBackgroundColor'}
        style={{
          height: '100vh',
        }}
      >
        {children}
      </Box>
    </VibeThemeProvider>
  );
}
