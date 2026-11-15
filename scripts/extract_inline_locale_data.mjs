import vm from 'node:vm';

let source = '';
for await (const chunk of process.stdin) source += chunk;

function extractConstant(name) {
  const declaration = `const ${name}=`;
  const start = source.indexOf(declaration);
  if (start < 0) return null;
  const literalStart = start + declaration.length;
  const open = source[literalStart];
  const close = open === '{' ? '}' : open === '[' ? ']' : null;
  if (!close) throw new Error(`Expected ${name} to be an object or array literal`);
  let depth = 0, quote = null, escaped = false, end = -1;
  for (let i = literalStart; i < source.length; i++) {
    const char = source[i];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === '\\') escaped = true;
      else if (char === quote) quote = null;
      continue;
    }
    if (char === '"' || char === "'" || char === '`') { quote = char; continue; }
    if (char === open) depth++;
    else if (char === close && --depth === 0) { end = i + 1; break; }
  }
  if (end < 0) throw new Error(`Could not isolate ${name} locale object`);
  const literal = source.slice(literalStart, end);
  return vm.runInNewContext(`(${literal})`, Object.create(null), { timeout: 1000 });
}

const data = {};
for (const name of ['D', 'T', 'story', 'S', 'A']) {
  const value = extractConstant(name);
  if (value !== null) data[name] = value;
}
process.stdout.write(JSON.stringify(data));
