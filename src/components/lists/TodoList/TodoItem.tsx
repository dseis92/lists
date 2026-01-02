import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { TodoItem as TodoItemType, VisualStyle } from '@/types/list.types';
import { useLists } from '@/contexts/ListsContext';
import EmojiPicker from '../../common/EmojiPicker';
import styles from './TodoList.module.css';
import { getVisualStyle } from '@/utils/visualStyles';
import { getItemAnimation, getHoverAnimation } from '@/utils/animations';

interface TodoItemProps {
  item: TodoItemType;
  listId: string;
  visualStyle: VisualStyle;
}

export default function TodoItem({ item, listId, visualStyle }: TodoItemProps) {
  const { updateItem, deleteItem } = useLists();

  const config = getVisualStyle(visualStyle);
  const itemAnimation = getItemAnimation(visualStyle);
  const hoverAnimation = getHoverAnimation(visualStyle);

  const handleToggle = () => {
    updateItem(listId, item.id, { checked: !item.checked });
  };

  const handleEmojiSelect = (emoji: string) => {
    updateItem(listId, item.id, { emoji });
  };

  return (
    <motion.div
      {...itemAnimation}
      whileHover={hoverAnimation}
      layout
      className="group bg-white"
      style={{
        padding: config.spacing.padding,
        borderRadius: config.appearance.borderRadius,
        borderWidth: config.appearance.borderWidth,
        borderColor: 'var(--color-secondary)',
        borderStyle: 'solid',
        boxShadow: config.appearance.shadows ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
        fontSize: config.typography.fontSize,
        fontWeight: config.typography.fontWeight,
      }}
    >
      <div className="flex items-center gap-3">
        {/* Checkbox */}
        <motion.button
          onClick={handleToggle}
          className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-all ${
            item.checked
              ? 'bg-[var(--color-primary)] border-[var(--color-primary)]'
              : 'border-gray-300 hover:border-[var(--color-primary)]'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {item.checked && (
            <motion.svg
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-4 h-4 text-white"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </motion.svg>
          )}
        </motion.button>

        {/* Emoji */}
        <EmojiPicker
          onSelect={handleEmojiSelect}
          selectedEmoji={item.emoji}
        />

        {/* Content */}
        <div className="flex-1 relative">
          <p
            className={`text-[var(--color-text)] ${
              item.checked ? 'opacity-50' : ''
            }`}
          >
            {item.content}
          </p>
          {item.checked && (
            <div className={styles.strikethrough}></div>
          )}
        </div>

        {/* Delete button */}
        <button
          onClick={() => deleteItem(listId, item.id)}
          className="opacity-0 group-hover:opacity-100 p-2 rounded-md hover:bg-red-50 text-red-500 transition-all"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </motion.div>
  );
}
