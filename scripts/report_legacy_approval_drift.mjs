// Diagnostic-only: catalog historical differences from the older approved manifest.
// Not an authorization to regenerate manifest hashes or accept the differences.
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const m=JSON.parse(fs.readFileSync(path.join(root,'docs/FROZEN_PAGES_20260930.json'),'utf8'));
const mismatches=[];
for(const [rel,sha] of Object.entries(m)){
  const file=path.resolve(root,rel);
  const bytes=fs.readFileSync(file);
  if(createHash('sha256').update(bytes).digest('hex')!==sha)mismatches.push(rel);
}
const output={date:'2026-11-09',classification:'Historical mismatch; NOT automatically unauthorized or damaged',manifest:'docs/FROZEN_PAGES_20260930.json',snapshot:'docs/PUBLISHED_PROTECTION_SNAPSHOT_20261109.json',oldApprovedCount:Object.keys(m).length,historicalMismatches:mismatches.length,paths:mismatches};
console.error('Legacy audit: '+mismatches.length+' of '+Object.keys(m).length+' protected pages differ from their earlier approved digests (not auto-approved).');
process.stdout.write(JSON.stringify(output,null,2)+'\n');
