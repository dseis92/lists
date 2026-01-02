import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile } from 'lucide-react';

const EMOJI_OPTIONS = [
  '✨', '🎯', '🚀', '💡', '📝', '✅', '❤️', '🎨',
  '🔥', '⭐', '🎵', '📚', '💻', '🌟', '🎉', '🌈',
  '🍕', '☕', '🌸', '🎮', '📱', '🏆', '💪', '🎁',
];

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  selectedEmoji?: string;
}

export default function EmojiPicker({ onSelect, selectedEmoji }: EmojiPickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="p-1.5 rounded-md hover:bg-[var(--color-secondary)] transition-colors"
        title="Add emoji"
      >
        {selectedEmoji || <Smile size={18} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Emoji picker popup */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -10 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 top-full mt-2 p-3 bg-white rounded-lg shadow-lg border-2 border-[var(--color-secondary)] z-50"
            >
              <div className="grid grid-cols-8 gap-1 w-64">
                {EMOJI_OPTIONS.map((emoji) => (
                  <motion.button
                    key={emoji}
                    type="button"
                    onClick={() => {
                      onSelect(emoji);
                      setIsOpen(false);
                    }}
                    className="text-2xl p-2 rounded hover:bg-[var(--color-background)] transition-colors"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {emoji}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
