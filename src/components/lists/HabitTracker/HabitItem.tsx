import { motion } from 'framer-motion';
import { Trash2, Flame, CheckCircle2 } from 'lucide-react';
import { HabitItem as HabitItemType, VisualStyle } from '@/types/list.types';
import { useLists } from '@/contexts/ListsContext';
import EmojiPicker from '../../common/EmojiPicker';
import { getVisualStyle } from '@/utils/visualStyles';
import { getItemAnimation, getHoverAnimation } from '@/utils/animations';

interface HabitItemProps {
  item: HabitItemType;
  listId: string;
  visualStyle: VisualStyle;
}

export default function HabitItem({ item, listId, visualStyle }: HabitItemProps) {
  const { updateItem, deleteItem } = useLists();

  const config = getVisualStyle(visualStyle);
  const itemAnimation = getItemAnimation(visualStyle);
  const hoverAnimation = getHoverAnimation(visualStyle);

  const handleEmojiSelect = (emoji: string) => {
    updateItem(listId, item.id, { emoji });
  };

  const handleCheckIn = () => {
    const today = new Date().setHours(0, 0, 0, 0);
    const completedDates = item.completedDates || [];

    // Check if already checked in today
    if (completedDates.includes(today)) {
      // Remove today's check-in
      updateItem(listId, item.id, {
        completedDates: completedDates.filter((date) => date !== today),
      });
    } else {
      // Add today's check-in
      updateItem(listId, item.id, {
        completedDates: [...completedDates, today],
      });
    }
  };

  // Calculate streak
  const calculateStreak = () => {
    const sortedDates = [...(item.completedDates || [])].sort((a, b) => b - a);
    if (sortedDates.length === 0) return 0;

    let streak = 0;
    const today = new Date().setHours(0, 0, 0, 0);
    const oneDayMs = 24 * 60 * 60 * 1000;

    for (let i = 0; i < sortedDates.length; i++) {
      const expectedDate = today - i * oneDayMs;
      if (sortedDates[i] === expectedDate) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  };

  const streak = calculateStreak();
  const today = new Date().setHours(0, 0, 0, 0);
  const checkedInToday = (item.completedDates || []).includes(today);

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
        {/* Emoji */}
        <EmojiPicker
          onSelect={handleEmojiSelect}
          selectedEmoji={item.emoji}
        />

        {/* Content */}
        <div className="flex-1">
          <p className="text-[var(--color-text)]">{item.content}</p>
        </div>

        {/* Streak indicator */}
        {streak > 0 && (
          <div className="flex items-center gap-1 px-2 py-1 bg-orange-100 rounded">
            <Flame size={16} className="text-orange-500" />
            <span className="text-sm font-semibold text-orange-700">{streak}</span>
          </div>
        )}

        {/* Check-in button */}
        <motion.button
          onClick={handleCheckIn}
          className={`p-2 rounded-lg transition-all ${
            checkedInToday
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-400 hover:bg-green-100 hover:text-green-600'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <CheckCircle2 size={20} />
        </motion.button>

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
