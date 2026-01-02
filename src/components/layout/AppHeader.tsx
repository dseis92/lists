import ColorThemePicker from '../common/ColorThemePicker';
import { ListTodo } from 'lucide-react';

export default function AppHeader() {
  return (
    <header className="border-b-2 border-[var(--color-secondary)] bg-white px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ListTodo size={28} className="text-[var(--color-primary)]" />
          <h1 className="text-2xl font-bold text-[var(--color-text)]">
            Lists
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <ColorThemePicker />
        </div>
      </div>
    </header>
  );
}
