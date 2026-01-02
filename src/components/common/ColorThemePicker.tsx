import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import { Palette } from 'lucide-react';

export default function ColorThemePicker() {
  const { currentTheme, setTheme, availableThemes } = useTheme();

  return (
    <div className="relative group">
      <button
        className="p-2 rounded-lg hover:bg-[var(--color-secondary)] transition-colors"
        title="Change theme"
      >
        <Palette size={20} />
      </button>

      {/* Theme picker dropdown */}
      <div className="absolute right-0 top-full mt-2 p-3 bg-white rounded-lg shadow-lg border-2 border-[var(--color-secondary)] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 min-w-[200px]">
        <p className="text-sm font-medium mb-2">Choose a theme</p>
        <div className="grid grid-cols-2 gap-2">
          {availableThemes.map((theme) => (
            <motion.button
              key={theme.id}
              onClick={() => setTheme(theme.id)}
              className={`p-3 rounded-lg border-2 text-left transition-all ${
                currentTheme.id === theme.id
                  ? 'border-[var(--color-primary)] bg-[var(--color-background)]'
                  : 'border-gray-200 hover:border-[var(--color-secondary)]'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: theme.primary }}
                />
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: theme.secondary }}
                />
              </div>
              <p className="text-xs font-medium">{theme.name}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
