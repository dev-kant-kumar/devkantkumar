import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, "../../dist");

function getHtmlFiles(dir, fileList = []) {
  if (!fs.existsSync(dir)) return fileList;
  
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getHtmlFiles(filePath, fileList);
    } else if (filePath.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

function auditHtmlFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const errors = [];
  const warnings = [];
  
  // Define Patterns
  const titlePattern = /<title[^>]*>([\s\S]*?)<\/title>/i;
  const descPattern = /<meta[^>]+(?:name=["']description["'][^>]+content=(?:"([^"]*)"|'([^']*)')|content=(?:"([^"]*)"|'([^']*)')[^>]+name=["']description["'])/i;
  const h1Pattern = /<h1[^>]*>/gi;
  const imgPattern = /<img[^>]*>/gi;
  
  // Title Check
  const titleMatch = content.match(titlePattern);
  if (!titleMatch || !titleMatch[1].trim()) {
    errors.push('Missing or empty <title> tag');
  } else if (titleMatch[1].length < 10 || titleMatch[1].length > 70) {
    warnings.push(`Title length is ${titleMatch[1].length} characters (Recommended 10-70)`);
  }
  
  // Description Check
  const descMatch = content.match(descPattern);
  if (!descMatch || (!descMatch[1] && !descMatch[2] && !descMatch[3] && !descMatch[4])) {
    errors.push('Missing <meta name="description"> tag');
  } else {
    const descContent = descMatch[1] || descMatch[2] || descMatch[3] || descMatch[4] || '';
    if (descContent.length < 50 || descContent.length > 160) {
      warnings.push(`Description length is ${descContent.length} characters (Recommended 50-160)`);
    }
  }
  
  // H1 Check
  const h1Matches = content.match(h1Pattern);
  if (!h1Matches || h1Matches.length === 0) {
    errors.push('Missing <h1> tag');
  } else if (h1Matches.length > 1) {
    warnings.push(`Found ${h1Matches.length} <h1> tags (Recommended exactly 1)`);
  }
  
  // Image Alt Attribute Check
  let imagesMissingAlt = 0;
  let imgMatch;
  while ((imgMatch = imgPattern.exec(content)) !== null) {
    if (!imgMatch[0].match(/alt=["'](.*?)["']/i)) {
      imagesMissingAlt++;
    }
  }
  if (imagesMissingAlt > 0) {
    warnings.push(`Found ${imagesMissingAlt} <img> tag(s) missing 'alt' attribute`);
  }

  return { errors, warnings };
}

function runAudit() {
  console.log("🔍 Starting SEO Audit on generated static files...");
  const htmlFiles = getHtmlFiles(distPath);
  
  if (htmlFiles.length === 0) {
    console.error("❌ No HTML files found in dist/. Did prerender run?");
    process.exit(1);
  }
  
  let totalErrors = 0;
  let totalWarnings = 0;
  
  for (const filePath of htmlFiles) {
    const relativePath = path.relative(distPath, filePath);
    // Skip 404 or some special files if needed
    if (relativePath.includes('google') || relativePath.includes('og-image-generator')) continue;
    
    const { errors, warnings } = auditHtmlFile(filePath);
    
    if (errors.length > 0 || warnings.length > 0) {
      console.log(`\n📄 File: /${relativePath}`);
      errors.forEach(err => { console.log(`  ❌ [ERROR] ${err}`); totalErrors++; });
      warnings.forEach(warn => { console.log(`  ⚠️ [WARN]  ${warn}`); totalWarnings++; });
    }
  }
  
  console.log(`\n===========================================`);
  console.log(`📊 SEO Audit Complete: Checked ${htmlFiles.length} pages.`);
  console.log(`   Errors: ${totalErrors} | Warnings: ${totalWarnings}`);
  
  // Uncomment the line below to strictly fail CI pipelines on errors
  // if (totalErrors > 0) process.exit(1);
}

runAudit();
