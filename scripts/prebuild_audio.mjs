#!/usr/bin/env node
if (process.env.GENERATE_PORTUGUES_AUDIO === "1") {
  console.log("Português útil: generación de audio habilitada para este build.");
  await import("./generate_portugues_audio.mjs");
} else {
  console.log("Português útil: generación de audio omitida (GENERATE_PORTUGUES_AUDIO != 1).");
}
