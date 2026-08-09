
import React from 'react';

const GlassOrb: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center w-[220px] h-[220px] md:w-[320px] md:h-[320px]" aria-hidden="true">
      {/* Outer diffused aura */}
      <div
        className="absolute w-[160%] h-[160%] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(103,232,249,0.18), transparent 70%)',
          filter: 'blur(60px)',
        }}
      />

      {/* Orb body */}
      <div
        className="animate-orb-pulse absolute w-full h-full rounded-full border border-white/10 overflow-hidden"
        style={{
          background: 'radial-gradient(circle at 35% 30%, rgba(103,232,249,0.55), rgba(167,139,250,0.45) 45%, rgba(232,121,249,0.4) 80%)',
          boxShadow: '0 0 80px 20px rgba(34,211,238,0.2), inset 0 0 60px rgba(255,255,255,0.06)',
          backdropFilter: 'blur(2px)',
        }}
      >
        {/* Slow-rotating inner gradient for depth */}
        <div
          className="animate-orb-rotate absolute -inset-4"
          style={{
            background: 'conic-gradient(from 0deg, rgba(103,232,249,0.25), rgba(167,139,250,0.15), rgba(232,121,249,0.25), rgba(103,232,249,0.25))',
          }}
        />
      </div>

      {/* Glass highlight (fixed relative to viewer, sits above the rotating layer) */}
      <div
        className="absolute w-full h-full rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at 30% 25%, rgba(255,255,255,0.35), transparent 50%)',
        }}
      />
    </div>
  );
};

export default GlassOrb;
