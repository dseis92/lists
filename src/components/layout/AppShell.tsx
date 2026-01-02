import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import Sidebar from './Sidebar';

type Props = {
  children: React.ReactNode;
  title?: string;
};

export default function AppShell({ children, title = 'Lists' }: Props) {
  const [open, setOpen] = useState(false);

  // lock body scroll when drawer open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <div className="min-h-svh bg-zinc-50 text-zinc-900">
      {/* Mobile header */}
      <header className="sticky top-0 z-40 flex items-center gap-3 border-b bg-white px-3 py-2 lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg hover:bg-zinc-100"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <div className="text-sm font-semibold">{title}</div>
      </header>

      {/* Desktop layout */}
      <div className="mx-auto max-w-screen-2xl lg:grid lg:grid-cols-[280px_1fr]">
        <aside className="sticky top-0 hidden h-svh border-r bg-white lg:block">
          <Sidebar />
        </aside>

        <main className="p-3 sm:p-4 lg:p-6">
          {children}
        </main>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-50 bg-black/40 lg:hidden"
              onClick={() => setOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.aside
              className="fixed inset-y-0 left-0 z-50 w-[min(82vw,320px)] bg-white shadow-xl lg:hidden"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.2 }}
            >
              <div className="h-full overflow-y-auto">
                <Sidebar />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
