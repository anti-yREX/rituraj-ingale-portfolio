import React, { useEffect, useRef } from 'react';

interface Mass {
  x: number;
  y: number;
  w: number;
  h: number;
  cols: number;
  rows: number;
}

// Stacked, offset volumes — drawn top to bottom. Units are SVG user units.
const MASSES: Mass[] = [
  { x: 130, y: 60, w: 190, h: 80, cols: 5, rows: 2 },
  { x: 30, y: 140, w: 270, h: 120, cols: 8, rows: 3 },
  { x: 110, y: 260, w: 300, h: 110, cols: 9, rows: 3 },
  { x: 60, y: 450, w: 330, h: 60, cols: 9, rows: 1 },
];

const PIERS = ['118,370 162,370 152,450 138,450', '328,370 372,370 356,450 342,450'];
const LEVELS = [
  { y: 60, label: 'ROOF' },
  { y: 140, label: 'L04' },
  { y: 260, label: 'L03' },
  { y: 370, label: 'L02' },
  { y: 450, label: 'L01' },
  { y: 510, label: '±0.00' },
];

const PAD_X = 14;
const PAD_TOP = 16;
const PAD_BOTTOM = 14;
const GAP = 6;
const FLICKER_MS = 900;

const windowsFor = (mass: Mass, massIndex: number) => {
  const cellW = (mass.w - PAD_X * 2 - GAP * (mass.cols - 1)) / mass.cols;
  const cellH = (mass.h - PAD_TOP - PAD_BOTTOM - GAP * (mass.rows - 1)) / mass.rows;
  const cells = [];
  for (let row = 0; row < mass.rows; row += 1) {
    for (let col = 0; col < mass.cols; col += 1) {
      const seed = massIndex * 31 + row * 13 + col * 7;
      cells.push({
        key: `${massIndex}-${row}-${col}`,
        x: mass.x + PAD_X + col * (cellW + GAP),
        y: mass.y + PAD_TOP + row * (cellH + GAP),
        w: cellW,
        h: cellH,
        lit: seed % 9 === 2 || seed % 14 === 5,
      });
    }
  }
  return cells;
};

const boardLines = (mass: Mass) => {
  const lines = [];
  for (let y = mass.y + 8; y < mass.y + mass.h; y += 8) lines.push(y);
  return lines;
};

/**
 * Hero drawing: a brutalist elevation whose windows switch on and off.
 * Hovering a window lights it; lights linger and fade after the pointer leaves.
 */
const Elevation: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const windows = svg.querySelectorAll('.elev__win');
    const interval = window.setInterval(() => {
      if (document.hidden) return;
      windows[Math.floor(Math.random() * windows.length)].classList.toggle('is-lit');
    }, FLICKER_MS);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 500 560"
      role="img"
      aria-label="Elevation drawing of a stacked concrete building with lit windows"
    >
      <defs>
        <clipPath id="elev-mass-clip">
          {MASSES.map(mass => (
            <rect key={mass.y} x={mass.x} y={mass.y} width={mass.w} height={mass.h} />
          ))}
          {PIERS.map(points => <polygon key={points} points={points} />)}
        </clipPath>
      </defs>

      {/* Distant tower */}
      <rect className="elev__mass elev__mass--far" x={318} y={96} width={66} height={164} />

      {/* Recessed core and angled piers */}
      <rect className="elev__recess" x={162} y={370} width={166} height={80} />
      {PIERS.map(points => <polygon key={points} className="elev__mass" points={points} />)}

      {MASSES.map((mass, massIndex) => (
        <g key={mass.y}>
          <rect className="elev__mass" x={mass.x} y={mass.y} width={mass.w} height={mass.h} />
          {boardLines(mass).map(y => (
            <line key={y} className="elev__boards" x1={mass.x} x2={mass.x + mass.w} y1={y} y2={y} />
          ))}
          {windowsFor(mass, massIndex).map(cell => (
            <rect
              key={cell.key}
              className={`elev__win${cell.lit ? ' is-lit' : ''}`}
              x={cell.x}
              y={cell.y}
              width={cell.w}
              height={cell.h}
            />
          ))}
        </g>
      ))}

      {/* Shadows cast by each overhang onto the mass below */}
      <g clipPath="url(#elev-mass-clip)" pointerEvents="none">
        <rect className="elev__cast" x={130} y={140} width={190} height={9} />
        <rect className="elev__cast" x={30} y={260} width={270} height={11} />
        <rect className="elev__cast" x={110} y={370} width={300} height={16} />
        <rect className="elev__cast" x={110} y={450} width={300} height={6} />
      </g>

      <line className="elev__ground" x1={10} x2={430} y1={512} y2={512} />

      {/* Level datum */}
      <path className="elev__dim" d={`M440 60 V510 ${LEVELS.map(l => `M434 ${l.y} H446`).join(' ')}`} />
      {LEVELS.map(level => (
        <text key={level.label} className="elev__text" x={451} y={level.y + 3}>{level.label}</text>
      ))}
      <path className="elev__dim" d="M30 532 H410 M30 526 V538 M410 526 V538" />
      <text className="elev__text" x={220} y={550} textAnchor="middle">38.00</text>
    </svg>
  );
};

export default Elevation;
