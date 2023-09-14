import React, { ReactNode, useEffect, useState } from 'react';
import { Theme, ThemeContext, themes } from '../context/ThemeContext';

const getTheme = () => {
  const theme = `${window?.localStorage?.getItem('theme')}` as Theme;

  if (Object.values(themes).includes(theme)) {
    return theme;
  }

  const userMedia = window.matchMedia('(prefers-color-scheme: light)');

  if (userMedia.matches) {
    return themes.light;
  }

  return themes.dark;
};

type Props = {
  children: ReactNode;
};

const ThemeProvider: React.FC<Props> = ({ children }) => {
  const [theme, setTheme] = useState(getTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const userMedia = window.matchMedia('(prefers-color-scheme: light)');

    const handleThemeChange = (e: MediaQueryListEvent) => {
      const newTheme = e.matches ? 'light' : 'dark';

      setTheme(newTheme);
    };

    userMedia.addEventListener('change', handleThemeChange);

    return () => {
      userMedia.removeEventListener('change', handleThemeChange);
    };
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
