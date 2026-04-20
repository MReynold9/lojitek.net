from PIL import Image
import os, urllib.request

urllib.request.urlretrieve("https://lojitek.replit.app/opengraph.jpg", "/tmp/source.jpg")
img = Image.open("/tmp/source.jpg").convert("RGBA")
w, h = img.size
print(f"Source: {w}x{h}")

side = min(w, h)
left = (w - side) // 2
top = (h - side) // 2
img = img.crop((left, top, left + side, top + side))

sizes = [
    (48, "mipmap-mdpi"),
    (72, "mipmap-hdpi"),
    (96, "mipmap-xhdpi"),
    (144, "mipmap-xxhdpi"),
    (192, "mipmap-xxxhdpi"),
]
for size, folder in sizes:
    path = f"android/app/src/main/res/{folder}"
    os.makedirs(path, exist_ok=True)
    resized = img.resize((size, size), Image.LANCZOS)
    resized.save(f"{path}/ic_launcher.png")
    resized.save(f"{path}/ic_launcher_round.png")
    print(f"  OK {folder}: {size}x{size}")

print("Icon Lojitek OK!")