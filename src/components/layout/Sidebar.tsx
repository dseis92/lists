import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, CheckSquare, ListOrdered, List as ListIcon, Columns, ShoppingCart, Target, Grid3x3, Clock, StickyNote, Filter } from 'lucide-react';
import { useLists } from '@/contexts/ListsContext';
import { List, ListType } from '@/types/list.types';
import { nanoid } from 'nanoid';
import Button from '../common/Button';
import { TagBadge } from '../common/TagBadge';

const LIST_TYPE_ICONS = {
  todo: CheckSquare,
  ordered: ListOrdered,
  bullet: ListIcon,
  kanban: Columns,
  shopping: ShoppingCart,
  habit: Target,
  priority: Grid3x3,
  timeline: Clock,
  notes: StickyNote,
};

export default function Sidebar() {
  const { state, addList, setActiveList } = useLists();
  const [newListName, setNewListName] = useState('');
  const [selectedType, setSelectedType] = useState<ListType>('todo');
  const [isCreating, setIsCreating] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Filter lists by selected tags
  const filteredLists = useMemo(() => {
    if (selectedTags.length === 0) return state.lists;
    return state.lists.filter((list) =>
      selectedTags.some((tag) => list.tags.includes(tag))
    );
  }, [state.lists, selectedTags]);

  const handleCreateList = () => {
    if (!newListName.trim()) return;

    const newList: List = {
      id: nanoid(),
      name: newListName,
      type: selectedType,
      items: [],
      colorTheme: 'ocean',
      visualStyle: 'card',
      tags: [],
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    addList(newList);
    setNewListName('');
    setIsCreating(false);
  };

  const toggleTagFilter = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
  };

  return (
    <aside className="w-64 border-r-2 border-[var(--color-secondary)] bg-white p-4 flex flex-col">
      <div className="mb-4">
        <Button
          onClick={() => setIsCreating(!isCreating)}
          icon={<Plus size={18} />}
          className="w-full justify-center"
        >
          New List
        </Button>
      </div>

      {/* Create new list form */}
      {isCreating && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="mb-4 p-3 bg-[var(--color-background)] rounded-lg"
        >
          <input
            type="text"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
            placeholder="List name..."
            className="w-full px-3 py-2 rounded border-2 border-[var(--color-secondary)] focus:outline-none focus:border-[var(--color-primary)] mb-2"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCreateList();
              if (e.key === 'Escape') setIsCreating(false);
            }}
          />

          <div className="grid grid-cols-2 gap-2 mb-2 max-h-48 overflow-y-auto">
            {(['todo', 'ordered', 'bullet', 'kanban', 'shopping', 'habit', 'priority', 'timeline', 'notes'] as ListType[]).map((type) => {
              const Icon = LIST_TYPE_ICONS[type];
              return (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`p-2 rounded border-2 flex items-center justify-center gap-1 text-xs transition-all ${
                    selectedType === type
                      ? 'border-[var(--color-primary)] bg-[var(--color-background)]'
                      : 'border-gray-200 hover:border-[var(--color-secondary)]'
                  }`}
                >
                  <Icon size={12} />
                  {type}
                </button>
              );
            })}
          </div>

          <div className="flex gap-2">
            <Button onClick={handleCreateList} variant="primary" className="flex-1 text-sm py-1">
              Create
            </Button>
            <Button onClick={() => setIsCreating(false)} variant="ghost" className="flex-1 text-sm py-1">
              Cancel
            </Button>
          </div>
        </motion.div>
      )}

      {/* Tag Filters */}
      {state.tags.length > 0 && (
        <div className="mb-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-between text-sm font-semibold text-[var(--color-text)] opacity-70 hover:opacity-100 transition-opacity mb-2"
          >
            <div className="flex items-center gap-2">
              <Filter size={14} />
              <span>Filter by Tags</span>
            </div>
            {selectedTags.length > 0 && (
              <span className="text-xs bg-[var(--color-primary)] text-white px-2 py-0.5 rounded-full">
                {selectedTags.length}
              </span>
            )}
          </button>

          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="flex flex-wrap gap-1.5"
              >
                {state.tags.map((tag) => (
                  <TagBadge
                    key={tag.name}
                    tag={tag.name}
                    count={tag.count}
                    size="sm"
                    onClick={() => toggleTagFilter(tag.name)}
                  />
                ))}
                {selectedTags.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-[var(--color-primary)] hover:underline"
                  >
                    Clear
                  </button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* Lists */}
      <div className="flex-1 overflow-y-auto">
        {state.lists.length === 0 ? (
          <p className="text-sm text-gray-500 text-center mt-8">
            No lists yet. Create your first list!
          </p>
        ) : filteredLists.length === 0 ? (
          <p className="text-sm text-gray-500 text-center mt-8">
            No lists match the selected filters.
          </p>
        ) : (
          <div className="space-y-1">
            {filteredLists.map((list) => {
              const Icon = LIST_TYPE_ICONS[list.type];
              const isActive = state.activeListId === list.id;

              return (
                <motion.button
                  key={list.id}
                  onClick={() => setActiveList(list.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-all ${
                    isActive
                      ? 'bg-[var(--color-primary)] text-white'
                      : 'hover:bg-[var(--color-background)]'
                  }`}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-2">
                    <Icon size={16} />
                    <span className="font-medium truncate flex-1">{list.name}</span>
                    <span className="text-xs opacity-70">
                      {list.items.length}
                    </span>
                  </div>
                  {list.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {list.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className={`text-xs px-1.5 py-0.5 rounded ${
                            isActive ? 'bg-white/20' : 'bg-[var(--color-secondary)]'
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                      {list.tags.length > 2 && (
                        <span className={`text-xs px-1.5 py-0.5 rounded ${
                          isActive ? 'bg-white/20' : 'bg-[var(--color-secondary)]'
                        }`}>
                          +{list.tags.length - 2}
                        </span>
                      )}
                    </div>
                  )}
                </motion.button>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
}
