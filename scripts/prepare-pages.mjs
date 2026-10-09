import fs from 'node:fs';
import path from 'node:path';

const deployDir = 'deploy';

// Clean or create deploy directory
if (fs.existsSync(deployDir)) {
  fs.rmSync(deployDir, { recursive: true, force: true });
}
fs.mkdirSync(deployDir, { recursive: true });

// 1. Copy public directory
function copyDirSync(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('1. Copying public assets...');
copyDirSync('public', deployDir);

// 2. Copy .next/static to deploy/_next/static
console.log('2. Copying Next.js static assets...');
const nextStatic = path.join('.next', 'static');
if (fs.existsSync(nextStatic)) {
  copyDirSync(nextStatic, path.join(deployDir, '_next', 'static'));
}

// 3. Copy HTML pages
console.log('3. Copying HTML pages...');
const appServerDir = path.join('.next', 'server', 'app');

function copyHtmlPages(src, baseDest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const fullSrc = path.join(src, entry.name);
    if (entry.isDirectory()) {
      copyHtmlPages(fullSrc, baseDest);
    } else if (entry.name.endsWith('.html')) {
      const relPath = path.relative(appServerDir, fullSrc);
      const targetPath = path.join(baseDest, relPath);
      fs.mkdirSync(path.dirname(targetPath), { recursive: true });
      fs.copyFileSync(fullSrc, targetPath);

      // Also create directory with index.html for clean URLs (e.g. pond-doctor/index.html)
      const baseName = path.basename(relPath, '.html');
      if (baseName !== 'index' && baseName !== '_not-found') {
        const cleanDir = path.join(baseDest, path.dirname(relPath), baseName);
        fs.mkdirSync(cleanDir, { recursive: true });
        fs.copyFileSync(fullSrc, path.join(cleanDir, 'index.html'));
      } else if (baseName === '_not-found') {
        fs.copyFileSync(fullSrc, path.join(baseDest, '404.html'));
      }
    }
  }
}

if (fs.existsSync(appServerDir)) {
  copyHtmlPages(appServerDir, deployDir);
}

console.log('✅ Deployment bundle successfully prepared in /deploy');
