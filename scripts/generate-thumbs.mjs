import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const publicDir = path.resolve("public");
const SUPPORTED_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".avif", ".JPG"]);
const THUMB_SUFFIX = "-thumb";
const THUMB_SIZES = [480, 800];

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else {
      files.push(full);
    }
  }
  return files;
}

function isThumb(file) {
  const base = path.basename(file);
  return base.includes(THUMB_SUFFIX);
}

async function makeThumb(file) {
  const ext = path.extname(file);
  if (!SUPPORTED_EXTENSIONS.has(ext)) return null;
  if (isThumb(file)) return null;

  const dir = path.dirname(file);
  const name = path.basename(file, ext);
  const createdSizes = [];

  try {
    for (const size of THUMB_SIZES) {
      const outName = `${name}${THUMB_SUFFIX}-${size}${ext}`;
      const outPath = path.join(dir, outName);
      const stat = await fs.stat(outPath).catch(() => null);
      if (stat && stat.size > 0) {
        continue;
      }

      const pipeline = sharp(file).resize({ width: size });
      if (ext === ".jpg" || ext === ".jpeg" || ext === ".JPG") {
        await pipeline.jpeg({ quality: 72, mozjpeg: true }).toFile(outPath);
      } else if (ext === ".png") {
        await pipeline.png({ compressionLevel: 9, quality: 75, palette: true }).toFile(outPath);
      } else if (ext === ".webp") {
        await pipeline.webp({ quality: 72 }).toFile(outPath);
      } else if (ext === ".avif") {
        await pipeline.avif({ quality: 50 }).toFile(outPath);
      } else {
        // default
        await pipeline.toFile(outPath);
      }

      createdSizes.push(size);
    }

    return { file, createdSizes };
  } catch (err) {
    console.error(`Failed to create thumbs for ${file}:`, err.message || err);
    return null;
  }
}

async function run() {
  const exists = await fs.stat(publicDir).catch(() => null);
  if (!exists) {
    console.error("No public folder found. Place your images under public/...");
    process.exit(1);
  }

  const allFiles = await walk(publicDir);
  const imageFiles = allFiles.filter((f) => SUPPORTED_EXTENSIONS.has(path.extname(f)));
  if (imageFiles.length === 0) {
    console.log("No images found under public/");
    return;
  }

  let created = 0;
  for (const f of imageFiles) {
    const res = await makeThumb(f);
    if (res && res.created) created++;
  }

  console.log(`Thumbnails created: ${created}`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
