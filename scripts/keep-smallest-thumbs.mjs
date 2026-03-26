import fs from 'fs/promises';
import path from 'path';

const dir = process.argv[2] || 'public/hero-images';

async function main() {
  const files = await fs.readdir(dir);
  const thumbs = files.filter(f => /-thumb/i.test(f));
  const groups = new Map();

  for (const f of thumbs) {
    const base = f.replace(/-thumb(?:-\d+)?(\.[^.]+)$/i, '');
    if (!groups.has(base)) groups.set(base, []);
    const full = path.join(dir, f);
    const stat = await fs.stat(full);
    groups.get(base).push({ name: f, path: full, size: stat.size });
  }

  let removed = 0;
  for (const [base, items] of groups) {
    if (items.length <= 1) continue;
    items.sort((a,b) => a.size - b.size);
    const keep = items[0];
    const remove = items.slice(1);
    for (const r of remove) {
      await fs.unlink(r.path);
      console.log(`Removed ${r.name} (kept ${keep.name})`);
      removed++;
    }
  }

  console.log(`Done. Removed ${removed} files.`);
}

main().catch(err => { console.error(err); process.exit(1); });
