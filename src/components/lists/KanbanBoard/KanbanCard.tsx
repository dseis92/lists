import { motion } from 'framer-motion';
import { Trash2, MoveHorizontal } from 'lucide-react';
import { KanbanItem as KanbanItemType } from '@/types/list.types';
import { useLists } from '@/contexts/ListsContext';
import EmojiPicker from '../../common/EmojiPicker';

interface KanbanCardProps {
  item: KanbanItemType;
  listId: string;
}

export default function KanbanCard({ item, listId }: KanbanCardProps) {
  const { updateItem, deleteItem } = useLists();

  const handleEmojiSelect = (emoji: string) => {
    updateItem(listId, item.id, { emoji });
  };

  const handleMoveToColumn = (columnId: string) => {
    updateItem(listId, item.id, { columnId });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      layout
      className="group bg-white rounded-lg border-2 border-[var(--color-secondary)] p-3 hover:shadow-md transition-shadow cursor-move"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-start gap-2 mb-2">
        {/* Emoji */}
        <EmojiPicker
          onSelect={handleEmojiSelect}
          selectedEmoji={item.emoji}
        />

        {/* Content */}
        <p className="flex-1 text-sm text-[var(--color-text)]">
          {item.content}
        </p>

        {/* Delete button */}
        <button
          onClick={() => deleteItem(listId, item.id)}
          className="opacity-0 group-hover:opacity-100 p-1 rounded-md hover:bg-red-50 text-red-500 transition-all flex-shrink-0"
        >
          <Trash2 size={14} />
        </button>
      </div>

      {/* Move buttons */}
      <div className="opacity-0 group-hover:opacity-100 flex gap-1 transition-all">
        <button
          onClick={() => handleMoveToColumn('todo')}
          className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors flex items-center gap-1"
          title="Move to To Do"
        >
          <MoveHorizontal size={10} />
          To Do
        </button>
        <button
          onClick={() => handleMoveToColumn('inprogress')}
          className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors flex items-center gap-1"
          title="Move to In Progress"
        >
          <MoveHorizontal size={10} />
          In Progress
        </button>
        <button
          onClick={() => handleMoveToColumn('done')}
          className="text-xs px-2 py-1 rounded bg-gray-100 hover:bg-gray-200 transition-colors flex items-center gap-1"
          title="Move to Done"
        >
          <MoveHorizontal size={10} />
          Done
        </button>
      </div>
    </motion.div>
  );
}
