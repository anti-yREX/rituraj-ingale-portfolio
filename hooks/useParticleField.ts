
import { useRef, useCallback } from 'react';
import { ACCENT_CYAN, ACCENT_MAGENTA, ACCENT_PURPLE } from '../constants/theme';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  baseOpacity: number;
  twinklePhase: number;
  twinkleSpeed: number;
}

const HUES = [ACCENT_CYAN, ACCENT_CYAN, ACCENT_CYAN, ACCENT_PURPLE, ACCENT_MAGENTA];
const MOUSE_INFLUENCE_RADIUS = 150;
const CONSTELLATION_RADIUS = 100;
const MAX_SPEED = 0.15;
const DAMPING = 0.98;

const randomHue = () => HUES[Math.floor(Math.random() * HUES.length)];

const hexToRgb = (hex: string): string => {
  const value = parseInt(hex.slice(1), 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `${r}, ${g}, ${b}`;
};

const COLOR_RGB = new Map<string, string>(HUES.map(hue => [hue, hexToRgb(hue)]));

export interface MouseState {
  x: number;
  y: number;
  active: boolean;
}

/**
 * Imperative particle-field simulation: a hook that owns the particle array in a
 * ref (no React state, so it never re-renders) and exposes init/update/draw
 * functions for a caller-driven requestAnimationFrame loop. Mirrors the
 * hook-owns-state / component-owns-canvas split used by useTetris + TetrisCanvas.
 */
export const useParticleField = () => {
  const particlesRef = useRef<Particle[]>([]);

  const init = useCallback((width: number, height: number) => {
    const count = Math.min(140, Math.max(40, Math.floor((width * height) / 9000)));
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      radius: 0.5 + Math.random() * 1.5,
      color: randomHue(),
      baseOpacity: 0.2 + Math.random() * 0.5,
      twinklePhase: Math.random() * Math.PI * 2,
      twinkleSpeed: 0.0005 + Math.random() * 0.001,
    }));
  }, []);

  const update = useCallback((width: number, height: number, mouse: MouseState, reduceMotion: boolean) => {
    const particles = particlesRef.current;
    for (const p of particles) {
      if (!reduceMotion) {
        // Ambient Brownian drift.
        if (Math.random() < 0.01) {
          p.vx += (Math.random() - 0.5) * 0.03;
          p.vy += (Math.random() - 0.5) * 0.03;
        }

        // Gentle repulsion away from the cursor, damped back to ambient drift.
        if (mouse.active) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 0 && dist < MOUSE_INFLUENCE_RADIUS) {
            const force = (1 - dist / MOUSE_INFLUENCE_RADIUS) * 0.6;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        p.vx *= DAMPING;
        p.vy *= DAMPING;

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > MAX_SPEED) {
          p.vx = (p.vx / speed) * MAX_SPEED;
          p.vy = (p.vy / speed) * MAX_SPEED;
        }

        p.x += p.vx;
        p.y += p.vy;
      }

      // Wrap around the edges so the field stays populated.
      if (p.x < -10) p.x = width + 10;
      if (p.x > width + 10) p.x = -10;
      if (p.y < -10) p.y = height + 10;
      if (p.y > height + 10) p.y = -10;
    }
  }, []);

  const draw = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number, time: number, reduceMotion: boolean) => {
    ctx.clearRect(0, 0, width, height);
    const particles = particlesRef.current;

    // Faint constellation lines between nearby particles.
    ctx.strokeStyle = `rgba(${COLOR_RGB.get(ACCENT_CYAN)}, 0.08)`;
    ctx.lineWidth = 1;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONSTELLATION_RADIUS) {
          ctx.globalAlpha = 1 - dist / CONSTELLATION_RADIUS;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;

    for (const p of particles) {
      const twinkle = reduceMotion ? 1 : 0.6 + 0.4 * Math.sin(time * p.twinkleSpeed + p.twinklePhase);
      const opacity = p.baseOpacity * twinkle;
      const rgb = COLOR_RGB.get(p.color) ?? COLOR_RGB.get(ACCENT_CYAN)!;
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 4);
      gradient.addColorStop(0, `rgba(${rgb}, ${opacity})`);
      gradient.addColorStop(1, `rgba(${rgb}, 0)`);
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius * 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }, []);

  return { init, update, draw };
};
