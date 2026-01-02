export type ListType = 'todo' | 'ordered' | 'bullet' | 'kanban' | 'shopping' | 'habit' | 'priority' | 'timeline' | 'notes';

export type VisualStyle = 'compact' | 'card' | 'minimal' | 'playful';

export interface BaseItem {
  id: string;
  content: string;
  emoji?: string;
  createdAt: number;
}

export interface TodoItem extends BaseItem {
  checked: boolean;
}

export interface OrderedItem extends BaseItem {
  order: number;
}

export interface BulletItem extends BaseItem {}

export interface KanbanItem extends BaseItem {
  columnId: string;
}

export interface ShoppingItem extends BaseItem {
  quantity: number;
  unit?: string;
  category?: string;
  price?: number;
  checked: boolean;
  store?: string;
}

export interface HabitItem extends BaseItem {
  frequency: 'daily' | 'weekly' | 'custom';
  completedDates: number[];
  targetCount?: number;
  color?: string;
}

export interface PriorityItem extends BaseItem {
  quadrant: 'urgent-important' | 'not-urgent-important' | 'urgent-not-important' | 'not-urgent-not-important';
  dueDate?: number;
  completed: boolean;
}

export interface TimelineItem extends BaseItem {
  startDate: number;
  endDate?: number;
  milestone: boolean;
  status: 'planned' | 'in-progress' | 'completed';
  color?: string;
}

export interface NoteItem extends BaseItem {
  richContent?: string;
  color?: string;
  pinned: boolean;
  lastEdited: number;
}

export type ListItem = TodoItem | OrderedItem | BulletItem | KanbanItem | ShoppingItem | HabitItem | PriorityItem | TimelineItem | NoteItem;

export interface List {
  id: string;
  name: string;
  type: ListType;
  items: ListItem[];
  colorTheme: string;
  visualStyle: VisualStyle;
  tags: string[];
  createdAt: number;
  updatedAt: number;
}

export interface KanbanColumn {
  id: string;
  name: string;
  order: number;
}

export interface TagMetadata {
  name: string;
  color: string;
  count: number;
  createdAt: number;
}

export interface AppData {
  lists: List[];
  kanbanColumns: Record<string, KanbanColumn[]>;
  tags: TagMetadata[];
  preferences: {
    themeId: string;
    lastActiveListId: string | null;
  };
  version: string;
}
