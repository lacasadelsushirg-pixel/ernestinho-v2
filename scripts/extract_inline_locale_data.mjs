import vm from 'node:vm';

let source = '';
for await (const chunk of process.stdin) source += chunk;

const dStart = source.indexOf('const D=');
if (dStart < 0) throw new Error('No D locale object found');
let dEnd = source.indexOf(';const story=', dStart);
if (dEnd < 0) dEnd = source.indexOf(';function setLang', dStart);
if (dEnd < 0) throw new Error('Could not isolate the D locale object');
const dLiteral = source.slice(dStart + 'const D='.length, dEnd);
const D = vm.runInNewContext(`(${dLiteral})`, Object.create(null), { timeout: 1000 });

let story = null;
const storyStart = source.indexOf('const story=');
if (storyStart >= 0) {
  const storyEnd = source.indexOf(';function setLang', storyStart);
  if (storyEnd < 0) throw new Error('Could not isolate the story locale object');
  const storyLiteral = source.slice(storyStart + 'const story='.length, storyEnd);
  story = vm.runInNewContext(`(${storyLiteral})`, Object.create(null), { timeout: 1000 });
}

process.stdout.write(JSON.stringify({ D, story }));
