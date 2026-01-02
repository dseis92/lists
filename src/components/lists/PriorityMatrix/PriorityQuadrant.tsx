import { motion } from 'framer-motion';
import { Trash2, Check } from 'lucide-react';
import { PriorityItem, VisualStyle } from '@/types/list.types';
import { useLists } from '@/contexts/ListsContext';
import { CONTAINER_ANIMATIONS } from '@/utils/animations';

interface QuadrantInfo {
  id: string;
  label: string;
  emoji: string;
  color: string;
}

interface PriorityQuadrantProps {
  quadrant: QuadrantInfo;
  items: PriorityItem[];
  listId: string;
  visualStyle: VisualStyle;
}

export default function PriorityQuadrant({ quadrant, items, listId, visualStyle: _visualStyle }: PriorityQuadrantProps) {
  const { updateItem, deleteItem } = useLists();

  const handleToggle = (itemId: string, currentStatus: boolean) => {
    updateItem(listId, itemId, { completed: !currentStatus });
  };

  return (
    <div
      className="rounded-lg border-2 p-4 flex flex-col overflow-hidden"
      style={{
        borderColor: quadrant.color,
        backgroundColor: `${quadrant.color}10`,
      }}
    >
      {/* Quadrant Header */}
      <div className="mb-3">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <span>{quadrant.emoji}</span>
          <span style={{ color: quadrant.color }}>{quadrant.label}</span>
        </h3>
        <p className="text-xs text-gray-500 mt-1">
          {items.length} {items.length === 1 ? 'task' : 'tasks'}
        </p>
      </div>

      {/* Items */}
      <motion.div
        className="flex-1 overflow-y-auto space-y-2"
        variants={CONTAINER_ANIMATIONS}
        initial="hidden"
        animate="show"
      >
        {items.map((item) => (
          <motion.div
            key={item.id}
            className="group bg-white rounded-lg p-3 border hover:shadow-md transition-all"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start gap-2">
              <button
                onClick={() => handleToggle(item.id, item.completed)}
                className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  item.completed
                    ? 'border-green-500 bg-green-500'
                    : 'border-gray-300 hover:border-green-500'
                }`}
              >
                {item.completed && <Check size={14} className="text-white" />}
              </button>

              <p
                className={`flex-1 text-sm ${
                  item.completed ? 'line-through opacity-50' : ''
                }`}
              >
                {item.content}
              </p>

              <button
                onClick={() => deleteItem(listId, item.id)}
                className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-50 text-red-500 transition-all"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
