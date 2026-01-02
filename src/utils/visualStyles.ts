import { VisualStyle } from '@/types/list.types';

export interface VisualStyleConfig {
  id: VisualStyle;
  name: string;
  description: string;
  icon: string;
  spacing: {
    itemGap: string;
    padding: string;
  };
  appearance: {
    borderRadius: string;
    borderWidth: string;
    shadows: boolean;
    hoverEffect: 'subtle' | 'lift' | 'bounce' | 'glow';
  };
  typography: {
    fontSize: string;
    fontWeight: string;
  };
}

export const VISUAL_STYLES: Record<VisualStyle, VisualStyleConfig> = {
  compact: {
    id: 'compact',
    name: 'Compact',
    description: 'Dense layout for power users',
    icon: '📋',
    spacing: {
      itemGap: '0.25rem',
      padding: '0.5rem 0.75rem',
    },
    appearance: {
      borderRadius: '0.25rem',
      borderWidth: '1px',
      shadows: false,
      hoverEffect: 'subtle',
    },
    typography: {
      fontSize: '0.875rem',
      fontWeight: '400',
    },
  },
  card: {
    id: 'card',
    name: 'Card',
    description: 'Elevated cards with breathing room',
    icon: '🃏',
    spacing: {
      itemGap: '1rem',
      padding: '1rem 1.25rem',
    },
    appearance: {
      borderRadius: '0.75rem',
      borderWidth: '2px',
      shadows: true,
      hoverEffect: 'lift',
    },
    typography: {
      fontSize: '1rem',
      fontWeight: '500',
    },
  },
  minimal: {
    id: 'minimal',
    name: 'Minimal',
    description: 'Clean and distraction-free',
    icon: '✨',
    spacing: {
      itemGap: '0.75rem',
      padding: '0.75rem 1rem',
    },
    appearance: {
      borderRadius: '0.5rem',
      borderWidth: '0px',
      shadows: false,
      hoverEffect: 'glow',
    },
    typography: {
      fontSize: '0.95rem',
      fontWeight: '400',
    },
  },
  playful: {
    id: 'playful',
    name: 'Playful',
    description: 'Fun and whimsical',
    icon: '🎨',
    spacing: {
      itemGap: '1.25rem',
      padding: '1.25rem 1.5rem',
    },
    appearance: {
      borderRadius: '1.5rem',
      borderWidth: '3px',
      shadows: true,
      hoverEffect: 'bounce',
    },
    typography: {
      fontSize: '1.05rem',
      fontWeight: '600',
    },
  },
};

export function getVisualStyle(id: VisualStyle): VisualStyleConfig {
  return VISUAL_STYLES[id];
}

export function getVisualStyleClasses(style: VisualStyle): string {
  const config = VISUAL_STYLES[style];
  const classes: string[] = [];

  // Base style class
  classes.push(`visual-style-${style}`);

  // Shadow class
  if (config.appearance.shadows) {
    classes.push('has-shadows');
  }

  // Hover effect class
  classes.push(`hover-${config.appearance.hoverEffect}`);

  return classes.join(' ');
}

export const VISUAL_STYLE_OPTIONS = Object.values(VISUAL_STYLES);
