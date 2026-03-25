import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const inputDir = path.resolve("public/hero-images");
const outputDir = path.resolve("public/hero-images");

const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif"]);

async function fileExists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function compressImage(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  const inputPath = path.join(inputDir, fileName);
  const tempPath = path.join(outputDir, `${fileName}.tmp`);

  const image = sharp(inputPath);

  if (ext === ".jpg" || ext === ".jpeg") {
    await image.jpeg({ quality: 72, mozjpeg: true }).toFile(tempPath);
  } else if (ext === ".png") {
    await image.png({ compressionLevel: 9, quality: 75, palette: true }).toFile(tempPath);
  } else if (ext === ".webp") {
    await image.webp({ quality: 72 }).toFile(tempPath);
  } else if (ext === ".avif") {
    await image.avif({ quality: 50 }).toFile(tempPath);
  } else {
    return null;
  }

  const [before, after] = await Promise.all([
    fs.stat(inputPath),
    fs.stat(tempPath),
  ]);

  if (after.size > before.size) {
    await fs.unlink(tempPath);
    return {
      fileName,
      before: before.size,
      after: before.size,
      changed: false,
    };
  }

  await fs.rename(tempPath, inputPath);

  return {
    fileName,
    before: before.size,
    after: after.size,
    changed: true,
  };
}

async function run() {
  const hasInputDir = await fileExists(inputDir);
  if (!hasInputDir) {
    console.error("Folder not found: public/hero-images");
    process.exit(1);
  }

  const files = await fs.readdir(inputDir);
  const imageFiles = files.filter((file) => SUPPORTED_EXTENSIONS.has(path.extname(file).toLowerCase()));

  if (imageFiles.length === 0) {
    console.log("No supported images found in public/hero-images");
    return;
  }

  let totalBefore = 0;
  let totalAfter = 0;

  for (const file of imageFiles) {
    const result = await compressImage(file);
    if (!result) {
      continue;
    }

    totalBefore += result.before;
    totalAfter += result.after;

    const beforeKb = (result.before / 1024).toFixed(1);
    const afterKb = (result.after / 1024).toFixed(1);
    const tag = result.changed ? "compressed" : "kept";
    console.log(`${tag}: ${result.fileName} (${beforeKb}KB -> ${afterKb}KB)`);
  }

  const saved = totalBefore - totalAfter;
  const percent = totalBefore > 0 ? ((saved / totalBefore) * 100).toFixed(1) : "0.0";
  console.log(`Total: ${(totalBefore / 1024).toFixed(1)}KB -> ${(totalAfter / 1024).toFixed(1)}KB (saved ${percent}%)`);
}

run().catch((error) => {
  console.error("Compression failed:", error);
  process.exit(1);
});
