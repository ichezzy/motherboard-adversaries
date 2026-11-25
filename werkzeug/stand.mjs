/**
 * Der „Stand“ ist das, was zuletzt veröffentlicht wurde (stand/gegner.json + version.txt).
 * Der Build vergleicht damit, damit Chezzy sieht, was neu ist und was sich geändert hat.
 */
import fs from "node:fs";
import path from "node:path";
import { PROJEKT } from "./einstellungen.mjs";

export const STAND_DATEI = path.join(PROJEKT, "stand", "gegner.json");
export const VERSION_DATEI = path.join(PROJEKT, "version.txt");

export function letzteVersion() {
  try {
    const v = fs.readFileSync(VERSION_DATEI, "utf8").trim();
    return v || null;
  } catch {
    return null;
  }
}

/** 1.0 → 1.1 → … → 1.10. Vor der ersten Veröffentlichung: 1.0 */
export function naechsteVersion(letzte) {
  if (!letzte) return "1.0";
  const teile = letzte.split(".").map(Number);
  if (teile.some(Number.isNaN)) throw new Error(`version.txt enthält keine gültige Versionsnummer: „${letzte}“`);
  while (teile.length < 2) teile.push(0);
  teile[teile.length - 1] += 1;
  return teile.join(".");
}

export function ladeStand() {
  try {
    return JSON.parse(fs.readFileSync(STAND_DATEI, "utf8"));
  } catch {
    return null;
  }
}

export function speichereStand(actors) {
  const daten = Object.fromEntries(
    [...actors].sort((a, b) => a.name.localeCompare(b.name, "de")).map(a => [a.name, a])
  );
  fs.mkdirSync(path.dirname(STAND_DATEI), { recursive: true });
  fs.writeFileSync(STAND_DATEI, JSON.stringify(daten, null, 2) + "\n", "utf8");
}

function flach(wert, pfad = "", aus = {}) {
  if (wert && typeof wert === "object") {
    const eintraege = Array.isArray(wert) ? wert.map((v, i) => [v?.name ?? i, v]) : Object.entries(wert);
    if (!eintraege.length) aus[pfad] = JSON.stringify(wert);
    for (const [k, v] of eintraege) flach(v, pfad ? `${pfad}.${k}` : String(k), aus);
  } else aus[pfad] = wert;
  return aus;
}

/** Lesbare Bezeichnung für einen geänderten Pfad, z. B. „Feature Rotors“ oder „system.difficulty“. */
function bereich(pfad) {
  const m = pfad.match(/^items\.([^.]+)/);
  if (m) return `Feature „${m[1]}“`;
  return pfad.split(".").slice(0, 2).join(".");
}

/**
 * Vergleich über die festen IDs – so wird ein umbenannter Gegner als „umbenannt“ erkannt,
 * nicht als „entfernt“ plus „neu“.
 * @returns {{ neu: string[], geaendert: {name, bereiche: string[]}[], umbenannt: {von, nach}[], entfernt: string[], gleich: string[] }}
 */
export function vergleiche(stand, actors) {
  const ergebnis = { neu: [], geaendert: [], umbenannt: [], entfernt: [], gleich: [] };
  const alt = new Map(Object.values(stand ?? {}).map(a => [a._id, a]));
  for (const a of actors) {
    const vorher = alt.get(a._id);
    if (!vorher) { ergebnis.neu.push(a.name); continue; }
    if (vorher.name !== a.name) ergebnis.umbenannt.push({ von: vorher.name, nach: a.name });
    const fv = flach({ ...vorher, name: a.name, prototypeToken: vorher.prototypeToken && { ...vorher.prototypeToken, name: a.prototypeToken?.name } });
    const fj = flach(a);
    const bereiche = new Set();
    for (const k of new Set([...Object.keys(fv), ...Object.keys(fj)])) {
      if (fv[k] !== fj[k]) bereiche.add(bereich(k));
    }
    if (bereiche.size) ergebnis.geaendert.push({ name: a.name, bereiche: [...bereiche] });
    else if (vorher.name === a.name) ergebnis.gleich.push(a.name);
  }
  const ids = new Set(actors.map(a => a._id));
  ergebnis.entfernt = [...alt.values()].filter(a => !ids.has(a._id)).map(a => a.name);
  return ergebnis;
}
