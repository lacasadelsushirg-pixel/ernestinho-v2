// Fail-closed content gate for the approved Rio pages and critical shared layout assets.
// Owner-authorized baseline: 2026-11-09, after restoration of /quiero/.
// A new approval MUST name affected paths and be reviewed before changing these pinned blobs.
// Changing this guard is itself a protected governance action; GitHub branch rules must enforce human review.
import fs from 'node:fs';
import path from 'node:path';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const APPROVED_BLOBS = Object.freeze({
  "docs/FROZEN_PAGES_20260930.json": "30b57d0ff39aa1dde138aeff75cd688a4f48da1a",
  "assets/js/site.js": "6d7ce163f59235ca0f7de3c7f219183759f5ad5e",
  "assets/js/i18n.js": "230bafc0a0f68928374251aac71e77d21bf7325c",
  "assets/js/locale-routing.js": "95044c8ac7cda43b374a903475c2c280bcb628e4",
  "assets/js/app.js": "ab5e3ee031f0ea6b49e91c7e7312228391177f69",
  "assets/js/bulk-photo-references.js": "0302793e70b66bc617eb54fbf6855ce4c3e51246",
  "assets/js/translations/home.js": "6df6a61ccef0f2941707ff065c610077ae918510",
  "assets/js/translations/quiero.js": "3542e0c0a6cff62084b3dea25c2038d60f74c3da",
  "assets/css/tokens.css": "640bd71020c162ec2a05360c07817e1e07549fa6",
  "assets/css/app.css": "0fbeba7cf9b8631405e7c3cd514d2f9e0a146b96",
  "assets/css/components.css": "2190cb5315924f02ed4db5c913ad2486e085e90c"
});
const MANIFEST_PATH = 'docs/FROZEN_PAGES_20260930.json';
const PUBLISHED_SNAPSHOT_PATH = 'docs/PUBLISHED_PROTECTION_SNAPSHOT_20261109.json';
const PUBLISHED_SNAPSHOT_BLOB = 'fe9d73bb386c482afe10c05f59c7591309f19268';
const APPROVED_PAGE_COUNT = 586;

function gitBlobHash(bytes) {
  return createHash('sha1').update(Buffer.from('blob ' + bytes.length + '\0')).update(bytes).digest('hex');
}
function sha256(bytes) { return createHash('sha256').update(bytes).digest('hex'); }
function loadPath(root, rel, problems) {
  const file = path.resolve(root, rel);
  if (file !== root && !file.startsWith(root + path.sep)) {
    problems.push('Unsafe protected file path: ' + rel);
    return null;
  }
  try { return fs.readFileSync(file); }
  catch { problems.push('Missing protected file: ' + rel); return null; }
}
export function verifyApprovedContent(root = ROOT) {
  const problems = [];
  const manifestBytes = loadPath(root, MANIFEST_PATH, problems);
  if (!manifestBytes) throw new Error('Protected content gate: ' + problems.join('; '));
  const actualManifestBlob = gitBlobHash(manifestBytes);
  if (actualManifestBlob !== APPROVED_BLOBS[MANIFEST_PATH]) {
    problems.push('Approved-pages manifest was modified or its approval baseline was rewritten: ' + MANIFEST_PATH);
  }
  let manifest = {};
  try { manifest = JSON.parse(manifestBytes.toString('utf8')); }
  catch { problems.push('Invalid approved-pages manifest JSON'); }
  if (Object.keys(manifest).length !== APPROVED_PAGE_COUNT) {
    problems.push('Protected page inventory changed: ' + Object.keys(manifest).length + ' instead of ' + APPROVED_PAGE_COUNT);
  }
  // Separate old approval-record discrepancies from new post-publication mutations.
  // The original manifest stays immutable and the historical differences remain reportable.
  const publishedBytes = loadPath(root, PUBLISHED_SNAPSHOT_PATH, problems);
  let published = {};
  if (publishedBytes && gitBlobHash(publishedBytes) !== PUBLISHED_SNAPSHOT_BLOB) {
    problems.push('Published provenance snapshot changed without human-reviewed authorization');
  }
  try { published = JSON.parse(publishedBytes?.toString('utf8') || '{}'); }
  catch { problems.push('Published provenance snapshot is invalid JSON'); }
  if (published.publishedCommit !== '02968a27acd166e06b66c95df8f20074de881429' || Object.keys(published.protectedFiles || {}).length !== APPROVED_PAGE_COUNT) {
    problems.push('Invalid or incomplete published protection snapshot');
  }
  const historicalDrift = [];
  for (const [rel, expectedDigest] of Object.entries(manifest)) {
    const bytes = loadPath(root, rel, problems);
    if (!bytes) continue;
    if (!published.protectedFiles?.[rel] || gitBlobHash(bytes) !== published.protectedFiles[rel]) {
      problems.push('Protected HTML changed since last published release: ' + rel);
    }
    if (sha256(bytes) !== expectedDigest) historicalDrift.push(rel);
  }
  if (historicalDrift.length) {
    console.warn('HISTORICAL APPROVAL DRIFT: ' + historicalDrift.length +
      ' existing files differ from the older approved manifest. These are NOT approved by the provisional snapshot. ' +
      'Full list: node scripts/report_legacy_approval_drift.mjs');
  }
  for (const [rel, expectedBlob] of Object.entries(APPROVED_BLOBS)) {
    if (rel === MANIFEST_PATH) continue;
    const bytes = loadPath(root, rel, problems);
    if (bytes && gitBlobHash(bytes) !== expectedBlob) problems.push('Shared visual/runtime asset changed: ' + rel);
  }
  if (problems.length) {
    throw new Error('PUBLICATION BLOCKED: ' + problems.length + ' approved-content violations.\n'
      + problems.slice(0, 20).join('\n')
      + (problems.length > 20 ? '\n... and ' + (problems.length - 20) + ' more.' : '')
      + '\nDo not regenerate hashes automatically. Obtain explicit owner approval for exact paths; record the reviewed changes and update the approved baseline only through a human-reviewed change.');
  }
  console.log('CONTENT GATE PASS: ' + APPROVED_PAGE_COUNT + ' files unchanged since last published release; old approved manifest retained for historical audit; ' + (Object.keys(APPROVED_BLOBS).length - 1) + ' critical visual/runtime assets pinned.');
  return true;
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try { verifyApprovedContent(); }
  catch (error) { console.error(error.message); process.exitCode = 1; }
}
