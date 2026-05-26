const fs = require('fs');
const path = require('path');

function walk(dir) {
  fs.readdirSync(dir).forEach(file => {
    let fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') walk(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let changed = false;

      if (content.includes('#0e3d26')) {
        // Tła na Granat
        content = content.replace(/bg-\[\#0e3d26\]/g, 'bg-[#001f3f]');
        content = content.replace(/from-\[\#0e3d26\]/g, 'from-[#001f3f]');
        content = content.replace(/border-\[\#0e3d26\]/g, 'border-[#001f3f]');
        
        // Akcenty textu na Złoto #996515
        content = content.replace(/text-\[\#0e3d26\]/g, 'text-[#996515]');
        
        // Cokolwiek zostało niech będzie granatowe
        content = content.replace(/#0e3d26/g, '#001f3f');
        changed = true;
      }

      if (content.includes('#155436')) {
        content = content.replace(/#155436/g, '#001f3f');
        changed = true;
      }
      
      if (content.includes('#006400')) {
        content = content.replace(/#006400/g, '#001f3f');
        changed = true;
      }

      if (changed) {
        fs.writeFileSync(fullPath, content);
        console.log('Zaktualizowano kolory w: ', fullPath);
      }
    }
  });
}

walk('./app');
walk('./components');
