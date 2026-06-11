"use client";

/**
 * Hand-drawn SVG of the $PEG plushie, modeled on the real Peg mascot photo:
 * a smooth blue piglet standing on four legs, seen from a slight side angle
 * (facing viewer-left). Piglet proportions — big head, compact round body,
 * short chunky legs — with the big pink snout, bead eyes, USDC-style dollar
 * mark on the forehead, pinkish trotters, and plush seam/tag details.
 */
export function PlushiePig({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 400"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="$PEG plushie pig"
    >
      <defs>
        <radialGradient id="pegHide" cx="35%" cy="22%" r="95%">
          <stop offset="0%" stopColor="#c4d5f8" />
          <stop offset="45%" stopColor="#92aeec" />
          <stop offset="100%" stopColor="#5f7ccd" />
        </radialGradient>
        <radialGradient id="pegHideDark" cx="40%" cy="25%" r="90%">
          <stop offset="0%" stopColor="#7e98dd" />
          <stop offset="100%" stopColor="#4d66b4" />
        </radialGradient>
        <radialGradient id="pegMuzzle" cx="45%" cy="35%" r="75%">
          <stop offset="0%" stopColor="#dde7fb" />
          <stop offset="100%" stopColor="#b3c8f2" />
        </radialGradient>
        <radialGradient id="pegSnout" cx="40%" cy="28%" r="85%">
          <stop offset="0%" stopColor="#fbc4d0" />
          <stop offset="55%" stopColor="#f2a0b4" />
          <stop offset="100%" stopColor="#d97e96" />
        </radialGradient>
        <radialGradient id="pegTrotter" cx="45%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#ecd4de" />
          <stop offset="100%" stopColor="#cfa9bd" />
        </radialGradient>
        <linearGradient id="pegTag" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2a5fc7" />
          <stop offset="100%" stopColor="#143578" />
        </linearGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="270" cy="366" rx="190" ry="19" fill="#041029" opacity="0.45" />

      {/* ══ far-side legs — darker, peeking out just behind the near legs ══ */}
      <rect x="198" y="266" width="42" height="84" rx="21" fill="url(#pegHideDark)" />
      <rect x="406" y="262" width="42" height="84" rx="21" fill="url(#pegHideDark)" />
      <ellipse cx="219" cy="344" rx="20" ry="11" fill="#b793a9" />
      <ellipse cx="427" cy="340" rx="20" ry="11" fill="#b793a9" />

      {/* curly tail */}
      <path
        d="M442 206 q42 -10 34 -34 q-7 -20 -28 -13"
        fill="none"
        stroke="#7691d6"
        strokeWidth="11"
        strokeLinecap="round"
      />

      {/* ══ body — compact and round, tucked behind the big head ══ */}
      <ellipse cx="318" cy="240" rx="132" ry="88" fill="url(#pegHide)" />
      {/* chest bulge connecting the head to the front legs */}
      <ellipse cx="192" cy="262" rx="66" ry="54" fill="url(#pegHide)" />

      {/* soft lighter underbelly, blended */}
      <ellipse cx="315" cy="296" rx="102" ry="28" fill="#dfe6fb" opacity="0.5" />

      {/* sheen along the back */}
      <ellipse cx="338" cy="172" rx="82" ry="22" fill="#ffffff" opacity="0.14" transform="rotate(-8 338 172)" />

      {/* back seam stitching */}
      <path
        d="M272 158 Q352 142 432 186"
        fill="none"
        stroke="#6d89d2"
        strokeWidth="2"
        strokeDasharray="6 8"
        opacity="0.5"
      />

      {/* ══ near-side legs — short and chunky, rooted in chest and haunch ══ */}
      <rect x="146" y="258" width="56" height="98" rx="26" fill="url(#pegHide)" />
      <rect x="354" y="256" width="56" height="102" rx="26" fill="url(#pegHide)" />
      <ellipse cx="174" cy="350" rx="28" ry="13" fill="url(#pegTrotter)" />
      <ellipse cx="382" cy="352" rx="28" ry="13" fill="url(#pegTrotter)" />

      {/* ══ far ear (behind the head) ══ */}
      <path d="M92 110 Q48 34 30 76 Q20 106 78 152 Q86 128 92 110 Z" fill="url(#pegHideDark)" />

      {/* ══ head — big piglet head, turned slightly to camera ══ */}
      <circle cx="168" cy="178" r="110" fill="url(#pegHide)" />

      {/* near ear with pink inner */}
      <path d="M216 92 Q252 8 280 48 Q296 76 238 130 Q226 108 216 92 Z" fill="url(#pegHide)" />
      <path d="M226 94 Q250 40 266 62 Q275 80 238 116 Q231 104 226 94 Z" fill="#ef9cb4" opacity="0.9" />

      {/* head seam */}
      <path
        d="M84 130 Q166 82 252 126"
        fill="none"
        stroke="#6d89d2"
        strokeWidth="2"
        strokeDasharray="6 8"
        opacity="0.45"
      />

      {/* lighter muzzle area low around the snout */}
      <ellipse cx="106" cy="238" rx="56" ry="44" fill="url(#pegMuzzle)" opacity="0.5" />

      {/* forehead USDC-style dollar mark (broken circle like the logo) */}
      <circle
        cx="168"
        cy="110"
        r="22"
        fill="none"
        stroke="#f3f8ff"
        strokeWidth="4.5"
        pathLength={100}
        strokeDasharray="38 12"
        strokeLinecap="round"
        transform="rotate(28 168 110)"
        opacity="0.95"
      />
      <text
        x="168"
        y="119"
        textAnchor="middle"
        fontSize="26"
        fontWeight="700"
        fill="#f3f8ff"
        fontFamily="var(--font-baloo), sans-serif"
      >
        $
      </text>

      {/* ══ eyes — shiny black beads, far eye smaller (perspective) ══ */}
      <circle cx="104" cy="168" r="11" fill="#10182f" />
      <circle cx="101" cy="164" r="3.5" fill="#ffffff" opacity="0.95" />
      <circle cx="194" cy="164" r="13" fill="#10182f" />
      <circle cx="190" cy="159" r="5" fill="#ffffff" opacity="0.95" />
      <circle cx="198" cy="169" r="2" fill="#8fc0ff" opacity="0.7" />

      {/* ══ snout — big, protruding forward-left ══ */}
      <ellipse cx="76" cy="226" rx="42" ry="34" fill="url(#pegSnout)" />
      {/* front disc of the snout */}
      <ellipse cx="62" cy="226" rx="27" ry="30" fill="#eb95ab" />
      {/* nostrils */}
      <ellipse cx="52" cy="224" rx="5.5" ry="9" fill="#a8546d" />
      <ellipse cx="74" cy="224" rx="5.5" ry="9" fill="#a8546d" />
      {/* sheen on snout top */}
      <ellipse cx="70" cy="206" rx="17" ry="7" fill="#ffffff" opacity="0.4" />

      {/* small content smile under the snout */}
      <path
        d="M92 268 Q116 280 146 270"
        fill="none"
        stroke="#54719f"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.8"
      />

      {/* fabric tag on the rump */}
      <g transform="rotate(16 446 182)">
        <rect x="438" y="170" width="46" height="25" rx="5" fill="url(#pegTag)" stroke="#8fc0ff" strokeWidth="1.5" />
        <text
          x="461"
          y="187"
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
