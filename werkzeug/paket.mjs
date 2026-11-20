/**
 * Schreibt die Quelldateien, packt die Kompendien mit dem offiziellen Foundry-Werkzeug,
 * kopiert den Modul-Code (modul/), schreibt module.json und das ZIP.
 */
import fs from "node:fs";
import path from "node:path";
import { compilePack } from "@foundryvtt/foundryvtt-cli";
import { zipSync } from "fflate";
import { PROJEKT } from "./einstellungen.mjs";

export const MODUL_ID = "motherboard-adversaries";
export const PACK_NAME = "adversaries";
export const TABELLEN_PACK = "rolltables";
const CODE = path.join(PROJEKT, "modul");

// Nur Spielleitung und Assistenz sehen die Kompendien – keine Spoiler für Spieler.
const NUR_GM = { PLAYER: "NONE", TRUSTED: "NONE", ASSISTANT: "OWNER" };

export function modulManifest(version, einst, { mitTabellen = false } = {}) {
  const repo = einst.github;
  const packs = [{
    name: PACK_NAME, label: "Motherboard: Adversaries", path: `packs/${PACK_NAME}`,
    type: "Actor", system: "daggerheart", ownership: NUR_GM, flags: {}
  }];
  if (mitTabellen) {
    packs.push({
      name: TABELLEN_PACK, label: "Motherboard: Roll Tables", path: `packs/${TABELLEN_PACK}`,
      type: "RollTable", ownership: NUR_GM, flags: {}
    });
  }
  const manifest = {
    id: MODUL_ID,
    title: "Motherboard: Adversaries",
    description: "All adversaries, environments and roll tables of the Daggerheart campaign <em>White Signal</em> as compendiums, built from the Obsidian notes. Includes a helper that targets every token inside a placed action area and requests their Reaction Rolls.",
    version,
    authors: [{ name: "Chezzy" }],
    compatibility: { minimum: "14", verified: "14.365" },
    relationships: {
      systems: [{ id: "daggerheart", type: "system", compatibility: { minimum: "2.12.9" } }]
    },
    esmodules: ["scripts/main.mjs"],
    packs,
    packFolders: [{ name: "Motherboard", sorting: "m", color: null, packs: packs.map(p => p.name), folders: [] }]
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

async function packen(dokumente, quelle, ziel) {
  fs.mkdirSync(quelle, { recursive: true });
  for (const doc of dokumente) {
    fs.writeFileSync(path.join(quelle, dateiName(doc)), JSON.stringify(doc, null, 2) + "\n", "utf8");
  }
  await compilePack(quelle, ziel);
}

/**
 * @param {object} p
 * @param {object[]} p.dokumente  Actors und Ordner, jeweils mit _key
 * @param {object[]} [p.tabellen] Roll Tables, jeweils mit _key
 * @param {string}   p.version
 * @param {object}   p.einst
 * @param {string}   p.ziel       dist-Ordner (wird komplett neu geschrieben)
 */
export async function bauePaket({ dokumente, tabellen = [], version, einst, ziel }) {
  fs.rmSync(ziel, { recursive: true, force: true });
  const quelle = path.join(ziel, "quelle", PACK_NAME);
  const modul = path.join(ziel, MODUL_ID);
  fs.mkdirSync(modul, { recursive: true });

  await packen(dokumente, quelle, path.join(modul, "packs", PACK_NAME));
  if (tabellen.length) {
    await packen(tabellen, path.join(ziel, "quelle", TABELLEN_PACK), path.join(modul, "packs", TABELLEN_PACK));
  }
  fs.cpSync(CODE, modul, { recursive: true });

  const manifest = JSON.stringify(modulManifest(version, einst, { mitTabellen: tabellen.length > 0 }), null, 2) + "\n";
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
