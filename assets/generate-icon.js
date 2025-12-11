// Script to generate icon.png from icon.svg
// Requires: npm install sharp
// Run: node assets/generate-icon.js

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const svgPath = path.join(__dirname, 'icon.svg');
const pngPath = path.join(__dirname, 'icon.png');

if (!fs.existsSync(svgPath)) {
  console.error('icon.svg not found!');
  process.exit(1);
}

sharp(svgPath)
  .resize(256, 256)
  .png()
  .toFile(pngPath)
  .then(() => {
    console.log('✅ icon.png generated successfully!');
  })
  .catch((err) => {
    console.error('Error generating icon:', err);
    console.log('\n💡 Alternative: Use an online SVG to PNG converter or ImageMagick');
    console.log('   Command: magick assets/icon.svg -resize 256x256 assets/icon.png');
  });

