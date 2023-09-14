import React from 'react';

export type Theme = 'dark' | 'light';

export interface Themes {
  dark: Theme;
  light: Theme;
}

export const themes: Themes = {
  dark: 'dark',
  light: 'light',
};

type Props = {
  theme: Theme;
  setTheme: (a: Theme) => void;
};

export const ThemeContext = React.createContext<Props>({
  theme: 'dark',
  setTheme: () => {},
});
