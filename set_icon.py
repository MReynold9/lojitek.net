#!/usr/bin/env python3
"""
Generate Lojitek APK icon matching the reference design:
- Dark navy square background (fills full frame)
- Chip: rounded-rect OUTLINE only (not filled)
- Inner rect: OUTLINE only inside chip
- Three RING nodes (hollow circles) connected by L-shaped traces
- Rounded line caps everywhere
"""
import os
from PIL import Image, ImageDraw

SIZE  = 1024
BG    = (13, 36, 66, 255)     # #0D2442  dark navy
WHITE = (255, 255, 255, 255)

def px(pct):
    """Convert percentage to pixel value."""
    return int(pct / 100.0 * SIZE)


def filled_rrect(draw, x1, y1, x2, y2, radius, color):
    draw.rounded_rectangle([x1, y1, x2, y2], radius=radius, fill=color)


def outline_rrect(draw, x1, y1, x2, y2, radius, stroke, fg, bg):
    """Draw a rounded-rect that is outline-only (bg shows through)."""
    filled_rrect(draw, x1, y1, x2, y2, radius, fg)
    r2 = max(2, radius - stroke)
    filled_rrect(draw, x1+stroke, y1+stroke, x2-stroke, y2-stroke, r2, bg)


def ring(draw, cx, cy, outer_r, inner_r, fg, bg):
    """Draw a hollow ring node."""
    draw.ellipse([cx-outer_r, cy-outer_r, cx+outer_r, cy+outer_r], fill=fg)
    draw.ellipse([cx-inner_r, cy-inner_r, cx+inner_r, cy+inner_r], fill=bg)


def rline(draw, pts, width, color):
    """
    Draw polyline through pts with fully rounded caps/joins.
    pts: list of (x, y) tuples
    """
    r = width // 2
    for i in range(len(pts) - 1):
        x1, y1 = pts[i]
        x2, y2 = pts[i+1]
        draw.line([(x1, y1), (x2, y2)], fill=color, width=width)
    # rounded caps at every point
    for (x, y) in pts:
        draw.ellipse([x-r, y-r, x+r, y+r], fill=color)


def draw_icon(img):
    draw = ImageDraw.Draw(img)
    bg = img.getpixel((0, 0))[:3] + (255,)   # background colour tuple

    LW  = px(3.6)    # trace / stroke width  ~37px
    NOR = px(7.2)    # node outer radius     ~74px
    NIR = px(3.6)    # node inner radius     ~37px  (= LW/2 so ring wall = LW)
    CR  = px(6.5)    # chip corner radius    ~67px

    # ── Chip outer bounds ────────────────────────────────────────────────────
    cx1, cy1 = px(26), px(23)
    cx2, cy2 = px(65), px(70)
    outline_rrect(draw, cx1, cy1, cx2, cy2, CR, LW, WHITE, bg)

    # ── Inner rect (CPU die, outline only) ──────────────────────────────────
    ix1, iy1 = px(35), px(37)
    ix2, iy2 = px(57), px(57)
    outline_rrect(draw, ix1, iy1, ix2, iy2, px(2), LW, WHITE, bg)

    # ── Trace 1: top-left ring → left side of chip ──────────────────────────
    # Node at (17%, 15%), exits bottom, goes down then right to chip left-centre
    n1x, n1y = px(17), px(15)
    mid_y1   = (cy1 + cy2) // 2          # vertical mid of chip
    rline(draw, [(n1x, n1y + NOR), (n1x, mid_y1), (cx1, mid_y1)], LW, WHITE)
    ring(draw, n1x, n1y, NOR, NIR, WHITE, bg)

    # ── Trace 2: chip top-right corner → right → down → bottom-right ring ──
    # Exits chip top-right, goes right, then down to node at (79%, 63%)
    n2x, n2y = px(79), px(63)
    rline(draw, [(cx2, cy1), (n2x, cy1), (n2x, n2y - NOR)], LW, WHITE)
    ring(draw, n2x, n2y, NOR, NIR, WHITE, bg)

    # ── Trace 3: chip bottom-centre → down → bottom-centre ring ─────────────
    n3x = cx1 + (cx2 - cx1) * 45 // 100   # 45% across the chip width
    n3y = px(83)
    rline(draw, [(n3x, cy2), (n3x, n3y - NOR)], LW, WHITE)
    ring(draw, n3x, n3y, NOR, NIR, WHITE, bg)


def resize_and_save(img, path, size):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.resize((size, size), Image.LANCZOS).convert("RGB").save(path, "PNG")
    print(f"  ✓ {path} ({size}×{size})")


def main():
    img = Image.new("RGBA", (SIZE, SIZE), BG)
    draw_icon(img)

    img.convert("RGB").save("lojitek-icon.png", "PNG")
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
        resize_and_save(img, path, size)

    print("\nDone!")


if __name__ == "__main__":
    main()
