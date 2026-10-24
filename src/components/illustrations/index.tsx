import type { SVGProps } from "react";
import type { ScentId } from "@/content/site";

// Hand-drawn style line illustrations. They inherit color from `currentColor`.

type Props = SVGProps<SVGSVGElement>;

const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.25,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

export function Eucalyptus(props: Props) {
  // Pairs of round leaves along a gently curved stem
  const leaves = [
    { y: 214, r: 21, side: -1 },
    { y: 196, r: 20, side: 1 },
    { y: 164, r: 19, side: -1 },
    { y: 146, r: 18, side: 1 },
    { y: 116, r: 16, side: -1 },
    { y: 98, r: 15, side: 1 },
    { y: 72, r: 13, side: -1 },
    { y: 56, r: 12, side: 1 },
    { y: 36, r: 9, side: -1 },
  ];
  return (
    <svg viewBox="0 0 200 260" aria-hidden="true" {...props}>
      <g {...line}>
        <path d="M104 252 C 100 196, 106 128, 98 22" />
        {leaves.map(({ y, r, side }) => {
          const x = 102 + side * (r + 4);
          return (
            <g key={y}>
              <path d={`M${102 - (side * 1)} ${y + 2} L ${x - side * r * 0.7} ${y}`} />
              <ellipse cx={x} cy={y} rx={r} ry={r * 0.82} transform={`rotate(${side * -14} ${x} ${y})`} />
              <path d={`M${x - side * r * 0.7} ${y + 1} Q ${x} ${y - 2} ${x + side * r * 0.75} ${y - 3}`} opacity="0.55" />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

export function CitrusPeel(props: Props) {
  const segments = Array.from({ length: 10 }, (_, i) => (i / 10) * Math.PI * 2);
  return (
    <svg viewBox="0 0 220 240" aria-hidden="true" {...props}>
      <g {...line}>
        <circle cx="104" cy="104" r="78" />
        <circle cx="104" cy="104" r="68" />
        {segments.map((a, i) => {
          const a1 = a + 0.06;
          const a2 = a + (Math.PI * 2) / 10 - 0.06;
          const p = (ang: number, r: number) =>
            `${(104 + Math.cos(ang) * r).toFixed(1)} ${(104 + Math.sin(ang) * r).toFixed(1)}`;
          return (
            <path
              key={i}
              d={`M${p(a1, 9)} L ${p(a1, 62)} A 62 62 0 0 1 ${p(a2, 62)} L ${p(a2, 9)} Z`}
              opacity="0.8"
            />
          );
        })}
        <circle cx="104" cy="104" r="4" />
        {/* Curl of peel */}
        <path d="M168 168 C 196 176, 206 200, 190 216 C 176 230, 150 222, 156 206 C 160 196, 176 198, 176 208" />
        <path d="M176 160 C 206 166, 220 196, 202 222" opacity="0.6" />
      </g>
    </svg>
  );
}

export function Wave(props: Props) {
  const rows = [
    { y: 70, a: 9, o: 0.45 },
    { y: 102, a: 12, o: 0.7 },
    { y: 136, a: 15, o: 1 },
    { y: 172, a: 12, o: 0.8 },
    { y: 204, a: 9, o: 0.55 },
  ];
  return (
    <svg viewBox="0 0 240 260" aria-hidden="true" {...props}>
      <g {...line}>
        <circle cx="176" cy="34" r="14" opacity="0.6" />
        <path d="M12 52 H 228" opacity="0.35" />
        {rows.map(({ y, a, o }, i) => (
          <path
            key={y}
            opacity={o}
            d={`M${8 + (i % 2) * 14} ${y} q 18 ${-a} 36 0 t 36 0 t 36 0 t 36 0 t 36 0 t 36 0`}
          />
        ))}
      </g>
    </svg>
  );
}

/** Fir branch with a few snow dots — winter */
export function Pine(props: Props) {
  const needles = Array.from({ length: 11 }, (_, i) => 40 + i * 17);
  return (
    <svg viewBox="0 0 200 260" aria-hidden="true" {...props}>
      <g {...line}>
        <path d="M100 248 C 101 190, 99 120, 100 26" />
        {needles.map((y, i) => {
          const len = 18 + i * 4.2;
          return (
            <g key={y}>
              <path d={`M100 ${y} C ${100 - len * 0.5} ${y + 4}, ${100 - len * 0.85} ${y + 10}, ${100 - len} ${y + 18}`} />
              <path d={`M100 ${y} C ${100 + len * 0.5} ${y + 4}, ${100 + len * 0.85} ${y + 10}, ${100 + len} ${y + 18}`} />
            </g>
          );
        })}
        {[
          [44, 40],
          [160, 64],
          [36, 130],
          [172, 150],
          [56, 214],
          [150, 226],
        ].map(([cx, cy]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="2.5" opacity="0.6" />
        ))}
      </g>
    </svg>
  );
}

/** Fern frond — forest */
export function Fern(props: Props) {
  const leaflets = Array.from({ length: 12 }, (_, i) => i);
  return (
    <svg viewBox="0 0 200 260" aria-hidden="true" {...props}>
      <g {...line}>
        <path d="M70 250 C 80 190, 100 120, 150 28" />
        {leaflets.map((i) => {
          const t = i / 11;
          const x = 70 + (150 - 70) * t * t * 0.6 + t * 32;
          const y = 236 - t * 200;
          const len = 34 - i * 2.2;
          return (
            <g key={i}>
              <path d={`M${x} ${y} q ${-len * 0.6} ${-4} ${-len} ${-16}`} />
              <path d={`M${x} ${y} q ${len * 0.5} ${2} ${len} ${-10}`} />
            </g>
          );
        })}
      </g>
    </svg>
  );
}

/** Droplet with a dashed inner line — "your own note" */
export function CustomDrop(props: Props) {
  return (
    <svg viewBox="0 0 200 260" aria-hidden="true" {...props}>
      <g {...line}>
        <path d="M100 30 C 130 80, 160 118, 160 156 C 160 192, 133 220, 100 220 C 67 220, 40 192, 40 156 C 40 118, 70 80, 100 30 Z" />
        <path
          d="M100 62 C 122 98, 142 126, 142 156 C 142 182, 123 202, 100 202 C 77 202, 58 182, 58 156 C 58 126, 78 98, 100 62 Z"
          strokeDasharray="3 6"
          opacity="0.7"
        />
        <path d="M86 150 h 28 M100 136 v 28" opacity="0.8" />
      </g>
    </svg>
  );
}

const Garden = (props: Props) => <HerbSpecimen variant={0} {...props} />;
const Autumn = (props: Props) => <HerbSpecimen variant={1} {...props} />;
const Spring = (props: Props) => <HerbSpecimen variant={2} {...props} />;

export const scentIllustrations: Record<ScentId, (props: Props) => React.ReactElement> = {
  fresh: Eucalyptus,
  summer: CitrusPeel,
  winter: Pine,
  autumn: Autumn,
  spring: Spring,
  sea: Wave,
  garden: Garden,
  forest: Fern,
  custom: CustomDrop,
};

/** Rectangular linen pillow with a flat flange edge and stitch line. */
export function PillowArt(props: Props) {
  return (
    <svg viewBox="0 0 320 220" aria-hidden="true" {...props}>
      <g {...line}>
        <path d="M22 30 C 90 22, 230 22, 298 30 C 304 80, 304 140, 298 190 C 230 198, 90 198, 22 190 C 16 140, 16 80, 22 30 Z" />
        <path
          d="M40 46 C 100 40, 220 40, 280 46 C 285 90, 285 130, 280 174 C 220 180, 100 180, 40 174 C 35 130, 35 90, 40 46 Z"
          strokeDasharray="3 5"
        />
        <path d="M96 92 C 130 104, 190 104, 224 92" opacity="0.4" />
        <path d="M110 132 C 150 124, 180 126, 214 136" opacity="0.3" />
      </g>
    </svg>
  );
}

/** Flat front silhouette used on size cards, drawn to the given aspect ratio. */
export function PillowSilhouette({ ratio, ...props }: Props & { ratio: number }) {
  const w = 200;
  const h = Math.round(w / ratio);
  return (
    <svg viewBox={`-2 -2 ${w + 4} ${h + 4}`} aria-hidden="true" {...props}>
      <g {...line}>
        <rect x="0" y="0" width={w} height={h} rx="4" />
        <rect x="10" y="10" width={w - 20} height={h - 20} rx="2" strokeDasharray="2 4" opacity="0.7" />
      </g>
    </svg>
  );
}

/** Generic herbarium specimens used until real ingredient photos exist. */
export function HerbSpecimen({ variant, ...props }: Props & { variant: number }) {
  const v = variant % 3;
  return (
    <svg viewBox="0 0 160 200" aria-hidden="true" {...props}>
      <g {...line}>
        {v === 0 && (
          <>
            {/* Lavender-like stalk */}
            <path d="M80 190 C 80 140, 78 90, 82 24" />
            {Array.from({ length: 9 }, (_, i) => {
              const y = 30 + i * 9;
              return (
                <g key={i}>
                  <ellipse cx={74} cy={y} rx="5" ry="3.2" transform={`rotate(-30 74 ${y})`} />
                  <ellipse cx={88} cy={y + 4} rx="5" ry="3.2" transform={`rotate(30 88 ${y + 4})`} />
                </g>
              );
            })}
            <path d="M80 150 C 64 138, 52 140, 44 146" />
            <path d="M80 160 C 98 150, 110 152, 118 158" />
          </>
        )}
        {v === 1 && (
          <>
            {/* Broad leaf with veins */}
            <path d="M80 192 C 80 170, 80 150, 80 140" />
            <path d="M80 140 C 30 120, 30 50, 80 18 C 130 50, 130 120, 80 140 Z" />
            <path d="M80 140 L 80 28" opacity="0.7" />
            {[50, 72, 94, 116].map((y) => (
              <g key={y} opacity="0.55">
                <path d={`M80 ${y + 10} Q 64 ${y + 2} 54 ${y - 6}`} />
                <path d={`M80 ${y + 10} Q 96 ${y + 2} 106 ${y - 6}`} />
              </g>
            ))}
          </>
        )}
        {v === 2 && (
          <>
            {/* Chamomile-like flower */}
            <path d="M80 192 C 76 160, 84 120, 80 84" />
            <path d="M80 150 C 62 140, 50 128, 48 112 C 64 116, 76 128, 80 150" />
            <circle cx="80" cy="62" r="10" />
            {Array.from({ length: 12 }, (_, i) => {
              const a = (i / 12) * 360;
              return (
                <ellipse key={i} cx="80" cy="36" rx="5.5" ry="14" transform={`rotate(${a} 80 62)`} opacity="0.85" />
              );
            })}
          </>
        )}
      </g>
    </svg>
  );
}

export function EmptyBasket(props: Props) {
  return (
    <svg viewBox="0 0 160 120" aria-hidden="true" {...props}>
      <g {...line}>
        <path d="M24 52 H 136 L 124 104 C 123 108, 120 110, 116 110 H 44 C 40 110, 37 108, 36 104 Z" />
        <path d="M52 52 C 52 30, 64 16, 80 16 C 96 16, 108 30, 108 52" />
        <path d="M60 70 V 92 M 80 70 V 92 M 100 70 V 92" opacity="0.5" />
      </g>
    </svg>
  );
}
