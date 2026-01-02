import type { MouseEvent } from 'react';

export type TagBadgeSize = 'sm' | 'md' | 'lg';

export type TagBadgeProps = {
  tag: string;
  selected?: boolean;
  size?: TagBadgeSize;
  count?: number;
  onClick?: (tag: string) => void;
  onRemove?: (tag: string) => void;
  className?: string;
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const SIZE_STYLES: Record<TagBadgeSize, string> = {
  sm: 'px-2 py-0.5 text-xs',
  md: 'px-2 py-1 text-xs',
  lg: 'px-3 py-1.5 text-sm',
};

export function TagBadge({
  tag,
  selected = false,
  size = 'md',
  count,
  onClick,
  onRemove,
  className = '',
}: TagBadgeProps) {
  const handleClick = (_e: MouseEvent) => {
    _e.stopPropagation();
    onClick?.(tag);
  };

  const handleRemove = (_e: MouseEvent) => {
    _e.stopPropagation();
    onRemove?.(tag);
  };

  const base = 'inline-flex items-center gap-2 rounded-full transition';
  const state = selected
    ? 'bg-zinc-900 text-white'
    : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200';

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cx(base, state, SIZE_STYLES[size], className)}
      aria-pressed={selected}
    >
      <span className="truncate">{tag}</span>

      {typeof count === 'number' ? (
        <span
          className={cx(
            'min-w-[1.25rem] rounded-full px-1 text-[10px] leading-4 text-center',
            selected ? 'bg-white/20 text-white' : 'bg-zinc-200 text-zinc-800'
          )}
        >
          {count}
        </span>
      ) : null}

      {onRemove ? (
        <span
          role="button"
          tabIndex={0}
          onClick={handleRemove}
          onKeyDown={(ev) => {
            if (ev.key === 'Enter' || ev.key === ' ') {
              ev.preventDefault();
              onRemove(tag);
            }
          }}
          className={cx(
            'ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full text-[12px] leading-none',
            selected ? 'hover:bg-white/20' : 'hover:bg-zinc-300'
          )}
          aria-label={`Remove ${tag}`}
          title="Remove"
        >
          ×
        </span>
      ) : null}
    </button>
  );
}

export default TagBadge;
