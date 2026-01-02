import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Settings } from 'lucide-react';
import { List, PriorityItem as PriorityItemType, VisualStyle } from '@/types/list.types';
import { useLists } from '@/contexts/ListsContext';
import { nanoid } from 'nanoid';
import PriorityQuadrant from './PriorityQuadrant';
import Button from '../../common/Button';
import { EmptyState } from '../../common/EmptyState';
import { TagInput } from '../../common/TagInput';
import { VisualStylePicker } from '../../common/VisualStylePicker';

interface PriorityMatrixProps {
  list: List;
}

const QUADRANTS = [
  { id: 'urgent-important', label: 'Do First', emoji: '🔴', color: '#EF4444' },
  { id: 'not-urgent-important', label: 'Schedule', emoji: '🟡', color: '#F59E0B' },
  { id: 'urgent-not-important', label: 'Delegate', emoji: '🔵', color: '#3B82F6' },
  { id: 'not-urgent-not-important', label: 'Eliminate', emoji: '⚪', color: '#6B7280' },
] as const;

export default function PriorityMatrix({ list }: PriorityMatrixProps) {
  const { addItem, deleteList, updateList, syncTags, getAllTags } = useLists();
  const [newItemContent, setNewItemContent] = useState('');
  const [selectedQuadrant, setSelectedQuadrant] = useState<string>('urgent-important');
  const [showSettings, setShowSettings] = useState(false);

  const items = list.items as PriorityItemType[];

  const handleAddItem = () => {
    if (!newItemContent.trim()) return;

    const newItem: PriorityItemType = {
      id: nanoid(),
      content: newItemContent,
      quadrant: selectedQuadrant as any,
      completed: false,
      createdAt: Date.now(),
    };

    addItem(list.id, newItem);
    setNewItemContent('');
  };

  const handleTagsChange = (newTags: string[]) => {
    updateList(list.id, { tags: newTags });
    syncTags();
  };

  const handleStyleChange = (newStyle: VisualStyle) => {
    updateList(list.id, { visualStyle: newStyle });
  };

  return (
    <div className="h-full flex flex-col p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-3xl font-bold text-[var(--color-text)]">
            📊 {list.name}
          </h2>
          <div className="flex gap-2">
            <Button
              onClick={() => setShowSettings(!showSettings)}
              variant="ghost"
              icon={<Settings size={18} />}
            >
              Settings
            </Button>
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
        </div>
        <p className="text-sm text-gray-600">Eisenhower Matrix - Prioritize by urgency and importance</p>
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-6 p-4 bg-white rounded-lg border-2 border-[var(--color-secondary)] space-y-4"
        >
          <TagInput
            tags={list.tags}
            onChange={handleTagsChange}
            suggestions={getAllTags()}
          />
          <VisualStylePicker
            selectedStyle={list.visualStyle}
            onStyleChange={handleStyleChange}
          />
        </motion.div>
      )}

      {/* Add new item */}
      <div className="mb-6">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            value={newItemContent}
            onChange={(e) => setNewItemContent(e.target.value)}
            placeholder="Add a task..."
            className="flex-1 px-4 py-3 rounded-lg border-2 border-[var(--color-secondary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAddItem();
            }}
          />
          <Button onClick={handleAddItem} icon={<Plus size={20} />}>
            Add
          </Button>
        </div>
        <div className="flex gap-2">
          {QUADRANTS.map((q) => (
            <button
              key={q.id}
              onClick={() => setSelectedQuadrant(q.id)}
              className={`flex-1 px-3 py-2 rounded-lg border-2 text-sm transition-all ${
                selectedQuadrant === q.id
                  ? 'border-[var(--color-primary)] bg-[var(--color-background)]'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
              style={{
                borderColor: selectedQuadrant === q.id ? q.color : undefined,
              }}
            >
              {q.emoji} {q.label}
            </button>
          ))}
        </div>
      </div>

      {/* Priority Matrix Grid */}
      <div className="flex-1 overflow-hidden">
        {items.length === 0 ? (
          <EmptyState
            listType={list.type}
            visualStyle={list.visualStyle}
            onAction={() => document.querySelector<HTMLInputElement>('input[type="text"]')?.focus()}
            actionLabel="Add Task"
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 h-full">
            {QUADRANTS.map((quadrant) => (
              <PriorityQuadrant
                key={quadrant.id}
                quadrant={quadrant}
                items={items.filter((item) => item.quadrant === quadrant.id)}
                listId={list.id}
                visualStyle={list.visualStyle}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
