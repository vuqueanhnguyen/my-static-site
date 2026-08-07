#!/usr/bin/env python3
"""Resize images in the images/ folder to multiple widths and create JPEG and WebP variants.

Produces files named like: Bag1_2-400.jpg and Bag1_2-400.webp
"""
import os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(__file__))
IMG_DIR = os.path.join(ROOT, 'images')
OUTPUT_QUALITY = 75
WIDTHS = [400, 800, 1200, 1600]


def ensure_dir(path):
    if not os.path.exists(path):
        os.makedirs(path)


def resize_image(path):
    name = os.path.basename(path)
    if name.lower().endswith('.md'):
        return
    base, ext = os.path.splitext(name)
    src = os.path.join(IMG_DIR, name)
    try:
        with Image.open(src) as im:
            im = im.convert('RGB')
            w, h = im.size
            for width in WIDTHS:
                if width >= w:
                    # if requested width larger than original, still generate but don't upscale too much
                    new_w = min(width, w)
                else:
                    new_w = width
                new_h = int((new_w / w) * h)
                resized = im.resize((new_w, new_h), Image.LANCZOS)
                out_jpg = os.path.join(IMG_DIR, f"{base}-{new_w}.jpg")
                resized.save(out_jpg, format='JPEG', quality=OUTPUT_QUALITY)
                # save webp
                out_webp = os.path.join(IMG_DIR, f"{base}-{new_w}.webp")
                resized.save(out_webp, format='WEBP', quality=80)
                print(f"Wrote {out_jpg} and {out_webp}")
    except Exception as e:
        print(f"Skipping {src}: {e}")


def main():
    if not os.path.isdir(IMG_DIR):
        print('images/ folder not found')
        return
    files = sorted(os.listdir(IMG_DIR))
    for f in files:
        if f.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
            resize_image(f)


if __name__ == '__main__':
    main()
