#!/usr/bin/env node
import fs from "node:fs/promises";
import crypto from "node:crypto";

const ROOT = new URL("../", import.meta.url);
const DATA_PATH = new URL("assets/data/portugues-util.json", ROOT);
const dryRun = process.argv.includes("--dry-run");
const force = process.argv.includes("--force");
const listVoices = process.argv.includes("--list-voices");

function arg(name) {
  const i = process.argv.indexOf(name);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

const elevenKey = process.env.ELEVENLABS_API_KEY;
const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const cloudKey = process.env.CLOUDINARY_API_KEY;
const cloudSecret = process.env.CLOUDINARY_API_SECRET;

if (!elevenKey) throw new Error("Falta ELEVENLABS_API_KEY.");

async function chooseVoice() {
  const explicit = arg("--voice-id") || process.env.ELEVENLABS_VOICE_ID;
  if (explicit) return explicit;

  const url = new URL("https://api.elevenlabs.io/v1/shared-voices");
  url.searchParams.set("language", "pt");
  url.searchParams.set("locale", "pt-BR");
  url.searchParams.set("category", "professional");
  url.searchParams.set("page_size", "30");
  const response = await fetch(url, { headers: { "xi-api-key": elevenKey } });
  if (!response.ok) throw new Error(`No pude buscar voces pt-BR: ${response.status} ${await response.text()}`);
  const body = await response.json();
  const voices = body.voices || [];
  if (listVoices) {
    for (const voice of voices) {
      console.log(`${voice.voice_id}\t${voice.name || ""}\t${voice.accent || ""}\t${voice.gender || ""}\t${voice.preview_url || ""}`);
    }
    process.exit(0);
  }
  const preferred = voices.find(v => /brazil/i.test(v.accent || "")) || voices[0];
  if (!preferred?.voice_id) throw new Error("No encontré una voz profesional pt-BR. Define ELEVENLABS_VOICE_ID.");
  console.log(`Voz seleccionada automáticamente: ${preferred.name || preferred.voice_id} (${preferred.voice_id})`);
  return preferred.voice_id;
}

function cloudAuth() {
  return "Basic " + Buffer.from(`${cloudKey}:${cloudSecret}`).toString("base64");
}

async function currentAsset(publicId) {
  const encoded = encodeURIComponent(publicId);
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/resources/video/upload/${encoded}?context=true`;
  const response = await fetch(url, { headers: { Authorization: cloudAuth() } });
  if (response.status === 404) return null;
  if (!response.ok) throw new Error(`Cloudinary Admin API ${response.status}: ${await response.text()}`);
  return response.json();
}

async function synthesize(text, voiceId) {
  const url = `https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}?output_format=mp3_44100_128`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "xi-api-key": elevenKey,
      "content-type": "application/json",
      "accept": "audio/mpeg"
    },
    body: JSON.stringify({
      text,
      model_id: "eleven_multilingual_v2",
      language_code: "pt",
      voice_settings: {
        stability: 0.55,
        similarity_boost: 0.8,
        style: 0.15,
        use_speaker_boost: true
      }
    })
  });
  if (!response.ok) throw new Error(`ElevenLabs ${response.status}: ${await response.text()}`);
  return new Uint8Array(await response.arrayBuffer());
}

function sign(params) {
  const payload = Object.entries(params)
    .filter(([, value]) => value !== undefined && value !== null && value !== "")
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  return crypto.createHash("sha1").update(payload + cloudSecret).digest("hex");
}

async function upload(mp3, publicId, phraseHash, voiceId) {
  const timestamp = Math.floor(Date.now() / 1000);
  const context = `phrase_hash=${phraseHash}|voice_id=${voiceId}|locale=pt-BR`;
  const params = {
    context,
    overwrite: "true",
    public_id: publicId,
    timestamp: String(timestamp)
  };
  const form = new FormData();
  form.set("api_key", cloudKey);
  form.set("timestamp", String(timestamp));
  form.set("public_id", publicId);
  form.set("overwrite", "true");
  form.set("context", context);
  form.set("signature", sign(params));
  form.set("file", new Blob([mp3], { type: "audio/mpeg" }), publicId.split("/").pop() + ".mp3");
  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/video/upload`, {
    method: "POST",
    body: form
  });
  if (!response.ok) throw new Error(`Cloudinary upload ${response.status}: ${await response.text()}`);
  return response.json();
}

const data = JSON.parse(await fs.readFile(DATA_PATH, "utf8"));
if (!cloudName || !cloudKey || !cloudSecret) {
  if (!dryRun && !listVoices) {
    throw new Error("Faltan CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY o CLOUDINARY_API_SECRET.");
  }
}
const voiceId = await chooseVoice();
if (listVoices) process.exit(0);

let generated = 0;
let skipped = 0;

for (const item of data.phrases) {
  const publicId = `${data.audioBase}/${item.id}`;
  const phraseHash = crypto.createHash("sha256")
    .update(JSON.stringify({ text: item.pt, voiceId, model: "eleven_multilingual_v2", locale: "pt-BR" }))
    .digest("hex")
    .slice(0, 20);

  if (!force && !dryRun) {
    const asset = await currentAsset(publicId);
    const oldHash = asset?.context?.custom?.phrase_hash;
    if (oldHash === phraseHash) {
      skipped++;
      console.log(`SKIP ${item.id}`);
      continue;
    }
  }

  if (dryRun) {
    console.log(`DRY ${item.id}: ${item.pt}`);
    generated++;
    continue;
  }

  console.log(`GEN ${item.id}: ${item.pt}`);
  const mp3 = await synthesize(item.pt, voiceId);
  await upload(mp3, publicId, phraseHash, voiceId);
  generated++;
}

console.log(`Português útil: ${generated} generados/actualizados, ${skipped} sin cambios, total ${data.phrases.length}.`);
