/**
 * Schreibt die Quelldateien, packt das Kompendium mit dem offiziellen Foundry-Werkzeug,
 * schreibt module.json und das ZIP.
 */
import fs from "node:fs";
import path from "node:path";
import { compilePack } from "@foundryvtt/foundryvtt-cli";
import { zipSync } from "fflate";

export const MODUL_ID = "motherboard-adversaries";
export const PACK_NAME = "adversaries";

export function modulManifest(version, einst) {
  const repo = einst.github;
  const manifest = {
    id: MODUL_ID,
    title: "Motherboard: Adversaries",
    description: "All adversaries and environments of the Daggerheart campaign <em>White Signal</em> as a compendium, built from the Obsidian notes.",
    version,
    authors: [{ name: "Chezzy" }],
    compatibility: { minimum: "14", verified: "14.365" },
    relationships: {
      systems: [{ id: "daggerheart", type: "system", compatibility: { minimum: "2.12.9" } }]
    },
    packs: [{
      name: PACK_NAME,
      label: "Motherboard: Adversaries",
      path: `packs/${PACK_NAME}`,
      type: "Actor",
      system: "daggerheart",
      // Nur Spielleitung und Assistenz sehen das Kompendium – keine Spoiler für Spieler.
      ownership: { PLAYER: "NONE", TRUSTED: "NONE", ASSISTANT: "OWNER" },
      flags: {}
    }]
  };
  if (repo) {
    manifest.url = `https://github.com/${repo}`;
    manifest.manifest = `https://github.com/${repo}/releases/latest/download/module.json`;
    manifest.download = `https://github.com/${repo}/releases/download/v${version}/${MODUL_ID}.zip`;
  }
  return manifest;
}

function dateiName(doc) {
  const sicher = doc.name.normalize("NFKD").replace(/[^A-Za-z0-9]+/g, "_").replace(/^_|_$/g, "");
  return `${sicher}_${doc._id}.json`;
}

function alleDateien(ordner, basis = ordner) {
  return fs.readdirSync(ordner, { withFileTypes: true }).flatMap(e => {
    const voll = path.join(ordner, e.name);
    return e.isDirectory() ? alleDateien(voll, basis) : [path.relative(basis, voll)];
  });
}

/**
 * @param {object} p
 * @param {object[]} p.dokumente  Actors und Ordner, jeweils mit _key
 * @param {string}   p.version
 * @param {object}   p.einst
 * @param {string}   p.ziel       dist-Ordner (wird komplett neu geschrieben)
 */
export async function bauePaket({ dokumente, version, einst, ziel }) {
  fs.rmSync(ziel, { recursive: true, force: true });
  const quelle = path.join(ziel, "quelle", PACK_NAME);
  const modul = path.join(ziel, MODUL_ID);
  fs.mkdirSync(quelle, { recursive: true });
  fs.mkdirSync(modul, { recursive: true });

  for (const doc of dokumente) {
    fs.writeFileSync(path.join(quelle, dateiName(doc)), JSON.stringify(doc, null, 2) + "\n", "utf8");
  }

  await compilePack(quelle, path.join(modul, "packs", PACK_NAME));

  const manifest = JSON.stringify(modulManifest(version, einst), null, 2) + "\n";
  fs.writeFileSync(path.join(modul, "module.json"), manifest, "utf8");
  fs.writeFileSync(path.join(ziel, "module.json"), manifest, "utf8");

  // ZIP: module.json liegt oben, so wie Foundry es beim Installieren erwartet. LOCK/LOG legt Foundry selbst an.
  const inhalt = {};
  const zeit = new Date("2026-01-01T00:00:00Z");
  for (const rel of alleDateien(modul).sort()) {
    if (/(^|[\\/])(LOCK|LOG(\.old)?)$/.test(rel)) continue;
    inhalt[rel.split(path.sep).join("/")] = [fs.readFileSync(path.join(modul, rel)), { mtime: zeit }];
  }
  const zipDatei = path.join(ziel, `${MODUL_ID}.zip`);
  fs.writeFileSync(zipDatei, zipSync(inhalt, { level: 9 }));

  return { modul, zipDatei, quelle };
}
