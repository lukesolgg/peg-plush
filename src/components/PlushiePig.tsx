"use client";

/**
 * Hand-drawn SVG of the $PEG plushie — kawaii fluffy blue pig with the
 * dollar-circle mark on its forehead, cloud-soft fluff edges and a fabric tag.
 * Fluff is built from rings of circles sharing userSpaceOnUse gradients so the
 * scalloped edges read as one continuous plush surface.
 */

const HEAD_CX = 210;
const HEAD_CY = 172;
const HEAD_R = 100;
const BODY_CX = 210;
const BODY_CY = 330;

/** Ring of fluff bumps around the head. */
const headFluff = Array.from({ length: 16 }, (_, i) => {
  const angle = (i / 16) * Math.PI * 2;
  return {
    cx: +(HEAD_CX + Math.cos(angle) * (HEAD_R - 4)).toFixed(1),
    cy: +(HEAD_CY + Math.sin(angle) * (HEAD_R - 8) * 0.96).toFixed(1),
    r: i % 2 === 0 ? 21 : 16,
  };
});

/** Fluff bumps along the body's lower edge. */
const bodyFluff = Array.from({ length: 9 }, (_, i) => {
  const angle = Math.PI * (0.1 + (i / 8) * 0.8);
  return {
    cx: +(BODY_CX + Math.cos(angle) * 88).toFixed(1),
    cy: +(BODY_CY + Math.sin(angle) * 56).toFixed(1),
    r: i % 2 === 0 ? 17 : 13,
  };
});

const SPARKLES = [
  { x: 70, y: 90, s: 1, o: 0.9 },
  { x: 352, y: 70, s: 0.7, o: 0.7 },
  { x: 372, y: 200, s: 0.55, o: 0.6 },
  { x: 48, y: 230, s: 0.6, o: 0.55 },
];

export function PlushiePig({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 420 460"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="$PEG plushie pig"
    >
      <defs>
        {/* userSpaceOnUse so every fluff bump samples the same gradient — seamless plush */}
        <radialGradient
          id="plushHead"
          gradientUnits="userSpaceOnUse"
          cx={HEAD_CX - 35}
          cy={HEAD_CY - 55}
          r={HEAD_R * 2}
        >
          <stop offset="0%" stopColor="#e8f1ff" />
          <stop offset="45%" stopColor="#bcd7fa" />
          <stop offset="100%" stopColor="#8db3e8" />
        </radialGradient>
        <radialGradient
          id="plushBody2"
          gradientUnits="userSpaceOnUse"
          cx={BODY_CX - 30}
          cy={BODY_CY - 45}
          r="190"
        >
          <stop offset="0%" stopColor="#dcebff" />
          <stop offset="50%" stopColor="#b3d1f7" />
          <stop offset="100%" stopColor="#86ade4" />
        </radialGradient>
        <radialGradient id="plushBelly2" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#f2f8ff" />
          <stop offset="100%" stopColor="#c8ddf8" />
        </radialGradient>
        <radialGradient id="plushSnout2" cx="42%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#ffd3df" />
          <stop offset="100%" stopColor="#f49ab2" />
        </radialGradient>
        <radialGradient id="earInner2" cx="50%" cy="40%" r="70%">
          <stop offset="0%" stopColor="#fbc2d2" />
          <stop offset="100%" stopColor="#ef9cb4" />
        </radialGradient>
        <linearGradient id="tagGrad2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a5fc7" />
          <stop offset="100%" stopColor="#143578" />
        </linearGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="210" cy="432" rx="120" ry="18" fill="#041029" opacity="0.45" />

      {/* sparkles */}
      {SPARKLES.map((sp, i) => (
        <g key={i} transform={`translate(${sp.x} ${sp.y}) scale(${sp.s})`} opacity={sp.o}>
          <path
            d="M0 -14 Q2.5 -2.5 14 0 Q2.5 2.5 0 14 Q-2.5 2.5 -14 0 Q-2.5 -2.5 0 -14"
            fill="#cfe2ff"
          />
        </g>
      ))}

      {/* ══ body (small & round under the big head — kawaii proportions) ══ */}
      {/* feet nubs */}
      <ellipse cx="148" cy="394" rx="30" ry="22" fill="url(#plushBody2)" />
      <ellipse cx="272" cy="394" rx="30" ry="22" fill="url(#plushBody2)" />
      <ellipse cx="148" cy="402" rx="16" ry="9" fill="#fbc2d2" opacity="0.9" />
      <ellipse cx="272" cy="402" rx="16" ry="9" fill="#fbc2d2" opacity="0.9" />

      {/* curly tail */}
      <path
        d="M298 340 q32 -4 25 -25 q-5 -16 -22 -11"
        fill="none"
        stroke="#9bbded"
        strokeWidth="10"
        strokeLinecap="round"
      />

      {/* fluffy body */}
      {bodyFluff.map((b, i) => (
        <circle key={i} cx={b.cx} cy={b.cy} r={b.r} fill="url(#plushBody2)" />
      ))}
      <ellipse cx={BODY_CX} cy={BODY_CY} rx="92" ry="62" fill="url(#plushBody2)" />

      {/* stubby arms hugging the belly */}
      <ellipse cx="122" cy="322" rx="26" ry="36" fill="url(#plushBody2)" transform="rotate(22 122 322)" />
      <ellipse cx="298" cy="322" rx="26" ry="36" fill="url(#plushBody2)" transform="rotate(-22 298 322)" />

      {/* belly patch */}
      <ellipse cx={BODY_CX} cy={BODY_CY + 14} rx="58" ry="40" fill="url(#plushBelly2)" />
      <ellipse
        cx={BODY_CX}
        cy={BODY_CY + 14}
        rx="58"
        ry="40"
        fill="none"
        stroke="#8fb1de"
        strokeWidth="2"
        strokeDasharray="6 7"
        opacity="0.7"
      />

      {/* ══ ears (soft floppy triangles, peeking over the fluff) ══ */}
      <path d="M122 102 Q94 30 162 56 Q184 66 176 104 Z" fill="url(#plushHead)" />
      <path d="M132 94 Q116 48 158 66 Q170 73 165 96 Z" fill="url(#earInner2)" />
      <path d="M298 102 Q326 30 258 56 Q236 66 244 104 Z" fill="url(#plushHead)" />
      <path d="M288 94 Q304 48 262 66 Q250 73 255 96 Z" fill="url(#earInner2)" />

      {/* ══ big fluffy head ══ */}
      {headFluff.map((b, i) => (
        <circle key={i} cx={b.cx} cy={b.cy} r={b.r} fill="url(#plushHead)" />
      ))}
      <circle cx={HEAD_CX} cy={HEAD_CY} r={HEAD_R} fill="url(#plushHead)" />

      {/* top-of-head fluff tuft */}
      <circle cx="192" cy="62" r="13" fill="url(#plushHead)" />
      <circle cx="212" cy="54" r="15" fill="url(#plushHead)" />
      <circle cx="232" cy="64" r="12" fill="url(#plushHead)" />

      {/* forehead dollar-circle mark */}
      <circle cx="210" cy="118" r="19" fill="none" stroke="#ffffff" strokeWidth="4.5" opacity="0.95" />
      <text
        x="210"
        y="126"
        textAnchor="middle"
        fontSize="24"
        fontWeight="700"
        fill="#ffffff"
        fontFamily="var(--font-baloo), sans-serif"
      >
        $
      </text>

      {/* ══ face — big glossy kawaii eyes ══ */}
      <circle cx="162" cy="182" r="20" fill="#0c1530" />
      <circle cx="169" cy="174" r="7.5" fill="#ffffff" />
      <circle cx="156" cy="190" r="3.5" fill="#ffffff" opacity="0.85" />
      <circle cx="258" cy="182" r="20" fill="#0c1530" />
      <circle cx="265" cy="174" r="7.5" fill="#ffffff" />
      <circle cx="252" cy="190" r="3.5" fill="#ffffff" opacity="0.85" />

      {/* happy closed-eye sparkle brows */}
      <path d="M138 156 q22 -14 44 -2" fill="none" stroke="#9bbded" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
      <path d="M238 154 q22 -12 44 4" fill="none" stroke="#9bbded" strokeWidth="4" strokeLinecap="round" opacity="0.6" />

      {/* blush */}
      <ellipse cx="132" cy="214" rx="17" ry="10" fill="#f9a8c0" opacity="0.75" />
      <ellipse cx="288" cy="214" rx="17" ry="10" fill="#f9a8c0" opacity="0.75" />

      {/* tiny snout */}
      <ellipse cx="210" cy="216" rx="31" ry="21" fill="url(#plushSnout2)" />
      <ellipse cx="199" cy="216" rx="4.5" ry="7" fill="#d96e8d" />
      <ellipse cx="221" cy="216" rx="4.5" ry="7" fill="#d96e8d" />

      {/* tiny happy smile */}
      <path
        d="M192 246 Q210 260 228 246"
        fill="none"
        stroke="#54719f"
        strokeWidth="5.5"
        strokeLinecap="round"
      />

      {/* fabric tag on the body */}
      <g transform="rotate(14 306 316)">
        <rect x="300" y="304" width="44" height="24" rx="5" fill="url(#tagGrad2)" stroke="#8fc0ff" strokeWidth="1.5" />
        <text
          x="322"
          y="337"
          textAnchor="middle"
          fontSize="12"
          fontWeight="800"
          fill="#ffffff"
          fontFamily="var(--font-baloo), sans-serif"
        >
          $PEG
        </text>
      </g>
    </svg>
  );
}
