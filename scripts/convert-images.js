/* Usage: `npm run convert-images` — converts every PNG under public/images to WebP at q=90, backs up originals to public/images/_png-backup, skips files that already have a matching .webp. */
/* eslint-disable no-console */
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

const ROOT = path.join(__dirname, "..", "public", "images");
const BACKUP = path.join(ROOT, "_png-backup");

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
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
    console.log(`No public/images directory yet. Nothing to do.`);
    return;
  }
  const files = walk(ROOT);
  if (files.length === 0) {
    console.log("No PNG files found under public/images/.");
    return;
  }
  console.log(`Found ${files.length} PNG files.`);

  let converted = 0;
  let skipped = 0;
  let savedBytes = 0;

  for (const file of files) {
    const rel = path.relative(ROOT, file);
    const webpTarget = file.replace(/\.png$/i, ".webp");
    if (fs.existsSync(webpTarget)) {
      console.log(`  skip  ${rel} (matching .webp already exists)`);
      skipped += 1;
      continue;
    }

    const backupTarget = path.join(BACKUP, rel);
    fs.mkdirSync(path.dirname(backupTarget), { recursive: true });
    if (!fs.existsSync(backupTarget)) {
      fs.copyFileSync(file, backupTarget);
    }

    const before = fs.statSync(file).size;
    await sharp(file).webp({ quality: 90, effort: 6 }).toFile(webpTarget);
    const after = fs.statSync(webpTarget).size;
    fs.unlinkSync(file);

    savedBytes += before - after;
    converted += 1;
    const ratio = Math.round((1 - after / before) * 100);
    console.log(
      `  ok    ${rel.padEnd(48)} ${before
        .toString()
        .padStart(8)}B -> ${after.toString().padStart(8)}B  (${ratio >= 0 ? "-" : "+"}${Math.abs(ratio)}%)`
    );
  }

  console.log(
    `\nConverted ${converted} files. Skipped ${skipped}. Saved ${(savedBytes / 1024).toFixed(1)} KB.`
  );
  if (converted > 0) console.log(`Originals backed up to ${BACKUP}`);
}

convert().catch((err) => {
  console.error(err);
  process.exit(1);
});
