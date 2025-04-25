import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const inputDir = './input';
const outputDir = './output';

// Ensure the output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

fs.readdir(inputDir, (err, files) => {
  if (err) {
    console.error('Error reading input directory:', err);
    return;
  }

  // Filter for supported image formats
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.tiff', '.webp', '.gif'].includes(ext);
  });

  imageFiles.forEach(file => {
    const inputFilePath = path.join(inputDir, file);
    const outputFilePath = path.join(outputDir, `${path.parse(file).name}.webp`);

    // Convert image to WebP format
    sharp(inputFilePath)
      .webp()
      .toFile(outputFilePath)
      .then(() => {
        console.log(`Converted ${file} to ${outputFilePath}`);
      })
      .catch(err => {
        console.error('Error converting file:', err);
      });

    // Resize image to 800 width, maintaining aspect ratio
    // And store as jpeg
    sharp(inputFilePath)
      .resize({ width: 1024 })
      .jpeg({
        quality: 95
      })
      .toFile(path.join(outputDir, `${path.parse(file).name}-resized.jpg`))
      .then(() => {
        console.log(`Resized ${file} to ${outputDir}/${path.parse(file).name}-resized.jpg`);
      })
      .catch(err => {
        console.error('Error resizing file:', err);
      });
  });
});