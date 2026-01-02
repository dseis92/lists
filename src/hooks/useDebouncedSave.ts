import { useEffect, useRef } from 'react';

export function useDebouncedSave<T>(value: T, onSave: (value: T) => void, delay: number = 500) {
  const firstRender = useRef(true);

  useEffect(() => {
    // Skip the first render to avoid saving initial value
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    const handler = setTimeout(() => {
      onSave(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, onSave, delay]);
}
