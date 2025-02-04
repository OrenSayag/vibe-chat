'use client';

import '@monday-whatsapp/preset';
import '@vibe/core/tokens';
import 'react-phone-number-input/style.css';

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
  theme: Theme.LIGHT,
  setTheme: (theme: Theme) => {},
});

export const ThemeProvider: FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(
    getLocalStorageTheme() ?? Theme.LIGHT
  );
  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: (theme) => {
          setLocalStorageTheme(theme);
          setTheme(theme);
        },
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

function getLocalStorageTheme() {
  if (typeof localStorage === 'undefined') {
    return;
  }

  const existing = localStorage.getItem('theme');
  if (existing && isTheme(existing)) {
    return existing as Theme;
  }
}
function setLocalStorageTheme(theme: Theme) {
  if (typeof localStorage === 'undefined') {
    return;
  }
  return localStorage.setItem('theme', theme);
}

function isTheme(val: string): boolean {
  const rec: Record<Theme, any> = {
    [Theme.BLACK]: '',
    [Theme.DARK]: '',
    [Theme.LIGHT]: '',
  };
  return Object.keys(rec).includes(val);
}
