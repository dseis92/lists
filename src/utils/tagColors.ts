const TAG_COLORS = [
  '#EF4444', // red
  '#F97316', // orange
  '#F59E0B', // amber
  '#84CC16', // lime
  '#10B981', // emerald
  '#14B8A6', // teal
  '#06B6D4', // cyan
  '#3B82F6', // blue
  '#6366F1', // indigo
  '#8B5CF6', // violet
  '#A855F7', // purple
  '#D946EF', // fuchsia
  '#EC4899', // pink
  '#F43F5E', // rose
];

/**
 * Generates a consistent color for a tag name using a simple hash function
 */
export function getTagColor(tagName: string): string {
  let hash = 0;
  for (let i = 0; i < tagName.length; i++) {
    hash = tagName.charCodeAt(i) + ((hash << 5) - hash);
  }
  return TAG_COLORS[Math.abs(hash) % TAG_COLORS.length];
}

/**
 * Gets a lighter version of the tag color for backgrounds
 */
export function getTagBackgroundColor(tagColor: string): string {
  // Convert hex to RGB, then to a lighter version (opacity)
  return `${tagColor}20`; // 20 is ~12% opacity in hex
}

/**
 * Gets a darker version of the tag color for text
 */
export function getTagTextColor(tagColor: string): string {
  return tagColor;
}

export { TAG_COLORS };
