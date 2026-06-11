"""Build aligned 360-spin frames from the angle shots in ./angles.

All source photos share the same camera setup and 845x1024 canvas, so we keep
the full canvas (no crop) after background removal — that preserves alignment
between frames. Missing right-hand-side angles are synthesized by mirroring
the left-hand-side shots.

Frame order (pig rotating to its left, viewer sees it turn rightward):
  0 front
  1 quarter mirrored   (faces viewer-right)
  2 side               (faces viewer-right, as shot)
  3 rear-quarter       (as shot)
  4 back
  5 rear-quarter mirrored
  6 side mirrored      (faces viewer-left)
  7 quarter            (faces viewer-left, as shot)
"""

import os
import sys

from PIL import Image, ImageOps
from rembg import remove, new_session

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ANGLES = os.path.join(ROOT, "angles")
OUT = os.path.join(ROOT, "public", "spin")

# (source file, output frame index, mirrored frame index or None)
PLAN = [
    ("front.png", 0, None),
    ("quarter.png", 7, 1),
    ("side.png", 2, 6),
    ("rear-quarter.png", 3, 5),
    ("back.png", 4, None),
]

os.makedirs(OUT, exist_ok=True)
session = new_session("u2net")

missing = []
for src_name, idx, mirror_idx in PLAN:
    src_path = os.path.join(ANGLES, src_name)
    if not os.path.exists(src_path):
        missing.append(src_name)
        continue
    img = Image.open(src_path).convert("RGBA")
    cut = remove(img, session=session)
    cut.save(os.path.join(OUT, f"frame-{idx}.png"))
    if mirror_idx is not None:
        ImageOps.mirror(cut).save(os.path.join(OUT, f"frame-{mirror_idx}.png"))
    print(f"frame-{idx}" + (f" + frame-{mirror_idx} (mirror)" if mirror_idx is not None else ""), "done")

if missing:
    print("MISSING SOURCES:", ", ".join(missing))
    sys.exit(0)
print("ALL FRAMES BUILT")
