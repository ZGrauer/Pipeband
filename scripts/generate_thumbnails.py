import argparse
import os
from PIL import Image

def create_thumbnails(gallery_id):
    target_dir = os.path.join("src/assets/photos", gallery_id)
    thumbs_dir = os.path.join(target_dir, "thumbs")

    if not os.path.isdir(target_dir):
        print(f"Error: Gallery directory not found at {target_dir}")
        return

    if not os.path.exists(thumbs_dir):
        os.makedirs(thumbs_dir)
        print(f"Created thumbnails directory at {thumbs_dir}")

    image_files = [
        f for f in os.listdir(target_dir)
        if os.path.isfile(os.path.join(target_dir, f)) and f.lower().endswith((".jpg", ".jpeg", ".png", ".gif", ".webp"))
    ]

    for image_file in image_files:
        try:
            img_path = os.path.join(target_dir, image_file)
            img = Image.open(img_path)

            # Resize image (maintaining aspect ratio and cropping)
            img.thumbnail((400, 400))

            # Convert to WEBP
            base, ext = os.path.splitext(image_file)
            thumb_filename = f"{base}_thumb.webp"
            thumb_path = os.path.join(thumbs_dir, thumb_filename)
            
            img.save(thumb_path, "WEBP")
            print(f"Successfully created thumbnail for {image_file} at {thumb_path}")

        except FileNotFoundError:
            print(f"Error: Image file not found at {img_path}")
        except IOError:
            print(f"Error: Could not open or read image file {img_path}. It may be corrupted or an unsupported format.")
        except Exception as e:
            print(f"An unexpected error occurred while processing {image_file}: {e}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate thumbnails for a photo gallery.")
    parser.add_argument("gallery_id", help="The ID of the gallery to process.")
    args = parser.parse_args()

    # It's good practice to remind users how to install dependencies if they are missing.
    try:
        from PIL import Image
    except ImportError:
        print("Pillow library not found. Please install it by running: pip install Pillow")
        exit(1)

    create_thumbnails(args.gallery_id)
