import { useState, useRef, KeyboardEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Tag } from 'lucide-react';
import { TagBadge } from './TagBadge';

interface TagInputProps {
  tags: string[];
  onChange: (tags: string[]) => void;
  suggestions?: string[];
  maxTags?: number;
  placeholder?: string;
}

export function TagInput({
  tags,
  onChange,
  suggestions = [],
  maxTags = 10,
  placeholder = 'Add tags...',
}: TagInputProps) {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredSuggestions = suggestions.filter(
    (s) => !tags.includes(s) && s.toLowerCase().includes(input.toLowerCase())
  );

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (trimmed && !tags.includes(trimmed) && tags.length < maxTags) {
      onChange([...tags, trimmed]);
      setInput('');
      setShowSuggestions(false);
    }
  };

  const removeTag = (tagToRemove: string) => {
    onChange(tags.filter((t) => t !== tagToRemove));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input);
    } else if (e.key === 'Backspace' && !input && tags.length > 0) {
      removeTag(tags[tags.length - 1]);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    addTag(suggestion);
    inputRef.current?.focus();
  };

  return (
    <div className="relative">
      <div className="flex flex-wrap items-center gap-2 p-3 bg-white border-2 border-[var(--color-primary)] rounded-lg focus-within:ring-2 focus-within:ring-[var(--color-accent)] transition-all">
        <Tag size={16} className="text-[var(--color-primary)] opacity-70" />

        <AnimatePresence mode="popLayout">
          {tags.map((tag) => (
            <TagBadge
              key={tag}
              tag={tag}
              size="sm"
              onRemove={() => removeTag(tag)}
            />
          ))}
        </AnimatePresence>

        {tags.length < maxTags && (
          <div className="flex-1 min-w-[120px]">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setShowSuggestions(e.target.value.length > 0);
              }}
              onKeyDown={handleKeyDown}
              onFocus={() => setShowSuggestions(input.length > 0)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder={tags.length === 0 ? placeholder : ''}
              className="w-full outline-none text-sm bg-transparent"
            />
          </div>
        )}

        {tags.length >= maxTags && (
          <span className="text-xs text-[var(--color-text)] opacity-50">
            Max tags reached
          </span>
        )}
      </div>

      {/* Autocomplete suggestions */}
      <AnimatePresence>
        {showSuggestions && filteredSuggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute z-10 w-full mt-2 bg-white border-2 border-[var(--color-primary)] rounded-lg shadow-lg max-h-40 overflow-y-auto"
          >
            {filteredSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => handleSuggestionClick(suggestion)}
                className="w-full px-4 py-2 text-left text-sm hover:bg-[var(--color-secondary)] transition-colors flex items-center gap-2"
              >
                <Plus size={14} className="opacity-50" />
                <span>{suggestion}</span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <p className="mt-1 text-xs text-[var(--color-text)] opacity-50">
        Press Enter or comma to add tags
      </p>
    </div>
  );
}
