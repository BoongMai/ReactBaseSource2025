#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import zlib from 'zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Bundle Analyzer Script
 * Analyzes the built bundle and provides insights about chunk sizes
 */

const DIST_DIR = path.join(__dirname, '../dist');
const ASSETS_DIR = path.join(DIST_DIR, 'js');

function formatBytes(bytes) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function analyzeBundle() {
  console.log('🔍 Analyzing bundle...\n');

  if (!fs.existsSync(DIST_DIR)) {
    console.error(
      '❌ Dist directory not found. Please run "npm run build" first.'
    );
    process.exit(1);
  }

  const files = fs.readdirSync(ASSETS_DIR);
  const jsFiles = files.filter(file => file.endsWith('.js'));
  const cssFiles = files.filter(file => file.endsWith('.css'));

  console.log('📊 Bundle Analysis Results:\n');

  // Analyze JS files
  console.log('📦 JavaScript Chunks:');
  console.log('─'.repeat(50));

  const jsStats = jsFiles
    .map(file => {
      const filePath = path.join(ASSETS_DIR, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        size: stats.size,
        gzippedSize: getGzippedSize(filePath),
      };
    })
    .sort((a, b) => b.size - a.size);

  jsStats.forEach(file => {
    const sizeRatio = ((file.size / jsStats[0].size) * 100).toFixed(1);
    console.log(
      `${file.name.padEnd(30)} ${formatBytes(file.size).padEnd(10)} (${sizeRatio}%)`
    );
  });

  // Analyze CSS files
  console.log('\n🎨 CSS Files:');
  console.log('─'.repeat(50));

  const cssStats = cssFiles
    .map(file => {
      const filePath = path.join(ASSETS_DIR, file);
      const stats = fs.statSync(filePath);
      return {
        name: file,
        size: stats.size,
        gzippedSize: getGzippedSize(filePath),
      };
    })
    .sort((a, b) => b.size - a.size);

  cssStats.forEach(file => {
    const sizeRatio = ((file.size / cssStats[0].size) * 100).toFixed(1);
    console.log(
      `${file.name.padEnd(30)} ${formatBytes(file.size).padEnd(10)} (${sizeRatio}%)`
    );
  });

  // Total sizes
  const totalJsSize = jsStats.reduce((sum, file) => sum + file.size, 0);
  const totalCssSize = cssStats.reduce((sum, file) => sum + file.size, 0);
  const totalSize = totalJsSize + totalCssSize;

  console.log('\n📈 Summary:');
  console.log('─'.repeat(50));
  console.log(`Total JS size:     ${formatBytes(totalJsSize)}`);
  console.log(`Total CSS size:    ${formatBytes(totalCssSize)}`);
  console.log(`Total bundle size: ${formatBytes(totalSize)}`);

  // Performance recommendations
  console.log('\n💡 Performance Recommendations:');
  console.log('─'.repeat(50));

  const largeChunks = jsStats.filter(file => file.size > 100000); // > 100KB
  if (largeChunks.length > 0) {
    console.log('⚠️  Large chunks detected:');
    largeChunks.forEach(chunk => {
      console.log(`   - ${chunk.name}: ${formatBytes(chunk.size)}`);
    });
    console.log('   Consider code splitting or lazy loading for these chunks.');
  }

  if (totalSize > 1000000) {
    // > 1MB
    console.log('⚠️  Total bundle size is large (>1MB). Consider:');
    console.log('   - Tree shaking unused code');
    console.log('   - Dynamic imports for large features');
    console.log('   - Image optimization');
  }

  // Check for vendor chunks
  const vendorChunks = jsStats.filter(file => file.name.includes('vendor'));
  if (vendorChunks.length > 0) {
    const vendorSize = vendorChunks.reduce((sum, file) => sum + file.size, 0);
    console.log(`📦 Vendor chunks: ${formatBytes(vendorSize)}`);
  }

  console.log('\n✅ Bundle analysis complete!');
}

function getGzippedSize(filePath) {
  try {
    const content = fs.readFileSync(filePath);
    const gzipped = zlib.gzipSync(content);
    return gzipped.length;
  } catch (error) {
    return 0;
  }
}

// Run analysis
analyzeBundle();
