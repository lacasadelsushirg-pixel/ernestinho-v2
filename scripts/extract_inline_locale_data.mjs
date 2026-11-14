import vm from 'node:vm';

let source = '';
for await (const chunk of process.stdin) source += chunk;

function extractConstant(name) {
  const declaration = `const ${name}=`;
  const start = source.indexOf(declaration);
  if (start < 0) return null;
  const literalStart = start + declaration.length;
  const nextDeclaration = /;\s*(?:const|function|let|var)\b/g;
  nextDeclaration.lastIndex = literalStart;
  const end = nextDeclaration.exec(source)?.index;
  if (end === undefined) throw new Error(`Could not isolate ${name} locale object`);
  const literal = source.slice(literalStart, end);
  return vm.runInNewContext(`(${literal})`, Object.create(null), { timeout: 1000 });
}

const data = {};
for (const name of ['D', 'T', 'story', 'S', 'A']) {
  const value = extractConstant(name);
  if (value !== null) data[name] = value;
}
process.stdout.write(JSON.stringify(data));
