/**
 * Stufe 1: Liest die fertigen Actor-Dateien „<Name> (DH).json“ aus dem Vault.
 */
import fs from "node:fs";
import path from "node:path";
import { gruppeFuer } from "./notizen.mjs";

export function jsonName(datei) {
  return path.basename(datei).replace(/\.json$/i, "").replace(/\s*\(DH\)$/, "").trim();
}

/**
 * @returns {{ eintraege: {name, gruppe, actor, herkunft}[], probleme: {wo, was}[], hinweise: {wo, was}[] }}
 */
export function ausJsonDateien(einst, notizen) {
  const eintraege = [];
  const probleme = [];
  const hinweise = [];
  const dateien = fs.readdirSync(einst.pfade.jsonDateien)
    .filter(f => f.toLowerCase().endsWith(".json"))
    .sort((a, b) => a.localeCompare(b, "de"));

  for (const datei of dateien) {
    const name = jsonName(datei);
    let actor;
    try {
      actor = JSON.parse(fs.readFileSync(path.join(einst.pfade.jsonDateien, datei), "utf8"));
    } catch (fehler) {
      probleme.push({ wo: datei, was: `Datei ist kein gültiges JSON (${fehler.message})` });
      continue;
    }
    if (!["adversary", "environment"].includes(actor.type)) {
      probleme.push({ wo: datei, was: `Unbekannter Actor-Typ „${actor.type}“ (erwartet: adversary oder environment)` });
      continue;
    }
    let gruppe = actor.type === "environment" ? einst.umgebungsGruppe : gruppeFuer(name, notizen, einst.varianten);
    if (!gruppe) {
      probleme.push({ wo: datei, was: "Keine passende Notiz mit Stat Block gefunden – liegt im Ordner „Ohne Gruppe“" });
      gruppe = "Ohne Gruppe";
    }
    if (actor.name !== name) {
      hinweise.push({ wo: datei, was: `Name in der Datei ist „${actor.name}“, im Kompendium heißt er „${name}“ (wie Datei und Notiz)` });
    }
    eintraege.push({ name, gruppe, actor, herkunft: datei });
  }
  return { eintraege, probleme, hinweise };
}
