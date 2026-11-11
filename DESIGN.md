# BÉTON — Design System

A brutalist / industrial design system for the portfolio of Rituraj Ingale (yREX).

The reference is raw concrete architecture: board-formed walls, stacked and cantilevered
volumes, deep window grids, weathered industrial yards, and the warm light that shows
through the glazing at dusk. The site is treated as a **building and its drawing set** —
the page is poured concrete, sections are sheets, skills are floors, links are doors.

Implementation lives in [`styles/brutal.css`](styles/brutal.css). Tokens are CSS custom
properties on `:root`; the few values needed in canvas code are mirrored in
[`constants/theme.ts`](constants/theme.ts).

---

## 1. Principles

1. **Material honesty.** Nothing is disguised. Structure (grid lines, borders, seams,
   section numbers) stays visible. No gradients for decoration, no glass, no glow, no blur.
2. **Mass over ornament.** Hierarchy comes from size, weight and solid blocks of tone —
   not from colour or effects. If something matters, make it heavier.
3. **Hard edges.** Every corner is 90°. `border-radius` is always `0`.
4. **Cast shadows only.** Depth is a solid, offset slab of shadow, as thrown by a
   cantilever in low sun. Shadows are never blurred.
5. **One light source.** The palette is grey. The single warm accent (sodium) is *light
   inside the building*: it marks what is switched on — the active, hovered, or primary thing.
6. **Drawing-set language.** Labels read like annotations on an engineering drawing:
   section numbers, level markers, figure captions, a title block.

---

## 2. Colour

### Concrete (neutrals)

Warm greys, named by how much light the face receives.

| Token | Hex | Use |
| --- | --- | --- |
| `--concrete-50` | `#e4e1da` | Sunlit face. Text on dark, figure backgrounds |
| `--concrete-100` | `#d6d3cb` | Cast pieces: nav, plates, door panels |
| `--concrete-200` | `#c2bfb6` | **Base ground** — the page |
| `--concrete-300` | `#a8a59c` | Shaded face. Drawing masses, secondary text on dark |
| `--concrete-400` | `#8b8880` | Far masses, tertiary labels on dark |
| `--concrete-500` | `#6d6b65` | Hairlines on dark, decorative only on light |
| `--concrete-700` | `#3f3e3a` | Secondary text on light |
| `--ink` | `#161614` | Text, borders, shadows, window recesses |
| `--void` | `#0e0e0d` | Dark sections (night / deep recess) |

### Accents

| Token | Hex | Use |
| --- | --- | --- |
| `--sodium` | `#ffa01f` | Interior light. Lit windows, hover fills, primary action, hazard stripes |
| `--sodium-deep` | `#e07a00` | Pressed / secondary sodium (canvas only) |
| `--rust` | `#8f3410` | Oxidised steel. Reserved; rare emphasis on light surfaces |

### Rules

- Sodium is a **fill**, with `--ink` text on top. Never use sodium as text on concrete
  (contrast fails); sodium text is allowed on `--void` only.
- Body text is `--ink` on concrete or `--concrete-100` on void. Secondary text is
  `--concrete-700` on light, `--concrete-300` on dark.
- At most one sodium element should be "on" per viewport at rest. Hover adds more.
- Sections alternate **day** (concrete) and **night** (void). Do not introduce other
  background colours.

---

## 3. Typography

| Role | Family | Weights | Notes |
| --- | --- | --- | --- |
| Display | **Big Shoulders Display** | 800, 900 | Condensed industrial grotesque. Always uppercase |
| Body | **Archivo** | 400, 500, 600 | Running text |
| Annotation | **IBM Plex Mono** | 500, 600 | Labels, data, captions. Uppercase, tracked |

Fonts are self-hosted through `@fontsource/*` (imported in `index.tsx`).

### Scale

| Token | Size | Use |
| --- | --- | --- |
| hero name | `clamp(4.25rem, 30cqi, 19rem)` | Sized to its column with container units |
| `--text-h2` | `clamp(3rem, 1.5rem + 7vw, 7.5rem)` | Section titles |
| `--text-h3` | `clamp(1.75rem, 1.3rem + 1.6vw, 2.5rem)` | Slab titles |
| `--text-lead` | `clamp(1.25rem, 1rem + 1.2vw, 1.75rem)` | Statements, taglines |
| `--text-body` | `1.0625rem` | Default |
| `--text-small` | `0.875rem` | Mono data values |
| `--text-label` | `0.72rem` | Mono annotations |

### Rules

- Display: `line-height: 0.8–0.95`, weight 900 for names/titles, 800 for sub-heads.
  Lines should stack tight like poured lifts of concrete.
- Annotation (`.label`): uppercase, `letter-spacing: 0.14em`, weight 500.
- Body copy stays sentence case. Max measure ~40ch for lead text, ~34ch for descriptions.
- No italics. No centred text — everything hangs off the left edge or a grid line.

---

## 4. Structure

| Token | Value | Use |
| --- | --- | --- |
| `--line` | `3px` | Structural borders — anything load-bearing |
| `--line-thin` | `1px` | Internal divisions (table rules, cell dividers) |
| `--gutter` | `clamp(16px, 4vw, 48px)` | Page side padding |
| `--section-y` | `clamp(72px, 10vw, 144px)` | Vertical section padding |
| `--max` | `1440px` | Content max width (`.wrap`) |
| `--nav-h` | `56px` | Nav height / scroll offset |

- Spacing follows a 4px base; prefer 8 / 12 / 16 / 24 / 32 / 48 / 72.
- Layouts are asymmetric 12-column splits (7/5, 7/4). Avoid centred, symmetric compositions.
- Adjacent blocks share borders (butt joints) rather than floating with gaps.
- Breakpoints: `760px` (nav links, wider rows) and `960px` (two-column layouts, cantilevers).

### Depth

| Token | Value | Use |
| --- | --- | --- |
| `--cast-sm` | `6px 6px 0 var(--ink)` | Small raised pieces |
| `--cast-md` | `12px 12px 0 var(--ink)` | Plates, figures, door stacks |
| `--cast-light` | `12px 12px 0 var(--sodium)` | Objects floating over void (modal) |

Recesses use a hard inset: `inset 5px 5px 0 rgba(0,0,0,.55)`.

---

## 5. Surfaces

| Class | What it is |
| --- | --- |
| `.concrete` | Poured wall: grain + vertical weathering streaks + formwork panel seams (320×200) + tie holes |
| `.concrete-plain` | Precast piece: grain only on `--concrete-100` |
| `.void` | Night / recess: grain on `--void`, light text |
| `.hazard` | 45° sodium/ink safety stripe. Thin strips only (12–14px), never behind text |

Textures are inline SVG `feTurbulence` data URIs (`--tex-grain`, `--tex-streak`) — no image
files. Add `.on-dark` to dark containers so focus rings switch to sodium.

---

## 6. Components

**Nav (`.nav`)** — Sticky precast lintel, 3px bottom border. Cells are divided by 1px
rules and invert to ink on hover. The primary action (`.nav__play`) is a solid sodium block.

**Tag (`.tag`, `.tag--light`)** — Stencilled label: ink block with light mono text, or
sodium block with ink text.

**Section head (`.sec-head`)** — Ink numeral block + display title + right-aligned
annotation, sitting on a 3px rule. Numerals run `01, 02, 03`; the annotation uses
`Sec. NN / Name`.

**Elevation (`components/hero/Elevation.tsx`)** — The signature piece: an SVG elevation
of stacked, offset volumes with a window grid, level datum and dimension line. Windows
switch on and off slowly; hovering lights a window instantly and it fades over 1.8s.

**Spec bar (`.specs`)** — Full-width row of cells: mono label over display value.

**Ticker (`.ticker`)** — Void conveyor of display-type items separated by sodium squares.
Pauses on hover.

**Plate (`.plate`)** — Bordered data table with an ink header strip and a cast shadow.
Mono label column, mono value column.

**Slab (`.slab`)** — A floor of the building: level marker (`L04`…`L01`), title +
description, and a facade of windows. On desktop, slabs butt together and overhang
alternately to form a cantilevered stack.

**Window (`.window`)** — Ink recess with a hard inset shadow and mono caption. Lights
sodium on hover and fades back over 900ms.

**Door (`.door`)** — Full-width link row: index, giant display label, mono value, ink
arrow block. On hover the row fills sodium and the label shunts right.

**Title block (`.titleblock`)** — Footer as the corner block of a drawing: hazard strip,
then ruled cells of label/value pairs.

**Bay (`.bay`)** — Modal. Opaque ink scrim (no blur), precast frame with hazard strip
and sodium cast shadow.

---

## 7. Motion

| Token | Value | Use |
| --- | --- | --- |
| `--dur-snap` | `120ms` linear | Colour inversions on hover |
| `--dur-slab` | `480ms` | Movement of mass: reveals, shunts |
| `--ease-slab` | `cubic-bezier(0.2, 0, 0, 1)` | Fast start, dead stop |

- Things move like heavy objects: quickly, in straight lines, and they stop without bounce.
- **Light is the exception**: it switches on instantly and decays slowly (0.9–1.8s linear).
- Scroll reveals (`.reveal` → `.is-visible`) lift 40px once and never replay.
- No parallax, no easing overshoot, no looping decoration besides the ticker and cursor.
- `prefers-reduced-motion: reduce` disables reveals, the ticker, the cursor blink and the
  window flicker.

---

## 8. Interaction & accessibility

- Hover and focus share one pattern: **invert** (ink ↔ light) or **light up** (sodium).
- Focus ring: `3px solid` ink on light surfaces, sodium inside `.on-dark`; 3px offset.
- Text selection is sodium on ink.
- Decorative annotations (section numerals, level markers, door indices, ticker) are
  `aria-hidden`; real headings carry the meaning.
- Minimum hit target 40px; nav cells are full-height.

---

## 9. Voice

Short, declarative, technical. Labels borrow from drawing sets — `Sec.`, `Fig.`, `L01`,
`Rev.`, `Sheet`. Section titles are single plain words (About, Stack, Contact); the
architectural metaphor lives in the annotations, never at the cost of clarity.

## 10. Don't

- Round a corner, blur a shadow, or add a gradient fill.
- Add a second accent hue, or use sodium for large background areas.
- Centre-align layouts or float cards with soft gaps.
- Put body text over the hazard stripe.
