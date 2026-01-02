import { useState, useEffect } from 'react';
import { Trash2 } from 'lucide-react';
import { List, KanbanItem as KanbanItemType, KanbanColumn as KanbanColumnType } from '@/types/list.types';
import { useLists } from '@/contexts/ListsContext';
import KanbanColumn from './KanbanColumn';
import Button from '../../common/Button';

interface KanbanBoardProps {
  list: List;
}

const DEFAULT_COLUMNS: KanbanColumnType[] = [
  { id: 'todo', name: 'To Do', order: 1 },
  { id: 'inprogress', name: 'In Progress', order: 2 },
  { id: 'done', name: 'Done', order: 3 },
];

export default function KanbanBoard({ list }: KanbanBoardProps) {
  const { state, setKanbanColumns, deleteList } = useLists();
  const [columns, _setColumns] = useState<KanbanColumnType[]>(
    state.kanbanColumns[list.id] || DEFAULT_COLUMNS
  );

  const items = list.items as KanbanItemType[];

  // Initialize columns if they don't exist
  useEffect(() => {
    if (!state.kanbanColumns[list.id]) {
      setKanbanColumns(list.id, DEFAULT_COLUMNS);
    }
  }, [list.id, state.kanbanColumns, setKanbanColumns]);

  const getItemsForColumn = (columnId: string) => {
    return items.filter((item) => item.columnId === columnId);
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
          {items.length} {items.length === 1 ? 'card' : 'cards'}
        </p>
      </div>

      {/* Kanban columns */}
      <div className="flex-1 overflow-x-auto overflow-y-hidden">
        <div className="flex gap-4 h-full min-w-min pb-4">
          {columns
            .sort((a, b) => a.order - b.order)
            .map((column) => (
              <KanbanColumn
                key={column.id}
                column={column}
                items={getItemsForColumn(column.id)}
                listId={list.id}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
