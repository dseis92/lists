import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { List, ListItem, KanbanColumn, AppData, TagMetadata } from '@/types/list.types';
import { storage } from '@/utils/storage';
import { useDebouncedSave } from '@/hooks/useDebouncedSave';
import { getTagColor } from '@/utils/tagColors';

interface ListsState {
  lists: List[];
  kanbanColumns: Record<string, KanbanColumn[]>;
  tags: TagMetadata[];
  activeListId: string | null;
}

type ListsAction =
  | { type: 'SET_LISTS'; payload: List[] }
  | { type: 'ADD_LIST'; payload: List }
  | { type: 'UPDATE_LIST'; payload: { id: string; updates: Partial<List> } }
  | { type: 'DELETE_LIST'; payload: string }
  | { type: 'ADD_ITEM'; payload: { listId: string; item: ListItem } }
  | { type: 'UPDATE_ITEM'; payload: { listId: string; itemId: string; updates: Partial<ListItem> } }
  | { type: 'DELETE_ITEM'; payload: { listId: string; itemId: string } }
  | { type: 'REORDER_ITEMS'; payload: { listId: string; items: ListItem[] } }
  | { type: 'SET_ACTIVE_LIST'; payload: string | null }
  | { type: 'SET_KANBAN_COLUMNS'; payload: { listId: string; columns: KanbanColumn[] } }
  | { type: 'UPDATE_TAGS'; payload: TagMetadata[] }
  | { type: 'LOAD_DATA'; payload: AppData };

function listsReducer(state: ListsState, action: ListsAction): ListsState {
  switch (action.type) {
    case 'LOAD_DATA':
      return {
        lists: action.payload.lists,
        kanbanColumns: action.payload.kanbanColumns,
        tags: action.payload.tags,
        activeListId: action.payload.preferences.lastActiveListId,
      };

    case 'SET_LISTS':
      return { ...state, lists: action.payload };

    case 'ADD_LIST':
      return {
        ...state,
        lists: [...state.lists, action.payload],
        activeListId: action.payload.id,
      };

    case 'UPDATE_LIST':
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.payload.id
            ? { ...list, ...action.payload.updates, updatedAt: Date.now() }
            : list
        ),
      };

    case 'DELETE_LIST':
      const newLists = state.lists.filter((list) => list.id !== action.payload);
      return {
        ...state,
        lists: newLists,
        activeListId: state.activeListId === action.payload
          ? (newLists[0]?.id || null)
          : state.activeListId,
      };

    case 'ADD_ITEM':
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.payload.listId
            ? {
                ...list,
                items: [...list.items, action.payload.item],
                updatedAt: Date.now(),
              }
            : list
        ),
      };

    case 'UPDATE_ITEM':
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.payload.listId
            ? {
                ...list,
                items: list.items.map((item) =>
                  item.id === action.payload.itemId
                    ? { ...item, ...action.payload.updates }
                    : item
                ),
                updatedAt: Date.now(),
              }
            : list
        ),
      };

    case 'DELETE_ITEM':
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.payload.listId
            ? {
                ...list,
                items: list.items.filter((item) => item.id !== action.payload.itemId),
                updatedAt: Date.now(),
              }
            : list
        ),
      };

    case 'REORDER_ITEMS':
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.payload.listId
            ? {
                ...list,
                items: action.payload.items,
                updatedAt: Date.now(),
              }
            : list
        ),
      };

    case 'SET_ACTIVE_LIST':
      return { ...state, activeListId: action.payload };

    case 'SET_KANBAN_COLUMNS':
      return {
        ...state,
        kanbanColumns: {
          ...state.kanbanColumns,
          [action.payload.listId]: action.payload.columns,
        },
      };

    case 'UPDATE_TAGS':
      return {
        ...state,
        tags: action.payload,
      };

    default:
      return state;
  }
}

interface ListsContextType {
  state: ListsState;
  addList: (list: List) => void;
  updateList: (id: string, updates: Partial<List>) => void;
  deleteList: (id: string) => void;
  addItem: (listId: string, item: ListItem) => void;
  updateItem: (listId: string, itemId: string, updates: Partial<ListItem>) => void;
  deleteItem: (listId: string, itemId: string) => void;
  reorderItems: (listId: string, items: ListItem[]) => void;
  setActiveList: (id: string | null) => void;
  setKanbanColumns: (listId: string, columns: KanbanColumn[]) => void;
  syncTags: () => void;
  getAllTags: () => string[];
  getActiveList: () => List | null;
}

const ListsContext = createContext<ListsContextType | undefined>(undefined);

export function ListsProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(listsReducer, {
    lists: [],
    kanbanColumns: {},
    tags: [],
    activeListId: null,
  });

  // Load data on mount
  useEffect(() => {
    const data = storage.load();
    dispatch({ type: 'LOAD_DATA', payload: data });
  }, []);

  // Auto-save to localStorage with debouncing
  useDebouncedSave(
    state,
    (currentState) => {
      const data: AppData = {
        lists: currentState.lists,
        kanbanColumns: currentState.kanbanColumns,
        tags: currentState.tags,
        preferences: {
          themeId: 'ocean', // This will be managed by ThemeContext
          lastActiveListId: currentState.activeListId,
        },
        version: '2.0',
      };
      storage.save(data);
    },
    500
  );

  const addList = (list: List) => dispatch({ type: 'ADD_LIST', payload: list });
  const updateList = (id: string, updates: Partial<List>) =>
    dispatch({ type: 'UPDATE_LIST', payload: { id, updates } });
  const deleteList = (id: string) => dispatch({ type: 'DELETE_LIST', payload: id });
  const addItem = (listId: string, item: ListItem) =>
    dispatch({ type: 'ADD_ITEM', payload: { listId, item } });
  const updateItem = (listId: string, itemId: string, updates: Partial<ListItem>) =>
    dispatch({ type: 'UPDATE_ITEM', payload: { listId, itemId, updates } });
  const deleteItem = (listId: string, itemId: string) =>
    dispatch({ type: 'DELETE_ITEM', payload: { listId, itemId } });
  const reorderItems = (listId: string, items: ListItem[]) =>
    dispatch({ type: 'REORDER_ITEMS', payload: { listId, items } });
  const setActiveList = (id: string | null) =>
    dispatch({ type: 'SET_ACTIVE_LIST', payload: id });
  const setKanbanColumns = (listId: string, columns: KanbanColumn[]) =>
    dispatch({ type: 'SET_KANBAN_COLUMNS', payload: { listId, columns } });

  // Sync tags from lists - update tag metadata
  const syncTags = () => {
    const tagCounts: Record<string, number> = {};

    // Count tag usage across all lists
    state.lists.forEach((list) => {
      list.tags.forEach((tag) => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    // Update tag metadata
    const newTags: TagMetadata[] = Object.entries(tagCounts).map(([name, count]) => {
      const existingTag = state.tags.find((t) => t.name === name);
      return {
        name,
        color: existingTag?.color || getTagColor(name),
        count,
        createdAt: existingTag?.createdAt || Date.now(),
      };
    });

    dispatch({ type: 'UPDATE_TAGS', payload: newTags });
  };

  // Get all unique tags from all lists
  const getAllTags = (): string[] => {
    return state.tags.map((t) => t.name);
  };

  const getActiveList = (): List | null => {
    if (!state.activeListId) return null;
    return state.lists.find((list) => list.id === state.activeListId) || null;
  };

  return (
    <ListsContext.Provider
      value={{
        state,
        addList,
        updateList,
        deleteList,
        addItem,
        updateItem,
        deleteItem,
        reorderItems,
        setActiveList,
        setKanbanColumns,
        syncTags,
        getAllTags,
        getActiveList,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
}

export function useLists() {
  const context = useContext(ListsContext);
  if (context === undefined) {
    throw new Error('useLists must be used within a ListsProvider');
  }
  return context;
}
