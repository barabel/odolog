import { useEffect, useRef } from 'react';

/**
 * Вызывает handler при клике вне элемента, на который навешан возвращаемый ref.
 * Слушатель активен только при enabled === true.
 */
export const useOutsideClick = <T extends HTMLElement = HTMLElement>(
  handler: () => void,
  enabled = true,
) => {
  const ref = useRef<T>(null);
  const handlerRef = useRef(handler);
  handlerRef.current = handler;

  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handlerRef.current();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [enabled]);

  return ref;
};
