/**
 * Findet die Notizen im Vault und ordnet jede einer Gruppe (Ordner im Kompendium) zu.
 * Liest nur, schreibt nie.
 */
import fs from "node:fs";
import path from "node:path";

const STATBLOCK = /^>\s*\[!statblock\]/m;

/** „Kreischer (DH).md“ → „Kreischer“ */
export function notizName(datei) {
  return path.basename(datei).replace(/\.md$/i, "").replace(/\s*\(DH\)$/, "").trim();
}

function alleMarkdown(ordner) {
  const ergebnis = [];
  for (const eintrag of fs.readdirSync(ordner, { withFileTypes: true })) {
    const voll = path.join(ordner, eintrag.name);
    if (eintrag.isDirectory()) ergebnis.push(...alleMarkdown(voll));
    else if (eintrag.name.toLowerCase().endsWith(".md")) ergebnis.push(voll);
  }
  return ergebnis.sort((a, b) => a.localeCompare(b, "de"));
}

/**
 * @returns {{datei:string, name:string, gruppe:string, umgebung:boolean, text:string, hatStatblock:boolean}[]}
 */
export function findeNotizen(einst) {
  const notizen = [];
  for (const datei of alleMarkdown(einst.pfade.gegner)) {
    const relativ = path.relative(einst.pfade.gegner, datei);
    const teile = relativ.split(path.sep);
    // Gruppe = erster Unterordner; Notizen direkt im Adversary-Ordner landen unter „Ungrouped“.
    const ordnerName = teile.length > 1 ? teile[0] : null;
    const gruppe = ordnerName ? (einst.gruppen[ordnerName] ?? ordnerName) : "Ungrouped";
    const text = fs.readFileSync(datei, "utf8");
    notizen.push({ datei, name: notizName(datei), gruppe, umgebung: false, text, hatStatblock: STATBLOCK.test(text) });
  }
  for (const datei of alleMarkdown(einst.pfade.umgebungen)) {
    const text = fs.readFileSync(datei, "utf8");
    notizen.push({
      datei, name: notizName(datei), gruppe: einst.umgebungsGruppe, umgebung: true, text, hatStatblock: STATBLOCK.test(text)
    });
  }
  return notizen;
}

/**
 * Sucht die Gruppe für einen Actor-Namen:
 * 1. gleichnamige Notiz, 2. Teil vor „ — “ (z. B. „Nachrufer — Sirene“ → „Nachrufer“),
 * 3. Variante aus den Einstellungen (Dreiklaue → Grubenbär).
 */
export function gruppeFuer(name, notizen, varianten = []) {
  const mitStatblock = notizen.filter(n => n.hatStatblock);
  const finde = (n) => mitStatblock.find(x => x.name === n);
  const direkt = finde(name);
  if (direkt) return direkt.gruppe;
  const basis = name.split(" — ")[0];
  if (basis !== name && finde(basis)) return finde(basis).gruppe;
  const variante = varianten.find(v => v.name === name);
  if (variante && finde(variante.basis)) return finde(variante.basis).gruppe;
  return null;
}
