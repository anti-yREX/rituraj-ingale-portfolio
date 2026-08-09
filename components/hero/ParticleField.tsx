
import React, { useEffect, useRef } from 'react';
import { useParticleField } from '../../hooks/useParticleField';
import { useMousePosition } from '../../hooks/useMousePosition';

const ParticleField: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { init, update, draw } = useParticleField();
  const mouseRef = useMousePosition();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reduceMotion = reduceMotionQuery.matches;
    const handleMotionChange = () => {
      reduceMotion = reduceMotionQuery.matches;
    };
    reduceMotionQuery.addEventListener('change', handleMotionChange);

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      width = rect?.width ?? window.innerWidth;
      height = rect?.height ?? window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      init(width, height);
    };

    resize();
    window.addEventListener('resize', resize);

    let frameId: number;
    const loop = (time: number) => {
      if (!document.hidden) {
        const rect = canvas.getBoundingClientRect();
        const mouse = mouseRef.current;
        const localMouse = {
          x: mouse.x - rect.left,
          y: mouse.y - rect.top,
          active: mouse.active,
        };
        update(width, height, localMouse, reduceMotion);
        draw(ctx, width, height, time, reduceMotion);
      }
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      reduceMotionQuery.removeEventListener('change', handleMotionChange);
    };
  }, [init, update, draw, mouseRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
    />
  );
};

export default ParticleField;
