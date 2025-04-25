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

  files.forEach(file => {
    const inputFilePath = path.join(inputDir, file);
    const outputFilePath = path.join(outputDir, `${path.parse(file).name}.webp`);

    sharp(inputFilePath)
      .webp()
      .toFile(outputFilePath)
      .then(() => {
        console.log(`Converted ${file} to ${outputFilePath}`);
      })
      .catch(err => {node 
        console.error('Error converting file:', err);
      });
  });
});