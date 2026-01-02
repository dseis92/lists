import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2 } from 'lucide-react';
import { List, BulletItem as BulletItemType } from '@/types/list.types';
import { useLists } from '@/contexts/ListsContext';
import { nanoid } from 'nanoid';
import BulletItem from './BulletItem';
import Button from '../../common/Button';

interface BulletListProps {
  list: List;
}

export default function BulletList({ list }: BulletListProps) {
  const { addItem, deleteList } = useLists();
  const [newItemContent, setNewItemContent] = useState('');

  const items = list.items as BulletItemType[];

  const handleAddItem = () => {
    if (!newItemContent.trim()) return;

    const newItem: BulletItemType = {
      id: nanoid(),
      content: newItemContent,
      createdAt: Date.now(),
    };

    addItem(list.id, newItem);
    setNewItemContent('');
  };

  return (
    <div className="h-full flex flex-col p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-3xl font-bold text-[var(--color-text)]">
            {list.name}
          </h2>
          <Button
            onClick={() => {
              if (confirm('Are you sure you want to delete this list?')) {
                deleteList(list.id);
              }
            }}
            variant="ghost"
            icon={<Trash2 size={18} />}
            className="text-red-500 hover:bg-red-50"
          >
            Delete
          </Button>
        </div>
        <p className="text-sm text-gray-600">
          {items.length} {items.length === 1 ? 'note' : 'notes'}
        </p>
      </div>

      {/* Add new item */}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          value={newItemContent}
          onChange={(e) => setNewItemContent(e.target.value)}
          placeholder="Add a new note..."
          className="flex-1 px-4 py-3 rounded-lg border-2 border-[var(--color-secondary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAddItem();
          }}
        />
        <Button onClick={handleAddItem} icon={<Plus size={20} />}>
          Add
        </Button>
      </div>

      {/* Bullet items */}
      <div className="flex-1 overflow-y-auto">
        {items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No notes yet. Add your first note above!</p>
          </div>
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
              <BulletItem key={item.id} item={item} listId={list.id} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
