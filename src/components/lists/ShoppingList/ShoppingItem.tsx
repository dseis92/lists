import { motion } from 'framer-motion';
import { Trash2, Minus, Plus } from 'lucide-react';
import { ShoppingItem as ShoppingItemType, VisualStyle } from '@/types/list.types';
import { useLists } from '@/contexts/ListsContext';
import EmojiPicker from '../../common/EmojiPicker';
import { getVisualStyle } from '@/utils/visualStyles';
import { getItemAnimation, getHoverAnimation } from '@/utils/animations';

interface ShoppingItemProps {
  item: ShoppingItemType;
  listId: string;
  visualStyle: VisualStyle;
}

export default function ShoppingItem({ item, listId, visualStyle }: ShoppingItemProps) {
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

  const handleQuantityChange = (delta: number) => {
    const newQuantity = Math.max(1, item.quantity + delta);
    updateItem(listId, item.id, { quantity: newQuantity });
  };

  const handlePriceChange = (e: React.FocusEvent<HTMLInputElement>) => {
    const price = parseFloat(e.target.value) || 0;
    updateItem(listId, item.id, { price });
  };

  return (
    <motion.div
      variants={itemAnimation}
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
        <div className="flex-1">
          <p
            className={`text-[var(--color-text)] ${
              item.checked ? 'opacity-50 line-through' : ''
            }`}
          >
            {item.content}
          </p>
        </div>

        {/* Quantity controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleQuantityChange(-1)}
            className="p-1 rounded hover:bg-gray-100"
          >
            <Minus size={14} />
          </button>
          <span className="w-8 text-center font-semibold">{item.quantity}</span>
          <button
            onClick={() => handleQuantityChange(1)}
            className="p-1 rounded hover:bg-gray-100"
          >
            <Plus size={14} />
          </button>
        </div>

        {/* Price input */}
        <div className="flex items-center gap-1">
          <span className="text-sm text-gray-500">$</span>
          <input
            type="number"
            step="0.01"
            min="0"
            defaultValue={item.price || ''}
            onBlur={handlePriceChange}
            placeholder="0.00"
            className="w-16 px-2 py-1 text-sm border rounded focus:outline-none focus:border-[var(--color-primary)]"
          />
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
