#!/usr/bin/env python3
"""
Generate Lojitek APK icon from the real Lojitek logo PNG.
Strategy: scale the logo up 1.45x so the white circle border
falls OUTSIDE the 1024x1024 crop area — leaving only dark navy
background + the circuit-board icon filling the full square frame.
"""
import os
from PIL import Image

SIZE      = 1024
SCALE     = 1.0           # use image as-is (dark background already fills the frame)
LOGO_FILE = "lojitek-icon-source.png"   # copied from attached_assets


def build_icon():
    src = Image.open(LOGO_FILE).convert("RGBA")
    w, h = src.size

    # Scale up
    new_w = int(w * SCALE)
    new_h = int(h * SCALE)
    big = src.resize((new_w, new_h), Image.LANCZOS)

    # Center-crop to SIZE x SIZE
    left = (new_w - SIZE) // 2
    top  = (new_h - SIZE) // 2
    icon = big.crop((left, top, left + SIZE, top + SIZE))
    return icon


def resize_and_save(img, path, size):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.resize((size, size), Image.LANCZOS).convert("RGB").save(path, "PNG")
    print(f"  ✓ {path} ({size}x{size})")


def main():
    icon = build_icon()
    icon.convert("RGB").save("lojitek-icon.png", "PNG")
    print("Master icon saved: lojitek-icon.png")

    targets = {
        "android/app/src/main/res/mipmap-mdpi/ic_launcher.png":        48,
        "android/app/src/main/res/mipmap-mdpi/ic_launcher_round.png":   48,
        "android/app/src/main/res/mipmap-hdpi/ic_launcher.png":        72,
        "android/app/src/main/res/mipmap-hdpi/ic_launcher_round.png":   72,
        "android/app/src/main/res/mipmap-xhdpi/ic_launcher.png":       96,
        "android/app/src/main/res/mipmap-xhdpi/ic_launcher_round.png":  96,
        "android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png":      144,
        "android/app/src/main/res/mipmap-xxhdpi/ic_launcher_round.png": 144,
        "android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png":     192,
        "android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png":192,
    }

    print("\nInstalling to Android resources:")
    for path, size in targets.items():
        resize_and_save(icon, path, size)

    print("\nDone!")


if __name__ == "__main__":
    main()
