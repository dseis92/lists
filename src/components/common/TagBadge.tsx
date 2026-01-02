import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { getTagColor, getTagBackgroundColor } from '@/utils/tagColors';

interface TagBadgeProps {
  tag: string;
  onRemove?: () => void;
  onClick?: () => void;
  count?: number;
  size?: 'sm' | 'md';
}

export function TagBadge({
  tag,
  onRemove,
  onClick,
  count,
  size = 'md',
}: TagBadgeProps) {
  const color = getTagColor(tag);
  const bgColor = getTagBackgroundColor(color);

  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-3 py-1',
  };

  const handleClick = (e: React.MouseEvent) => {
    if (onClick) {
      onClick();
    }
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onRemove) {
      onRemove();
    }
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      whileHover={{ scale: onClick ? 1.05 : 1 }}
      className={`inline-flex items-center gap-1 rounded-full font-medium transition-all ${sizeClasses[size]} ${
        onClick ? 'cursor-pointer' : ''
      }`}
      style={{
        backgroundColor: bgColor,
        color: color,
        border: `1px solid ${color}40`,
      }}
      onClick={handleClick}
    >
      <span>{tag}</span>

      {count !== undefined && (
        <span
          className="text-xs opacity-70 font-normal"
        >
          ({count})
        </span>
      )}

      {onRemove && (
        <button
          onClick={handleRemove}
          className="ml-0.5 hover:bg-black/10 rounded-full p-0.5 transition-colors"
          aria-label={`Remove ${tag} tag`}
        >
          <X size={size === 'sm' ? 12 : 14} />
        </button>
      )}
    </motion.span>
  );
}
