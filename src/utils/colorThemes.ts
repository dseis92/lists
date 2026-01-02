import { ColorTheme } from '@/types/theme.types';

export const COLOR_THEMES: ColorTheme[] = [
  {
    id: 'ocean',
    name: 'Ocean Breeze',
    primary: '#0EA5E9',
    secondary: '#7DD3FC',
    background: '#F0F9FF',
    text: '#0C4A6E',
    accent: '#06B6D4',
  },
  {
    id: 'sunset',
    name: 'Sunset Glow',
    primary: '#F97316',
    secondary: '#FDBA74',
    background: '#FFF7ED',
    text: '#7C2D12',
    accent: '#FB923C',
  },
  {
    id: 'forest',
    name: 'Forest Green',
    primary: '#10B981',
    secondary: '#6EE7B7',
    background: '#F0FDF4',
    text: '#065F46',
    accent: '#34D399',
  },
  {
    id: 'lavender',
    name: 'Lavender Dream',
    primary: '#A855F7',
    secondary: '#D8B4FE',
    background: '#FAF5FF',
    text: '#581C87',
    accent: '#C084FC',
  },
  {
    id: 'mono',
    name: 'Monochrome',
    primary: '#374151',
    secondary: '#9CA3AF',
    background: '#F9FAFB',
    text: '#111827',
    accent: '#6B7280',
  },
  {
    id: 'cherry',
    name: 'Cherry Blossom',
    primary: '#EC4899',
    secondary: '#FBCFE8',
    background: '#FFF1F2',
    text: '#831843',
    accent: '#F472B6',
  },
  {
    id: 'midnight',
    name: 'Midnight Sky',
    primary: '#4F46E5',
    secondary: '#A5B4FC',
    background: '#F5F3FF',
    text: '#312E81',
    accent: '#6366F1',
  },
  {
    id: 'citrus',
    name: 'Citrus Burst',
    primary: '#FBBF24',
    secondary: '#FDE68A',
    background: '#FFFBEB',
    text: '#78350F',
    accent: '#F59E0B',
  },
  {
    id: 'mint',
    name: 'Fresh Mint',
    primary: '#14B8A6',
    secondary: '#99F6E4',
    background: '#F0FDFA',
    text: '#134E4A',
    accent: '#2DD4BF',
  },
  {
    id: 'grape',
    name: 'Grape Soda',
    primary: '#7C3AED',
    secondary: '#DDD6FE',
    background: '#FAF5FF',
    text: '#4C1D95',
    accent: '#8B5CF6',
  },
  {
    id: 'coral',
    name: 'Coral Reef',
    primary: '#FB7185',
    secondary: '#FECDD3',
    background: '#FFF1F2',
    text: '#881337',
    accent: '#F87171',
  },
  {
    id: 'slate',
    name: 'Slate Gray',
    primary: '#475569',
    secondary: '#CBD5E1',
    background: '#F8FAFC',
    text: '#1E293B',
    accent: '#64748B',
  },
];

export const getThemeById = (id: string): ColorTheme => {
  return COLOR_THEMES.find((theme) => theme.id === id) || COLOR_THEMES[0];
};

export const applyTheme = (theme: ColorTheme): void => {
  const root = document.documentElement;
  root.style.setProperty('--color-primary', theme.primary);
  root.style.setProperty('--color-secondary', theme.secondary);
  root.style.setProperty('--color-background', theme.background);
  root.style.setProperty('--color-text', theme.text);
  root.style.setProperty('--color-accent', theme.accent);
};
