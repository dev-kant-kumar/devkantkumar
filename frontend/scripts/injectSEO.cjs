const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../src/apps/MarketPlace/pages');

function pascalToSpaced(str) {
  return str.replace(/([A-Z])/g, ' $1').trim();
}

function processDirectory(dir) {
  const items = fs.readdirSync(dir);
  
  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (stat.isFile() && fullPath.endsWith('.jsx')) {
      processFile(fullPath);
    }
  }
}

function processFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf-8');
  
  // Skip if it already has SEO Head
  if (content.includes('SEOHead') || content.includes('MarketPlaceSEO')) {
    return;
  }
  
  const componentName = path.basename(filePath, '.jsx');
  const title = pascalToSpaced(componentName);

  // Simple heuristic: find the top level return statement with a wrapper div/fragment
  // It's a bit tricky to parse generic React, let's try regex:
  // look for `return (` and insert the MarketPlaceSEO right after it.
  
  const returnRegex = /return\s*\(\s*(<[a-zA-Z]+[^>]*>|<>)/;
  const match = content.match(returnRegex);
  
  if (match) {
    const wrapper = match[1];
    const seoInjected = `
      <MarketPlaceSEO title="${title}" />
      `;
    
    content = content.replace(returnRegex, `return (\n    ${wrapper}${seoInjected}`);
    
    // Add import
    const importStatement = `import MarketPlaceSEO from '${getRelativeImportPath(filePath, 'src/apps/MarketPlace/components/SEO/MarketPlaceSEO.jsx')}';\n`;
    
    // Add to top (after other imports)
    const lastImportIndex = content.lastIndexOf('import ');
    if (lastImportIndex !== -1) {
      const endOfLine = content.indexOf('\n', lastImportIndex);
      content = content.slice(0, endOfLine + 1) + importStatement + content.slice(endOfLine + 1);
    } else {
      content = importStatement + content;
    }
    
    fs.writeFileSync(filePath, content);
    console.log(`Injected SEO into ${componentName}`);
  } else {
    console.log(`Could not inject SEO into ${componentName} automatically. (No standard return bracket found)`);
  }
}

function getRelativeImportPath(fromFile, toFileFull) {
  const toFile = path.resolve(__dirname, '..', toFileFull);
  let rel = path.relative(path.dirname(fromFile), toFile);
  rel = rel.replace(/\\/g, '/');
  if (!rel.startsWith('.')) rel = './' + rel;
  return rel.replace('.jsx', '');
}

processDirectory(pagesDir);
