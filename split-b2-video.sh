#!/bin/bash

# Split and Upload B2 Video Script
# This script splits the large B2 video file into 2 parts and uploads them

set -e

VIDEO_FILE="/Users/mainaksaha/Desktop/MASTERS/Project/TLN/frenchmastery/B2/French B2 Practice Videos.zip"
TEMP_DIR="/Users/mainaksaha/Desktop/MASTERS/Project/TLN/frenchmastery/B2/temp_split"
OUTPUT_DIR="/Users/mainaksaha/Desktop/MASTERS/Project/TLN/frenchmastery/B2"

echo "================================================================================"
echo "📦 SPLITTING B2 VIDEO FILE"
echo "================================================================================"
echo ""

# Check if file exists
if [ ! -f "$VIDEO_FILE" ]; then
    echo "❌ Error: Video file not found!"
    echo "   Expected: $VIDEO_FILE"
    exit 1
fi

# Get file size
FILE_SIZE=$(du -h "$VIDEO_FILE" | cut -f1)
echo "📂 Source file: French B2 Practice Videos.zip"
echo "   Size: $FILE_SIZE"
echo ""

# Create temp directory
echo "📁 Creating temporary directory..."
mkdir -p "$TEMP_DIR"

# Extract the ZIP
echo "📦 Extracting ZIP file..."
echo "   This may take a few minutes..."
unzip -q "$VIDEO_FILE" -d "$TEMP_DIR"

# Count files
cd "$TEMP_DIR"
TOTAL_FILES=$(find . -type f | wc -l | tr -d ' ')
HALF=$((TOTAL_FILES / 2))

echo "✅ Extracted $TOTAL_FILES files"
echo ""

# Create Part 1
echo "📦 Creating Part 1 (first $HALF files)..."
find . -type f | head -n $HALF | zip -q -@ "$OUTPUT_DIR/French B2 Practice Videos - Part 1.zip"
PART1_SIZE=$(du -h "$OUTPUT_DIR/French B2 Practice Videos - Part 1.zip" | cut -f1)
echo "   ✅ Part 1 created: $PART1_SIZE"

# Create Part 2
echo "📦 Creating Part 2 (remaining files)..."
find . -type f | tail -n +$((HALF + 1)) | zip -q -@ "$OUTPUT_DIR/French B2 Practice Videos - Part 2.zip"
PART2_SIZE=$(du -h "$OUTPUT_DIR/French B2 Practice Videos - Part 2.zip" | cut -f1)
echo "   ✅ Part 2 created: $PART2_SIZE"
echo ""

# Cleanup
echo "🧹 Cleaning up temporary files..."
cd ..
rm -rf "$TEMP_DIR"

echo ""
echo "================================================================================"
echo "✅ SPLIT COMPLETE"
echo "================================================================================"
echo ""
echo "Created files:"
echo "  1. French B2 Practice Videos - Part 1.zip ($PART1_SIZE)"
echo "  2. French B2 Practice Videos - Part 2.zip ($PART2_SIZE)"
echo ""
echo "Next step: Run the upload script"
echo "  node upload-b2-video-parts.js"
echo ""
