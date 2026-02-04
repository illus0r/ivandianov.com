#!/bin/bash
# Upload all media to ImageKit
# Run in background: nohup ./scripts/upload-to-imagekit.sh > /tmp/imagekit-upload.log 2>&1 &

set -e

PRIVATE_KEY="private_H4H3ZaFJZge5UqmfVyWE5hwyxNs="
BASE_URL="https://upload.imagekit.io/api/v1/files/upload"
LOG_FILE="/tmp/imagekit-upload.log"
MAPPING_FILE="/root/ivandianov.com/scripts/imagekit-mapping.json"

cd /root/ivandianov.com

echo "[]" > "$MAPPING_FILE"

upload_file() {
    local file="$1"
    local folder="$2"
    local filename=$(basename "$file")
    
    echo "Uploading: $file -> $folder/$filename"
    
    response=$(curl -s -X POST "$BASE_URL" \
        -u "$PRIVATE_KEY:" \
        -F "file=@$file" \
        -F "fileName=$filename" \
        -F "folder=$folder" \
        -F "useUniqueFileName=false")
    
    url=$(echo "$response" | jq -r '.url // empty')
    
    if [ -n "$url" ]; then
        echo "  ✓ $url"
        # Add to mapping
        jq --arg local "$file" --arg remote "$url" \
           '. += [{"local": $local, "remote": $remote}]' \
           "$MAPPING_FILE" > "${MAPPING_FILE}.tmp" && mv "${MAPPING_FILE}.tmp" "$MAPPING_FILE"
    else
        echo "  ✗ Failed: $response"
    fi
}

# Upload images from assets/media/projects
echo "=== Uploading projects ==="
find assets/media/projects -maxdepth 1 -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.webp" \) | while read f; do
    upload_file "$f" "/projects"
done

# Upload images from assets/media/posts
echo "=== Uploading posts ==="
find assets/media/posts -maxdepth 1 -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.gif" -o -name "*.webp" \) | while read f; do
    upload_file "$f" "/posts"
done

# Upload videos from projects
echo "=== Uploading videos ==="
find assets/media -maxdepth 2 -type f -name "*.mp4" | while read f; do
    upload_file "$f" "/videos"
done

# Upload thread media
echo "=== Uploading threads ==="
find assets/threads -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.mp4" \) | while read f; do
    folder="/threads/$(dirname "$f" | sed 's|assets/threads/||')"
    upload_file "$f" "$folder"
done

echo "=== Done! ==="
echo "Mapping saved to: $MAPPING_FILE"
