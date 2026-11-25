/**
 * Stufe 3: Bilder der Gegner aus `_Anhänge/Artwork/`.
 *
 * Bilddateien heißen `MB_<Gruppe>_<Name>_ActionSplash_<Format>.jpg` (ohne Umlaute), siehe
 * „Artwork-Stil (Gegner)“ im Vault. Zuordnung:
 *   1. über die Prompt-Datei `<Name> (Prompt).md`, die den Bild-Dateinamen nennt („**Bilddatei:** `MB_…`“),
 *   2. sonst über den Namen im Dateinamen (Umlaute als ae/oe/ue/ss).
 * Zweite Stat Blocks ohne eigenes Bild (z. B. „Syfter Bulwark — Tier 2“) bekommen das Bild der Notiz.
 */
import fs from "node:fs";
import path from "node:path";

const BILD = /^MB_([^_]+)_(.+)_ActionSplash_(\d+x\d+)\.(jpe?g|png|webp)$/i;

/** „Grubenbär — Dreiklaue“ → „grubenbaerdreiklaue“ */
export function bildSchluessel(text) {
  return text.toLocaleLowerCase("de")
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "");
}

/**
 * Liest den Artwork-Ordner.
 * @returns {{ nachName: Map<string, string>, dateien: Set<string> } | null}  Schlüssel → Dateiname
 */
export function findeBilder(ordner) {
  if (!ordner || !fs.existsSync(ordner)) return null;
  const alle = fs.readdirSync(ordner);
  const dateien = new Set(alle.filter(f => BILD.test(f)));
  const nachName = new Map();
  // 1. Was die Prompt-Dateien sagen (genaueste Quelle)
  for (const f of alle.filter(f => /\s*\(Prompt\)\.md$/i.test(f))) {
    const text = fs.readFileSync(path.join(ordner, f), "utf8");
    const m = text.match(/\*\*Bilddatei:\*\*\s*`([^`]+)`/);
    if (m && dateien.has(m[1])) nachName.set(bildSchluessel(f.replace(/\s*\(Prompt\)\.md$/i, "")), m[1]);
  }
  // 2. Der Name im Dateinamen
  for (const f of dateien) {
    const k = bildSchluessel(f.match(BILD)[2]);
    if (!nachName.has(k)) nachName.set(k, f);
  }
  return { nachName, dateien };
}

/**
 * Sucht das Bild für einen Eintrag.
 * @param {{name: string, schluessel: string, notizName?: string, alias?: string[]}} e
 *        alias: frühere Namen aus "alias" in einstellungen.json (z. B. „Dreiklaue“ für „Devourer — Three-Claw“)
 */
export function bildFuer(bilder, e) {
  if (!bilder) return null;
  const kandidaten = [e.schluessel, e.name, ...(e.alias ?? [])];
  const zusatz = e.schluessel.split(" — ")[1];
  if (zusatz && !/^tier\s*\d/i.test(zusatz)) kandidaten.push(zusatz);   // „Grubenbär — Dreiklaue“ → „Dreiklaue“
  if (e.notizName) kandidaten.push(e.notizName);                         // Tier 2 → Bild der Notiz
  for (const k of kandidaten) {
    const datei = bilder.nachName.get(bildSchluessel(k));
    if (datei) return datei;
  }
  return null;
}

/* -------------------------------------------- */
/*  Token-Bilder                                 */
/* -------------------------------------------- */

const TOKEN = /^MB_([^_]+)_(.+)_Token\.(png|webp)$/i;

/**
 * Fertige Token-Bilder (mit Ring), selbst gebaut: `MB_<Gruppe>_<Name>_Token.png` oder `.webp`
 * im Ordner `_Anhänge/Artwork/Token/` (oder direkt in `_Anhänge/Artwork/`).
 * @returns {{ nachName: Map<string, {datei, pfad}>, dateien: Map<string, string> } | null}  dateien: Dateiname → Pfad
 */
export function findeTokens(...ordnerListe) {
  const nachName = new Map();
  const dateien = new Map();
  for (const ordner of ordnerListe) {
    if (!ordner || !fs.existsSync(ordner)) continue;
    for (const f of fs.readdirSync(ordner).sort()) {
      const m = f.match(TOKEN);
      if (!m) continue;
      const k = bildSchluessel(m[2]);
      if (nachName.has(k)) continue;   // gleiche Datei in beiden Ordnern: die erste zählt
      nachName.set(k, { datei: f, pfad: path.join(ordner, f) });
      dateien.set(f, path.join(ordner, f));
    }
  }
  return dateien.size ? { nachName, dateien } : null;
}

/**
 * Token für einen Eintrag – nur der eigene: deutscher oder englischer Name, oder der Zusatz
 * („Grubenbär — Dreiklaue“ → „Dreiklaue“). Kein Erben von der Notiz: Ein Tier-2-Gegner soll
 * nicht den Tier-1-Ring tragen.
 */
export function tokenFuer(tokens, e) {
  if (!tokens) return null;
  const kandidaten = [e.name, e.schluessel, ...(e.alias ?? [])];
  const zusatz = e.schluessel.split(" — ")[1];
  if (zusatz && !/^tier\s*\d/i.test(zusatz)) kandidaten.push(zusatz);
  // „Devourer — Three-Claw“ → auch „Three-Claw“ (der Teil nach dem Gedankenstrich im Namen)
  const zusatzName = e.name.split(" — ")[1];
  if (zusatzName && !/^tier\s*\d/i.test(zusatzName)) kandidaten.push(zusatzName);
  for (const k of kandidaten) {
    const t = tokens.nachName.get(bildSchluessel(k));
    if (t) return t;
  }
  return null;
}
