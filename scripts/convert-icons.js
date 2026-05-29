/* eslint-disable no-console */
/**
 * Convert every PNG under public/icons/ to WebP at quality 92.
 * Originals are copied to public/icons/_png-backup/ preserving the relative tree.
 *
 * Usage:  node scripts/convert-icons.js
 */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..", "public", "icons");
const BACKUP = path.join(ROOT, "_png-backup");

function walk(dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.name === "_png-backup") continue;
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p, acc);
    else if (entry.isFile() && entry.name.toLowerCase().endsWith(".png")) {
      acc.push(p);
    }
  }
  return acc;
}

async function convert() {
  if (!fs.existsSync(ROOT)) {
    console.error("icons folder missing:", ROOT);
    process.exit(1);
  }
  const files = walk(ROOT);
  console.log(`Found ${files.length} PNG files.`);

  let total = 0;
  let savedBytes = 0;

  for (const file of files) {
    const rel = path.relative(ROOT, file);
    const backupTarget = path.join(BACKUP, rel);
    const webpTarget = file.replace(/\.png$/i, ".webp");

    fs.mkdirSync(path.dirname(backupTarget), { recursive: true });
    if (!fs.existsSync(backupTarget)) {
      fs.copyFileSync(file, backupTarget);
    }

    const before = fs.statSync(file).size;
    await sharp(file)
      .webp({ quality: 92, effort: 6 })
      .toFile(webpTarget);
    const after = fs.statSync(webpTarget).size;

    fs.unlinkSync(file);

    savedBytes += before - after;
    total += 1;
    console.log(
      `  ${rel.padEnd(40)} ${before.toString().padStart(7)}B -> ${after
        .toString()
        .padStart(7)}B  (-${Math.round((1 - after / before) * 100)}%)`
    );
  }

  console.log(
    `\nConverted ${total} files. Saved ${(savedBytes / 1024).toFixed(1)} KB.`
  );
  console.log(`Originals backed up to ${BACKUP}`);
}

convert().catch((err) => {
  console.error(err);
  process.exit(1);
});
