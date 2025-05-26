#!/bin/bash

# Script to generate manifest.json for a directory of images.

# --- Input Validation ---
if [ -z "$1" ]; then
  echo "Usage: $0 <directory_path>"
  exit 1
fi

TARGET_DIR="$1"

if [ ! -d "$TARGET_DIR" ]; then
  echo "Error: Directory '$TARGET_DIR' not found."
  exit 1
fi

# Ensure TARGET_DIR ends with a slash for consistent path joining
[[ "$TARGET_DIR" != */ ]] && TARGET_DIR="$TARGET_DIR/"

MANIFEST_FILE="${TARGET_DIR}manifest.json"

# --- User Confirmation for Overwrite ---
if [ -f "$MANIFEST_FILE" ]; then
  read -r -p "$MANIFEST_FILE already exists. Overwrite? (y/N) " confirmation
  if [[ ! "$confirmation" =~ ^[Yy]$ ]]; then
    echo "Exiting without overwriting."
    exit 0
  fi
fi

# --- Image Processing ---
echo "Processing directory: $TARGET_DIR"

# Find images (case-insensitive extensions)
# The -print0 and nullglob/while read -r -d $'\0' pattern is safer for filenames with spaces or special characters
image_files=()
while IFS= read -r -d $'\0' file; do
  image_files+=("$file")
done < <(find "$TARGET_DIR" -maxdepth 1 -type f \( \
  -iname "*.jpg" -o \
  -iname "*.jpeg" -o \
  -iname "*.png" -o \
  -iname "*.gif" -o \
  -iname "*.webp" \
  \) -print0 | sort -z)

if [ ${#image_files[@]} -eq 0 ]; then
  echo "No image files found in $TARGET_DIR (jpg, jpeg, png, gif, webp)."
  # Create an empty manifest if no images are found, after user confirmation
  read -r -p "No images found. Create an empty manifest.json? (y/N) " empty_confirmation
  if [[ "$empty_confirmation" =~ ^[Yy]$ ]]; then
    echo "[]" > "$MANIFEST_FILE"
    echo "Empty manifest.json generated successfully in $TARGET_DIR"
    exit 0
  else
    echo "Exiting without creating a manifest."
    exit 0
  fi
fi

json_array_string="["
first_item=true

for img_path in "${image_files[@]}"; do
  filename=$(basename "$img_path")
  echo "Found image: $filename"
  read -r -p "Enter alt text for $filename: " alt_text

  # Escape double quotes in alt text
  escaped_alt_text=$(echo "$alt_text" | sed 's/"/\\"/g')

  if [ "$first_item" = true ]; then
    first_item=false
  else
    json_array_string+=","
  fi
  json_array_string+="{\"filename\": \"$filename\", \"alt\": \"$escaped_alt_text\"}"
done

json_array_string+="]"

# --- File Output ---
echo "$json_array_string" > "$MANIFEST_FILE"
echo "manifest.json generated successfully in $TARGET_DIR"

exit 0
