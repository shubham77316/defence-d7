const fs = require('fs');
const file = 'd:/defence/src/app/careers/page.tsx';
let c = fs.readFileSync(file, 'utf8');

// Replace the lead-avionics card rendering with the Image 1 editorial green design
// while keeping other cards clean and dark.
// Notice: No x: -90 translation! Already centered!

const oldCardStart = `              <motion.div
                key={pos.id}
                initial={pos.id === "lead-avionics" ? { opacity: 0, x: -90 } : false}
                whileInView={pos.id === "lead-avionics" ? { opacity: 1, x: 0 } : undefined}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={\`bg-[#050c1c]/90 border border-slate-800/90 hover:border-[#1a4a75]/80 rounded-2xl p-6 sm:p-7 transition-colors duration-300 shadow-[0_12px_35px_rgba(0,0,0,0.6)] group \${
                  pos.id === "lead-avionics"
                    ? "lg:col-span-2 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(220px,0.7fr)] gap-x-8"
                    : "flex flex-col justify-between"
                }\`}`;

// Check if oldCardStart exists
if (!c.includes('initial={pos.id === "lead-avionics" ? { opacity: 0, x: -90 } : false}')) {
  console.log('Target string not found, searching with regex');
} else {
  console.log('Found oldCardStart!');
}

