#!/usr/bin/env python3
import os
import re
from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
IMG_DIR = os.path.join(ROOT, "images")

JPEG_QUALITY = 75
WEBP_QUALITY = 80
WIDTHS = [400, 800, 1200, 1600]

# Matches files such as:
# Bag1_2-400.jpg
# Bag1_2-400.webp
width_pattern = "|".join(str(width) for width in WIDTHS)

GENERATED_FILE_PATTERN = re.compile(
    rf"-({width_pattern})\.(jpg|jpeg|webp)$",
    re.IGNORECASE
)


def delete_generated_files():
    """Delete previously generated responsive image files."""

    deleted_count = 0

    for filename in os.listdir(IMG_DIR):
        if not GENERATED_FILE_PATTERN.search(filename):
            continue

        file_path = os.path.join(IMG_DIR, filename)

        try:
            os.remove(file_path)
            deleted_count += 1
            print(f"Deleted: {filename}")
        except OSError as error:
            print(f"Could not delete {filename}: {error}")

    print(f"Deleted {deleted_count} previously generated file(s).\n")


def resize_image(filename):
    source_path = os.path.join(IMG_DIR, filename)
    base, _ = os.path.splitext(filename)

    try:
        with Image.open(source_path) as original:
            original = ImageOps.exif_transpose(original)

            # JPEG does not support transparency
            if original.mode in ("RGBA", "LA"):
                background = Image.new("RGB", original.size, "white")
                alpha = original.getchannel("A")
                background.paste(original, mask=alpha)
                original = background
            else:
                original = original.convert("RGB")

            original_width, original_height = original.size

            print(
                f"Processing {filename} "
                f"({original_width}x{original_height})"
            )

            for target_width in WIDTHS:
                target_height = round(
                    original_height * target_width / original_width
                )

                resized = original.resize(
                    (target_width, target_height),
                    Image.Resampling.LANCZOS
                )

                jpg_path = os.path.join(
                    IMG_DIR,
                    f"{base}-{target_width}.jpg"
                )

                webp_path = os.path.join(
                    IMG_DIR,
                    f"{base}-{target_width}.webp"
                )

                resized.save(
                    jpg_path,
                    format="JPEG",
                    quality=JPEG_QUALITY,
                    optimize=True
                )

                resized.save(
                    webp_path,
                    format="WEBP",
                    quality=WEBP_QUALITY,
                    method=6
                )

                print(f"  Wrote: {os.path.basename(jpg_path)}")
                print(f"  Wrote: {os.path.basename(webp_path)}")

    except Exception as error:
        print(f"Skipping {source_path}: {error}")


def main():
    if not os.path.isdir(IMG_DIR):
        print(f"Images folder not found: {IMG_DIR}")
        return

    # Delete old -400, -800, -1200 and -1600 files first
    delete_generated_files()

    # Get the remaining files after cleanup
    files = sorted(os.listdir(IMG_DIR))
    processed_count = 0

    for filename in files:
        if not filename.lower().endswith(
            (".png", ".jpg", ".jpeg", ".webp")
        ):
            continue

        # Extra safety: never process a generated file
        if GENERATED_FILE_PATTERN.search(filename):
            continue

        resize_image(filename)
        processed_count += 1

    print(f"\nFinished processing {processed_count} original image(s).")


if __name__ == "__main__":
    main()