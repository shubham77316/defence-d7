const fs = require('fs');
const file = 'd:/defence/src/app/careers/page.tsx';
let c = fs.readFileSync(file, 'utf8');

// Replace the broken end
const oldEnd = '      )}\r\n    </div>\r\n      </div>\r\n      </div>\r\n  );\r\n}';
const newEnd = '      )}\r\n    </div>\r\n      </div>\r\n    </div>\r\n  );\r\n}';

c = c.replace(oldEnd, newEnd);
fs.writeFileSync(file, c, 'utf8');
console.log('Fixed');

