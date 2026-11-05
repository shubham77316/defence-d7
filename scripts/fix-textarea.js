const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'app', 'contact', 'page.tsx');
let code = fs.readFileSync(filePath, 'utf8');

const isCrlf = code.includes('\r\n');
const lines = code.split(/\r?\n/);

const textareaIdx = lines.findIndex(l => l.includes('placeholder="Tell us about your enquiry"'));
console.log('textareaIdx:', textareaIdx);

if (textareaIdx !== -1) {
  // Find the start of <textarea and end />
  let start = textareaIdx;
  while (start >= 0 && !lines[start].includes('<textarea')) {
    start--;
  }
  let end = textareaIdx;
  while (end < lines.length && !lines[end].includes('/>')) {
    end++;
  }

  console.log('start:', start, 'end:', end);
  const replacement = [
    '                  <textarea',
    '                    rows={1}',
    '                    name="message"',
    '                    value={formData.message}',
    '                    onChange={(e) => {',
    '                      handleChange(e);',
    '                      e.target.style.height = "auto";',
    '                      e.target.style.height = `${e.target.scrollHeight}px`;',
    '                    }}',
    '                    placeholder="Tell us about your enquiry"',
    '                    required',
    '                    className="w-full bg-transparent border-b border-white/20 hover:border-white/40 focus:border-[#7ec8ff] pb-2 text-sm text-white placeholder-slate-500 focus:outline-none transition-colors resize-none overflow-hidden"',
    '                  />'
  ];

  lines.splice(start, end - start + 1, ...replacement);
  fs.writeFileSync(filePath, lines.join(isCrlf ? '\r\n' : '\n'), 'utf8');
  console.log('Successfully updated textarea!');
}

