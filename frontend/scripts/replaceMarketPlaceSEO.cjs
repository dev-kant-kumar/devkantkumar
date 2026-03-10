const fs = require("fs");
const path = require("path");

const dir = path.join(__dirname, "../src/apps/MarketPlace");

function processDirectory(currentDir) {
  const items = fs.readdirSync(currentDir);
  for (const item of items) {
    const fullPath = path.join(currentDir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (stat.isFile() && fullPath.endsWith(".jsx")) {
      let content = fs.readFileSync(fullPath, "utf8");

      let modified = false;

      // Replace import
      if (content.includes("import SEOHead from")) {
        // Need to calculate the correct relative path to early created MarketPlaceSEO
        // "src/apps/MarketPlace/components/SEO/MarketPlaceSEO.jsx"
        const seoPath = path.join(
          __dirname,
          "../src/apps/MarketPlace/components/SEO/MarketPlaceSEO.jsx",
        );
        let rel = path
          .relative(path.dirname(fullPath), seoPath)
          .replace(/\\/g, "/");
        if (!rel.startsWith(".")) rel = "./" + rel;
        rel = rel.replace(".jsx", "");

        content = content.replace(
          /import SEOHead from [^;]+;/,
          `import MarketPlaceSEO from '${rel}';`,
        );
        modified = true;
      }

      // Replace JSX tag
      if (content.includes("<SEOHead")) {
        content = content.replace(/<SEOHead/g, "<MarketPlaceSEO");
        content = content.replace(/<\/SEOHead>/g, "</MarketPlaceSEO>");
        modified = true;
      }

      if (modified) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${path.basename(fullPath)} to use MarketPlaceSEO`);
      }
    }
  }
}

processDirectory(dir);
