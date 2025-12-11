# Assets Directory

This directory contains default assets for the Live Stream Dashboard application.

## Files

### icon.svg / icon.png
- **Purpose**: Application icon for Electron window
- **Size**: 256x256 pixels (recommended)
- **Formats**: 
  - SVG source file: `icon.svg`
  - PNG file: `icon.png` (generated from SVG)

### placeholder-video.svg
- **Purpose**: Default placeholder for video thumbnails
- **Size**: 400x225 pixels (16:9 aspect ratio)
- **Usage**: Can be used as a fallback when video thumbnails are not available

## Generating icon.png

### Option 1: Using Node.js (sharp)
```bash
npm install sharp --save-dev
node assets/generate-icon.js
```

### Option 2: Using ImageMagick
```bash
magick assets/icon.svg -resize 256x256 assets/icon.png
```

### Option 3: Online Converter
1. Open `icon.svg` in a browser
2. Use an online SVG to PNG converter
3. Set size to 256x256 pixels
4. Save as `icon.png`

### Option 4: Manual Creation
Create a 256x256 PNG file with your custom icon design and save it as `icon.png`.

## Customization

You can replace these assets with your own:
- **icon.png**: Custom app icon (keep 256x256 for best results)
- **placeholder-video.svg**: Custom video placeholder design

## Notes

- The icon is referenced in `main.js` for the Electron window
- All assets should be optimized for file size
- SVG files are scalable and can be converted to any size needed

