"use client";

/**
 * Hand-drawn SVG of the $PEG plushie, modeled on the actual Peg mascot:
 * smooth periwinkle-blue pig, big front-facing pink snout, side-set ears with
 * pink inners, modest dark eyes, USDC dollar-circle on the forehead. Plushie
 * cues (seam stitching, fabric tag, soft sheen) keep it reading as a toy.
 */
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
        <radialGradient id="pegHead" cx="40%" cy="28%" r="85%">
          <stop offset="0%" stopColor="#c2d3f7" />
          <stop offset="45%" stopColor="#94aeea" />
          <stop offset="100%" stopColor="#6480cf" />
        </radialGradient>
        <radialGradient id="pegBody" cx="42%" cy="25%" r="90%">
          <stop offset="0%" stopColor="#aec3f2" />
          <stop offset="55%" stopColor="#83a0e2" />
          <stop offset="100%" stopColor="#5d79c8" />
        </radialGradient>
        <radialGradient id="pegBelly" cx="50%" cy="32%" r="75%">
          <stop offset="0%" stopColor="#d4e1fb" />
          <stop offset="100%" stopColor="#9db5ec" />
        </radialGradient>
        <radialGradient id="pegSnout" cx="42%" cy="25%" r="80%">
          <stop offset="0%" stopColor="#fbc7d4" />
          <stop offset="55%" stopColor="#f2a3b8" />
          <stop offset="100%" stopColor="#dd7f99" />
        </radialGradient>
        <radialGradient id="pegEarInner" cx="50%" cy="40%" r="75%">
          <stop offset="0%" stopColor="#f6b3c4" />
          <stop offset="100%" stopColor="#df8aa2" />
        </radialGradient>
        <linearGradient id="pegTag" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a5fc7" />
          <stop offset="100%" stopColor="#143578" />
        </linearGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="210" cy="436" rx="125" ry="18" fill="#041029" opacity="0.45" />

      {/* curly tail */}
      <path
        d="M306 352 q34 -6 26 -28 q-6 -18 -24 -12"
        fill="none"
        stroke="#7691d6"
        strokeWidth="11"
        strokeLinecap="round"
      />

      {/* back feet */}
      <ellipse cx="140" cy="408" rx="34" ry="24" fill="url(#pegBody)" />
      <ellipse cx="280" cy="408" rx="34" ry="24" fill="url(#pegBody)" />
      <ellipse cx="140" cy="416" rx="18" ry="10" fill="#f2a8bc" opacity="0.85" />
      <ellipse cx="280" cy="416" rx="18" ry="10" fill="#f2a8bc" opacity="0.85" />

      {/* body — plump sitting plush */}
      <ellipse cx="210" cy="352" rx="102" ry="78" fill="url(#pegBody)" />

      {/* stubby arms */}
      <ellipse cx="116" cy="334" rx="28" ry="42" fill="url(#pegBody)" transform="rotate(20 116 334)" />
      <ellipse cx="304" cy="334" rx="28" ry="42" fill="url(#pegBody)" transform="rotate(-20 304 334)" />

      {/* belly patch with seam stitching */}
      <ellipse cx="210" cy="366" rx="64" ry="50" fill="url(#pegBelly)" />
      <ellipse
        cx="210"
        cy="366"
        rx="64"
        ry="50"
        fill="none"
        stroke="#6d89d2"
        strokeWidth="2.5"
        strokeDasharray="7 8"
        opacity="0.75"
      />

      {/* soft shadow the head casts on the body */}
      <ellipse cx="210" cy="296" rx="78" ry="20" fill="#3f5aa8" opacity="0.3" />

      {/* ══ ears — big, set out to the sides like the real Peg ══ */}
      {/* left ear */}
      <path d="M128 118 Q70 42 58 84 Q50 116 104 156 Q118 134 128 118 Z" fill="url(#pegHead)" />
      <path d="M118 120 Q78 64 70 92 Q66 114 104 144 Q112 130 118 120 Z" fill="url(#pegEarInner)" />
      {/* right ear */}
      <path d="M292 118 Q350 42 362 84 Q370 116 316 156 Q302 134 292 118 Z" fill="url(#pegHead)" />
      <path d="M302 120 Q342 64 350 92 Q354 114 316 144 Q308 130 302 120 Z" fill="url(#pegEarInner)" />

      {/* ══ head — big, smooth, round ══ */}
      <ellipse cx="210" cy="176" rx="108" ry="100" fill="url(#pegHead)" />

      {/* subtle top seam stitch */}
      <path
        d="M112 142 Q210 84 308 142"
        fill="none"
        stroke="#6d89d2"
        strokeWidth="2"
        strokeDasharray="6 8"
        opacity="0.5"
      />

      {/* soft cheek shading for depth */}
      <ellipse cx="128" cy="222" rx="26" ry="32" fill="#5d79c8" opacity="0.15" />
      <ellipse cx="292" cy="222" rx="26" ry="32" fill="#5d79c8" opacity="0.15" />

      {/* forehead dollar-circle mark (embroidered look) */}
      <circle cx="210" cy="104" r="23" fill="none" stroke="#f3f8ff" strokeWidth="5" opacity="0.95" />
      <text
        x="210"
        y="113"
        textAnchor="middle"
        fontSize="28"
        fontWeight="700"
        fill="#f3f8ff"
        fontFamily="var(--font-baloo), sans-serif"
      >
        $
      </text>

      {/* ══ eyes — modest, round, glossy like the real Peg ══ */}
      <circle cx="156" cy="170" r="13" fill="#131c38" />
      <circle cx="160" cy="165" r="4.5" fill="#ffffff" opacity="0.95" />
      <circle cx="152" cy="175" r="2" fill="#8fc0ff" opacity="0.7" />
      <circle cx="264" cy="170" r="13" fill="#131c38" />
      <circle cx="268" cy="165" r="4.5" fill="#ffffff" opacity="0.95" />
      <circle cx="260" cy="175" r="2" fill="#8fc0ff" opacity="0.7" />

      {/* gentle lid line above each eye */}
      <path d="M140 152 q16 -8 32 -2" fill="none" stroke="#5d79c8" strokeWidth="3.5" strokeLinecap="round" opacity="0.5" />
      <path d="M248 150 q16 -6 32 2" fill="none" stroke="#5d79c8" strokeWidth="3.5" strokeLinecap="round" opacity="0.5" />

      {/* ══ snout — big, front and center, the defining Peg feature ══ */}
      <ellipse cx="210" cy="226" rx="56" ry="42" fill="url(#pegSnout)" />
      {/* sheen on the snout bridge */}
      <ellipse cx="192" cy="206" rx="26" ry="12" fill="#ffffff" opacity="0.35" />
      {/* nostrils — large vertical ovals */}
      <ellipse cx="188" cy="230" rx="10" ry="16" fill="#b35e74" />
      <ellipse cx="232" cy="230" rx="10" ry="16" fill="#b35e74" />
      <ellipse cx="185" cy="224" rx="3.5" ry="6" fill="#cf7d92" opacity="0.8" />
      <ellipse cx="229" cy="224" rx="3.5" ry="6" fill="#cf7d92" opacity="0.8" />
      {/* snout seam */}
      <ellipse
        cx="210"
        cy="226"
        rx="56"
        ry="42"
        fill="none"
        stroke="#c96f8a"
        strokeWidth="2"
        strokeDasharray="6 7"
        opacity="0.5"
      />

      {/* happy open smile just under the snout */}
      <path d="M190 270 Q210 286 230 270 Q220 278 210 278 Q200 278 190 270 Z" fill="#46365c" opacity="0.9" />
      <path
        d="M182 266 Q210 286 238 266"
        fill="none"
        stroke="#46618f"
        strokeWidth="4.5"
        strokeLinecap="round"
        opacity="0.9"
      />

      {/* faint blush */}
      <ellipse cx="136" cy="248" rx="16" ry="9" fill="#f2a8bc" opacity="0.4" />
      <ellipse cx="284" cy="248" rx="16" ry="9" fill="#f2a8bc" opacity="0.4" />

      {/* fabric tag on the body */}
      <g transform="rotate(14 312 330)">
        <rect x="306" y="318" width="46" height="25" rx="5" fill="url(#pegTag)" stroke="#8fc0ff" strokeWidth="1.5" />
        <text
          x="329"
          y="335"
          textAnchor="middle"
          fontSize="13"
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
