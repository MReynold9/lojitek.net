#!/usr/bin/env python3
"""
Generate Lojitek APK icon: square, full-frame, dark navy background,
white circuit-board icon — no white circle border.
"""
import os
import sys
from PIL import Image, ImageDraw

SIZE   = 1024
BG     = (0, 26, 62, 255)      # #001A3E
WHITE  = (255, 255, 255, 255)

def s(v):
    """Scale a 0-100 value to pixels."""
    return int(v / 100 * SIZE)

def draw_icon(draw):
    LW = s(2.8)   # line / stroke width  ~29px
    NR = s(5.0)   # node circle radius   ~51px
    CR = s(5.2)   # chip corner radius   ~53px

    # ── Chip outer rect ──────────────────────────────────────────────
    # Occupies roughly the middle 58 % of the frame
    cm = s(21)           # chip margin from edge
    chip = [cm, cm, SIZE - cm, SIZE - cm]
    draw.rounded_rectangle(chip, radius=CR, outline=WHITE, width=LW)

    # ── Inner rect (CPU core) ─────────────────────────────────────────
    im = s(35)
    draw.rounded_rectangle([im, im, SIZE - im, SIZE - im],
                           radius=s(2), fill=WHITE)

    # ── Helper: draw an L-shaped trace + filled node ──────────────────
    def trace(x1, y1, x2, y2, bend_x=None, bend_y=None):
        """
        Draw a right-angle trace from (x1,y1) to (x2,y2).
        bend decides which axis goes first.
        """
        if bend_x is not None:
            pts = [(x1, y1), (bend_x, y1), (bend_x, y2), (x2, y2)]
        elif bend_y is not None:
            pts = [(x1, y1), (x1, bend_y), (x2, bend_y), (x2, y2)]
        else:
            pts = [(x1, y1), (x2, y2)]
        for i in range(len(pts) - 1):
            draw.line([pts[i], pts[i + 1]], fill=WHITE, width=LW)

    def node(cx, cy):
        draw.ellipse([cx - NR, cy - NR, cx + NR, cy + NR], fill=WHITE)

    chip_l, chip_t, chip_r, chip_b = cm, cm, SIZE - cm, SIZE - cm
    cx2, cy2 = SIZE // 2, SIZE // 2

    # Top-left node — comes from top-left corner of chip
    nlx, nly = s(11), s(11)
    trace(chip_l, chip_t, nlx, nly, bend_x=nlx)
    node(nlx, nly)

    # Top-right node — comes from top-right corner of chip
    nrx, nry = s(87), s(14)
    trace(chip_r, chip_t, nrx, nry, bend_x=nrx)
    node(nrx, nry)

    # Right node — comes from mid-right of chip
    rrx, rry = s(90), s(65)
    trace(chip_r, cy2, rrx, rry, bend_y=rry)
    node(rrx, rry)

    # Bottom-center node — comes from bottom of chip
    bcx, bcy = s(50), s(90)
    trace(cx2, chip_b, bcx, bcy)
    node(bcx, bcy)


def resize_and_save(img, path, size):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    resized = img.resize((size, size), Image.LANCZOS)
    resized.convert("RGB").save(path, "PNG")
    print(f"  ✓ {path} ({size}×{size})")


def main():
    img = Image.new("RGBA", (SIZE, SIZE), BG)
    draw_icon(ImageDraw.Draw(img))

    # Save master icon
    img.convert("RGB").save("lojitek-icon.png", "PNG")
    print("Master icon saved: lojitek-icon.png")

    # Android mipmap targets
    targets = {
        "android/app/src/main/res/mipmap-mdpi/ic_launcher.png":       48,
        "android/app/src/main/res/mipmap-mdpi/ic_launcher_round.png":  48,
        "android/app/src/main/res/mipmap-hdpi/ic_launcher.png":       72,
        "android/app/src/main/res/mipmap-hdpi/ic_launcher_round.png":  72,
        "android/app/src/main/res/mipmap-xhdpi/ic_launcher.png":      96,
        "android/app/src/main/res/mipmap-xhdpi/ic_launcher_round.png": 96,
        "android/app/src/main/res/mipmap-xxhdpi/ic_launcher.png":     144,
        "android/app/src/main/res/mipmap-xxhdpi/ic_launcher_round.png":144,
        "android/app/src/main/res/mipmap-xxxhdpi/ic_launcher.png":    192,
        "android/app/src/main/res/mipmap-xxxhdpi/ic_launcher_round.png":192,
    }

    print("\nInstalling to Android resources:")
    for path, size in targets.items():
        resize_and_save(img, path, size)

    print("\nDone! Icon installed successfully.")

if __name__ == "__main__":
    main()
