import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import { OrderedItem as OrderedItemType } from '@/types/list.types';
import { useLists } from '@/contexts/ListsContext';
import EmojiPicker from '../../common/EmojiPicker';

interface OrderedItemProps {
  item: OrderedItemType;
  listId: string;
  displayNumber: number;
}

export default function OrderedItem({ item, listId, displayNumber }: OrderedItemProps) {
  const { updateItem, deleteItem } = useLists();

  const handleEmojiSelect = (emoji: string) => {
    updateItem(listId, item.id, { emoji });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      layout
      className="group bg-white rounded-lg border-2 border-[var(--color-secondary)] p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3">
        {/* Number */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center font-bold">
          {displayNumber}
        </div>

        {/* Emoji */}
        <EmojiPicker
          onSelect={handleEmojiSelect}
          selectedEmoji={item.emoji}
        />

        {/* Content */}
        <p className="flex-1 text-[var(--color-text)]">
          {item.content}
        </p>

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
