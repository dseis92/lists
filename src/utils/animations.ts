import { VisualStyle } from '@/types/list.types';
import { Variants } from 'framer-motion';

export interface AnimationConfig {
  initial: Record<string, any>;
  animate: Record<string, any>;
  exit: Record<string, any>;
  transition: Record<string, any>;
}

export const ITEM_ANIMATIONS: Record<VisualStyle, AnimationConfig> = {
  compact: {
    initial: { opacity: 0, x: -10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 10 },
    transition: { duration: 0.15 },
  },
  card: {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.95 },
    transition: { type: 'spring', stiffness: 300, damping: 25 },
  },
  minimal: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },
  playful: {
    initial: { opacity: 0, scale: 0, rotate: -10 },
    animate: { opacity: 1, scale: 1, rotate: 0 },
    exit: { opacity: 0, scale: 0, rotate: 10 },
    transition: { type: 'spring', stiffness: 400, damping: 15 },
  },
};

export const CONTAINER_ANIMATIONS: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.02,
      staggerDirection: -1,
    },
  },
};

export const HOVER_ANIMATIONS: Record<VisualStyle, Record<string, any>> = {
  compact: {
    backgroundColor: 'var(--color-secondary)',
    transition: { duration: 0.15 },
  },
  card: {
    y: -4,
    boxShadow: '0 8px 16px rgba(0,0,0,0.12)',
    transition: { duration: 0.2 },
  },
  minimal: {
    boxShadow: '0 0 0 2px var(--color-primary)',
    transition: { duration: 0.2 },
  },
  playful: {
    scale: 1.05,
    rotate: 2,
    transition: { type: 'spring', stiffness: 400, damping: 15 },
  },
};

export const PAGE_TRANSITION: Variants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 },
};

export const MODAL_BACKDROP: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const MODAL_CONTENT: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 300, damping: 25 },
  },
};

export const CHECKBOX_ANIMATION: Variants = {
  unchecked: { scale: 0 },
  checked: {
    scale: 1,
    rotate: 360,
    transition: { type: 'spring', stiffness: 300, damping: 20 },
  },
};

export const EMOJI_HOVER: Record<string, any> = {
  scale: 1.3,
  rotate: 10,
  transition: { type: 'spring', stiffness: 400, damping: 15 },
};

export const NUMBER_COUNTER = (style: VisualStyle): Record<string, any> => {
  if (style === 'playful') {
    return {
      scale: [1, 1.2, 1],
      transition: { duration: 0.3 },
    };
  }
  return {
    scale: [1, 1.05, 1],
    transition: { duration: 0.2 },
  };
};

export function getItemAnimation(style: VisualStyle): AnimationConfig {
  return ITEM_ANIMATIONS[style];
}

export function getHoverAnimation(style: VisualStyle): Record<string, any> {
  return HOVER_ANIMATIONS[style];
}
