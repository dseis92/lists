import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  icon?: ReactNode;
  loading?: boolean;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const VARIANT: Record<ButtonVariant, string> = {
  primary: 'bg-zinc-900 text-white hover:bg-zinc-800',
  secondary: 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200',
  ghost: 'bg-transparent text-zinc-900 hover:bg-zinc-100',
  danger: 'bg-red-600 text-white hover:bg-red-500',
};

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    icon,
    loading,
    className,
    disabled,
    children,
    ...rest
  } = props;

  const isDisabled = Boolean(disabled || loading);

  return (
    <motion.button
      {...(rest as any)}
      disabled={isDisabled}
      className={cx(
        'inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition',
        'focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 focus:ring-offset-white',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        VARIANT[variant],
        className
      )}
      whileTap={{ scale: 0.98 }}
    >
      {icon ? <span className="inline-flex">{icon}</span> : null}
      {children}
    </motion.button>
  );
}

export default Button;
