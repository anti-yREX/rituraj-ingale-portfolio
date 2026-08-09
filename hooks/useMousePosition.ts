
import { useEffect, useRef, type RefObject } from 'react';

export interface MousePositionRef {
  x: number;
  y: number;
  active: boolean;
}

/**
 * Tracks the latest window-relative mouse/pointer position in a ref (not state)
 * so consumers like rAF-driven canvas loops can read it every frame without
 * triggering a React re-render on every mousemove event.
 */
export const useMousePosition = (): RefObject<MousePositionRef> => {
  const positionRef = useRef<MousePositionRef>({ x: 0, y: 0, active: false });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      positionRef.current = { x: event.clientX, y: event.clientY, active: true };
    };
    const handlePointerLeave = () => {
      positionRef.current = { ...positionRef.current, active: false };
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return positionRef;
};
