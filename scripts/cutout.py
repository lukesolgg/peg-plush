from rembg import remove
from PIL import Image

src = Image.open(r"C:\Users\lukes\OneDrive\Desktop\devwork\peg-plush\peg-source.png")
out = remove(src)
bbox = out.getbbox()
out = out.crop(bbox)
out.save(r"C:\Users\lukes\OneDrive\Desktop\devwork\peg-plush\public\peg-plushie.png")
print("done", out.size)
