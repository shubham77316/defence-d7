const fs = require('fs');
const file = 'd:/defence/src/app/careers/page.tsx';
let c = fs.readFileSync(file, 'utf8');

// The file ends with:
//   </div>\r  -> line 678 closes the <div className="min-h-screen...">
// We need to close the two extra divs we added (outer content + max-w-7xl)
// Inject two closing divs before the final </div>

c = c.replace(
  '      )}\r\n    </div>\r\n  );\r\n}',
  '      )}\r\n    </div>\r\n      </div>\r\n      </div>\r\n  );\r\n}'
);

fs.writeFileSync(file, c, 'utf8');
console.log('Done');

