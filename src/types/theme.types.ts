export interface ColorTheme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
}

export type ThemeMode = 'light' | 'dark';
