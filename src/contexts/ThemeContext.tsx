import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ColorTheme } from '@/types/theme.types';
import { COLOR_THEMES, getThemeById, applyTheme } from '@/utils/colorThemes';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface ThemeContextType {
  currentTheme: ColorTheme;
  setTheme: (themeId: string) => void;
  availableThemes: ColorTheme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useLocalStorage('lists-theme-id', 'ocean');
  const [currentTheme, setCurrentTheme] = useState<ColorTheme>(() => getThemeById(themeId));

  useEffect(() => {
    const theme = getThemeById(themeId);
    setCurrentTheme(theme);
    applyTheme(theme);
  }, [themeId]);

  const handleSetTheme = (newThemeId: string) => {
    setThemeId(newThemeId);
  };

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        setTheme: handleSetTheme,
        availableThemes: COLOR_THEMES,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
