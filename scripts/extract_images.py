"""Extract base64 images pasted into the current session from the transcript."""

import base64
import io
import json
import os

from PIL import Image

TRANSCRIPT = r"C:\Users\lukes\.claude\projects\C--Users-lukes-OneDrive-Desktop-devwork\30dd9a14-6047-4f85-9d80-9788f4f73998.jsonl"
OUT = r"C:\Users\lukes\OneDrive\Desktop\devwork\peg-plush\angles\extracted"
os.makedirs(OUT, exist_ok=True)

def walk(node, found):
    if isinstance(node, dict):
        if node.get("type") == "image":
            src = node.get("source", {})
            if src.get("type") == "base64" and src.get("data"):
                found.append(src["data"])
        for v in node.values():
            walk(v, found)
    elif isinstance(node, list):
        for v in node:
            walk(v, found)

found = []
with open(TRANSCRIPT, encoding="utf-8") as f:
    for line in f:
        try:
            rec = json.loads(line)
        except json.JSONDecodeError:
            continue
        # only user messages carry pasted images
        if rec.get("type") == "user":
            walk(rec.get("message"), found)

seen = set()
n = 0
for data in found:
    digest = hash(data)
    if digest in seen:
        continue
    seen.add(digest)
    raw = base64.b64decode(data)
    img = Image.open(io.BytesIO(raw))
    n += 1
    img.convert("RGBA").save(os.path.join(OUT, f"img_{n:02d}_{img.width}x{img.height}.png"))
    print(f"img_{n:02d}: {img.width}x{img.height}")

print(f"extracted {n} unique images")
