import { motion } from 'framer-motion';
import { VisualStyle } from '@/types/list.types';
import { VISUAL_STYLE_OPTIONS } from '@/utils/visualStyles';
import { Check } from 'lucide-react';

interface VisualStylePickerProps {
  selectedStyle: VisualStyle;
  onStyleChange: (style: VisualStyle) => void;
}

export function VisualStylePicker({
  selectedStyle,
  onStyleChange,
}: VisualStylePickerProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-[var(--color-text)] opacity-70">
        Visual Style
      </h3>

      <div className="grid grid-cols-2 gap-3">
        {VISUAL_STYLE_OPTIONS.map((style) => {
          const isSelected = selectedStyle === style.id;

          return (
            <motion.button
              key={style.id}
              onClick={() => onStyleChange(style.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative p-4 rounded-lg border-2 transition-all text-left ${
                isSelected
                  ? 'border-[var(--color-primary)] bg-[var(--color-secondary)]'
                  : 'border-gray-200 bg-white hover:border-[var(--color-accent)]'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-2xl">{style.icon}</span>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                  >
                    <Check size={18} className="text-[var(--color-primary)]" />
                  </motion.div>
                )}
              </div>

              <div>
                <h4 className="font-semibold text-[var(--color-text)] text-sm mb-1">
                  {style.name}
                </h4>
                <p className="text-xs text-[var(--color-text)] opacity-60">
                  {style.description}
                </p>
              </div>

              {/* Visual preview */}
              <div className="mt-3 space-y-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-2 rounded bg-[var(--color-primary)] opacity-20"
                    style={{
                      width: `${100 - i * 15}%`,
                      borderRadius: style.appearance.borderRadius,
                    }}
                  />
                ))}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
