import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { KanbanColumn as KanbanColumnType, KanbanItem as KanbanItemType } from '@/types/list.types';
import { useLists } from '@/contexts/ListsContext';
import { nanoid } from 'nanoid';
import KanbanCard from './KanbanCard';
import Button from '../../common/Button';

interface KanbanColumnProps {
  column: KanbanColumnType;
  items: KanbanItemType[];
  listId: string;
}

export default function KanbanColumn({ column, items, listId }: KanbanColumnProps) {
  const { addItem } = useLists();
  const [newCardContent, setNewCardContent] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const handleAddCard = () => {
    if (!newCardContent.trim()) return;

    const newCard: KanbanItemType = {
      id: nanoid(),
      content: newCardContent,
      columnId: column.id,
      createdAt: Date.now(),
    };

    addItem(listId, newCard);
    setNewCardContent('');
    setIsAdding(false);
  };

  return (
    <div className="flex flex-col w-80 bg-[var(--color-background)] rounded-lg p-4 flex-shrink-0 h-full">
      {/* Column header */}
      <div className="mb-4">
        <h3 className="font-bold text-lg text-[var(--color-text)] mb-1">
          {column.name}
        </h3>
        <p className="text-sm text-gray-600">
          {items.length} {items.length === 1 ? 'card' : 'cards'}
        </p>
      </div>

      {/* Cards */}
      <div className="flex-1 overflow-y-auto space-y-2 mb-3">
        {items.length === 0 ? (
          <p className="text-sm text-gray-400 text-center py-4">
            No cards yet
          </p>
        ) : (
          <motion.div
            className="space-y-2"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.05,
                },
              },
            }}
          >
            {items.map((item) => (
              <KanbanCard key={item.id} item={item} listId={listId} />
            ))}
          </motion.div>
        )}
      </div>

      {/* Add card button/form */}
      {isAdding ? (
        <div className="space-y-2">
          <textarea
            value={newCardContent}
            onChange={(e) => setNewCardContent(e.target.value)}
            placeholder="Enter card content..."
            className="w-full px-3 py-2 rounded border-2 border-[var(--color-secondary)] focus:outline-none focus:border-[var(--color-primary)] resize-none"
            rows={3}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleAddCard();
              }
              if (e.key === 'Escape') setIsAdding(false);
            }}
          />
          <div className="flex gap-2">
            <Button onClick={handleAddCard} variant="primary" className="flex-1 text-sm py-1">
              Add
            </Button>
            <Button onClick={() => setIsAdding(false)} variant="ghost" className="flex-1 text-sm py-1">
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <Button
          onClick={() => setIsAdding(true)}
          variant="secondary"
          icon={<Plus size={16} />}
          className="w-full justify-center text-sm"
        >
          Add Card
        </Button>
      )}
    </div>
  );
}
