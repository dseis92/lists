import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Settings } from 'lucide-react';
import { List, TodoItem as TodoItemType, VisualStyle } from '@/types/list.types';
import { useLists } from '@/contexts/ListsContext';
import { nanoid } from 'nanoid';
import TodoItem from './TodoItem';
import Button from '../../common/Button';
import { EmptyState } from '../../common/EmptyState';
import { TagInput } from '../../common/TagInput';
import { VisualStylePicker } from '../../common/VisualStylePicker';
import { getVisualStyle } from '@/utils/visualStyles';
import { CONTAINER_ANIMATIONS, getItemAnimation } from '@/utils/animations';

interface TodoListProps {
  list: List;
}

export default function TodoList({ list }: TodoListProps) {
  const { addItem, deleteList, updateList, syncTags, getAllTags } = useLists();
  const [newItemContent, setNewItemContent] = useState('');
  const [showSettings, setShowSettings] = useState(false);

  const todos = list.items as TodoItemType[];
  const visualConfig = getVisualStyle(list.visualStyle);

  const handleAddItem = () => {
    if (!newItemContent.trim()) return;

    const newItem: TodoItemType = {
      id: nanoid(),
      content: newItemContent,
      checked: false,
      createdAt: Date.now(),
    };

    addItem(list.id, newItem);
    setNewItemContent('');
  };

  const completedCount = todos.filter((todo) => todo.checked).length;

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
            {list.name}
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
        <p className="text-sm text-gray-600">
          {completedCount} of {todos.length} completed
        </p>
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
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          value={newItemContent}
          onChange={(e) => setNewItemContent(e.target.value)}
          placeholder="Add a new task..."
          className="flex-1 px-4 py-3 rounded-lg border-2 border-[var(--color-secondary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors"
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleAddItem();
          }}
        />
        <Button onClick={handleAddItem} icon={<Plus size={20} />}>
          Add
        </Button>
      </div>

      {/* Todo items */}
      <div className="flex-1 overflow-y-auto">
        {todos.length === 0 ? (
          <EmptyState
            listType={list.type}
            visualStyle={list.visualStyle}
            onAction={() => document.querySelector<HTMLInputElement>('input[type="text"]')?.focus()}
            actionLabel="Add Task"
          />
        ) : (
          <motion.div
            className="space-y-2"
            style={{
              gap: visualConfig.spacing.itemGap,
            }}
            variants={CONTAINER_ANIMATIONS}
            initial="hidden"
            animate="show"
          >
            {todos.map((todo) => (
              <TodoItem key={todo.id} item={todo} listId={list.id} visualStyle={list.visualStyle} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
