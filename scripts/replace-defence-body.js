const fs = require('fs');
const file = 'd:/defence/src/app/news/page.tsx';
let content = fs.readFileSync(file, 'utf8');

const startMarker = '          {/* SECOND IMAGE DATA: Lead Callout, Highlights Box, and Hardened Platforms Section */}\r\n          <div className="space-y-8 text-slate-200 text-base sm:text-[17px] leading-relaxed">';
const endMarker = '          {/* FOURTH IMAGE DATA: Back Button + Related Strategic Reports */}';

const si = content.indexOf(startMarker);
const ei = content.indexOf(endMarker, si);

if (si === -1 || ei === -1) {
  console.log('ERROR: markers not found. si=' + si + ' ei=' + ei);
  process.exit(1);
}

const newContent = `          {/* Article Body Content */}
          <div className="space-y-8 mt-8 text-slate-200">

            {/* Section 1 */}
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Ut Enim Ad Minim Veniam
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.
              </p>
            </div>

            {/* Section 2 */}
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Quis Nostrud Exercitation
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis.
              </p>
            </div>

            {/* Section 3 */}
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Ullamco Laboris Nisi Ut Aliquip
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur? At vero eos et accusamus et iusto odio.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, simillique sunt in culpa qui officia deserunt mollitia.
              </p>
            </div>

            {/* Section 4 */}
            <div className="space-y-3">
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Sunt In Culpa Qui Officia
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.
              </p>
            </div>

          </div>\r\n\r\n          `;

content = content.substring(0, si) + newContent + content.substring(ei);
fs.writeFileSync(file, content, 'utf8');
console.log('Done - defence article body replaced');

