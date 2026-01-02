import { motion, AnimatePresence } from 'framer-motion';
import { useLists } from '@/contexts/ListsContext';
import TodoList from '../lists/TodoList/TodoList';
import OrderedList from '../lists/OrderedList/OrderedList';
import BulletList from '../lists/BulletList/BulletList';
import KanbanBoard from '../lists/KanbanBoard/KanbanBoard';
import ShoppingList from '../lists/ShoppingList/ShoppingList';
import HabitTracker from '../lists/HabitTracker/HabitTracker';
import PriorityMatrix from '../lists/PriorityMatrix/PriorityMatrix';
import { Inbox } from 'lucide-react';
import { getVisualStyleClasses } from '@/utils/visualStyles';
import { PAGE_TRANSITION } from '@/utils/animations';

export default function ListContainer() {
  const { getActiveList } = useLists();
  const activeList = getActiveList();

  if (!activeList) {
    return (
      <div className="flex-1 flex items-center justify-center bg-[var(--color-background)]">
        <div className="text-center">
          <Inbox size={64} className="mx-auto mb-4 text-[var(--color-secondary)]" />
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-2">
            No list selected
          </h2>
          <p className="text-gray-600">
            Create a new list or select one from the sidebar
          </p>
        </div>
      </div>
    );
  }

  const styleClasses = getVisualStyleClasses(activeList.visualStyle);

  return (
    <div className="flex-1 overflow-hidden bg-[var(--color-background)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeList.id}
          variants={PAGE_TRANSITION}
          initial="initial"
          animate="animate"
          exit="exit"
          className={`h-full ${styleClasses}`}
        >
          {activeList.type === 'todo' && <TodoList list={activeList} />}
          {activeList.type === 'ordered' && <OrderedList list={activeList} />}
          {activeList.type === 'bullet' && <BulletList list={activeList} />}
          {activeList.type === 'kanban' && <KanbanBoard list={activeList} />}
          {activeList.type === 'shopping' && <ShoppingList list={activeList} />}
          {activeList.type === 'habit' && <HabitTracker list={activeList} />}
          {activeList.type === 'priority' && <PriorityMatrix list={activeList} />}
          {activeList.type === 'timeline' && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h3 className="text-2xl mb-2">⏱️ Timeline</h3>
                <p className="text-gray-600">Coming soon!</p>
              </div>
            </div>
          )}
          {activeList.type === 'notes' && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <h3 className="text-2xl mb-2">📝 Quick Notes</h3>
                <p className="text-gray-600">Coming soon!</p>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
