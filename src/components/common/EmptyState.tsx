import { motion } from 'framer-motion';
import { ListType, VisualStyle } from '@/types/list.types';
import { getEmptyStateMessage } from '@/utils/emptyStates';
import Button from './Button';

interface EmptyStateProps {
  listType: ListType;
  visualStyle: VisualStyle;
  onAction?: () => void;
  actionLabel?: string;
}

export function EmptyState({
  listType,
  visualStyle,
  onAction,
  actionLabel = 'Add Item',
}: EmptyStateProps) {
  const message = getEmptyStateMessage(listType);

  const emojiSize = visualStyle === 'playful' ? 'text-8xl' : visualStyle === 'compact' ? 'text-5xl' : 'text-6xl';
  const titleSize = visualStyle === 'compact' ? 'text-lg' : 'text-2xl';
  const subtitleSize = visualStyle === 'compact' ? 'text-sm' : 'text-base';
  const spacing = visualStyle === 'compact' ? 'space-y-2' : visualStyle === 'playful' ? 'space-y-6' : 'space-y-4';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`flex flex-col items-center justify-center ${spacing} py-12 px-4 text-center`}
    >
      <motion.div
        animate={{
          y: visualStyle === 'playful' ? [0, -10, 0] : [0, -5, 0],
        }}
        transition={{
          duration: visualStyle === 'playful' ? 2 : 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className={emojiSize}
      >
        {message.emoji}
      </motion.div>

      <div className="space-y-2">
        <h3
          className={`${titleSize} font-semibold text-[var(--color-text)]`}
          style={{
            fontWeight: visualStyle === 'playful' ? '700' : '600',
          }}
        >
          {message.title}
        </h3>

        <p
          className={`${subtitleSize} text-[var(--color-text)] opacity-70`}
        >
          {message.subtitle}
        </p>
      </div>

      {onAction && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Button
            onClick={onAction}
            variant="primary"
          >
            {actionLabel}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
