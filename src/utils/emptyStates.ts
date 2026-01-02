import { ListType } from '@/types/list.types';

export interface EmptyStateMessage {
  emoji: string;
  title: string;
  subtitle: string;
}

export const EMPTY_STATES: Record<ListType, EmptyStateMessage[]> = {
  todo: [
    { emoji: '✨', title: 'A blank canvas!', subtitle: 'Add your first task and let\'s get things done' },
    { emoji: '🎯', title: 'Ready to conquer today?', subtitle: 'Start by adding what\'s on your mind' },
    { emoji: '🚀', title: 'Your productivity journey starts here', subtitle: 'One task at a time!' },
    { emoji: '💪', title: 'Let\'s make it happen!', subtitle: 'Add a task to begin' },
  ],
  ordered: [
    { emoji: '📝', title: 'Start your list!', subtitle: 'Add items in the perfect order' },
    { emoji: '🔢', title: 'Numbered and ready', subtitle: 'What\'s first on your list?' },
    { emoji: '📋', title: 'Organize your thoughts', subtitle: 'Add your first ordered item' },
  ],
  bullet: [
    { emoji: '💡', title: 'Jot it down!', subtitle: 'Quick notes, big ideas' },
    { emoji: '📌', title: 'Your thought space', subtitle: 'Start adding bullet points' },
    { emoji: '✍️', title: 'Keep it simple', subtitle: 'Add your first note' },
  ],
  kanban: [
    { emoji: '📋', title: 'Let\'s organize your workflow!', subtitle: 'Add cards to track your progress' },
    { emoji: '🎨', title: 'Visualize your work', subtitle: 'Start adding tasks to each column' },
    { emoji: '⚡', title: 'Flow like a pro!', subtitle: 'Create your first card' },
  ],
  shopping: [
    { emoji: '🛒', title: 'Your cart is empty!', subtitle: 'Add items you need to pick up' },
    { emoji: '🥕', title: 'Time to stock up!', subtitle: 'What\'s on the grocery list today?' },
    { emoji: '🛍️', title: 'Let\'s go shopping!', subtitle: 'Add your first item' },
  ],
  habit: [
    { emoji: '🌱', title: 'Plant the seeds of change', subtitle: 'Add a habit you want to build' },
    { emoji: '💪', title: 'Stronger every day', subtitle: 'Track your first habit now!' },
    { emoji: '✨', title: 'Build your best self', subtitle: 'Start with one small habit' },
    { emoji: '🔥', title: 'Ready to build a streak?', subtitle: 'Add your first habit to track' },
  ],
  priority: [
    { emoji: '🎯', title: 'Prioritize like a pro!', subtitle: 'Drag tasks into the matrix to organize your work' },
    { emoji: '⚡', title: 'What matters most?', subtitle: 'Add tasks and categorize by urgency & importance' },
    { emoji: '🎪', title: 'Master your priorities', subtitle: 'Start adding tasks to the matrix' },
  ],
  timeline: [
    { emoji: '🚀', title: 'Your journey starts here', subtitle: 'Add your first milestone or event' },
    { emoji: '🗓️', title: 'Map your future!', subtitle: 'Create a timeline of what\'s ahead' },
    { emoji: '🌟', title: 'Plot your path', subtitle: 'Add milestones to visualize progress' },
  ],
  notes: [
    { emoji: '💭', title: 'Jot down your thoughts!', subtitle: 'Quick notes, big ideas, endless possibilities' },
    { emoji: '📝', title: 'Your creative space', subtitle: 'Start writing your first note' },
    { emoji: '✨', title: 'Ideas welcome here!', subtitle: 'Create your first note card' },
  ],
};

export function getEmptyStateMessage(listType: ListType): EmptyStateMessage {
  const messages = EMPTY_STATES[listType];
  // Return a random message from the array
  return messages[Math.floor(Math.random() * messages.length)];
}

export function getAllEmptyStates(listType: ListType): EmptyStateMessage[] {
  return EMPTY_STATES[listType];
}
