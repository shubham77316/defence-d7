const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  for (let f of fs.readdirSync(dir)) {
    let p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) results.push(...walk(p));
    else if (p.endsWith('.tsx') || p.endsWith('.ts')) results.push(p);
  }
  return results;
}

for (let file of walk('src')) {
  let c = fs.readFileSync(file, 'utf8');
  if (c.includes('>Submit<') || c.includes('> Submit <') || c.includes('type="submit"')) {
    console.log(file);
  }
}

