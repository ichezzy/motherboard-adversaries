/**
 * Vergleicht, was aus den Notizen entsteht, mit den bestehenden JSON-Dateien – Feld für Feld.
 *   node werkzeug/abgleich.mjs            → Übersicht
 *   node werkzeug/abgleich.mjs Kreischer  → nur dieser Gegner
 * Ergebnis auch in dist/abgleich.txt
 */
import fs from "node:fs";
import path from "node:path";
import { ladeEinstellungen } from "./einstellungen.mjs";
import { sammeln, DIST } from "./bauen.mjs";

function flach(wert, pfad = "", aus = {}) {
  if (wert && typeof wert === "object") {
    const eintraege = Array.isArray(wert)
      ? wert.map((v, i) => [v && typeof v === "object" && "name" in v ? `[${v.name}]` : i, v])
      : Object.entries(wert);
    if (!eintraege.length) aus[pfad] = Array.isArray(wert) ? "[]" : "{}";
    for (const [k, v] of eintraege) flach(v, pfad ? `${pfad}.${k}` : String(k), aus);
  } else aus[pfad] = wert;
  return aus;
}

function zeige(w) {
  if (w === undefined) return "(fehlt)";
  const t = JSON.stringify(w);
  return t.length > 160 ? t.slice(0, 157) + "…" : t;
}

const einst = ladeEinstellungen();
const nur = process.argv.slice(2).join(" ");
const alt = sammeln(einst, "json");
const neu = sammeln(einst, "notizen");
const z = [];

z.push(`JSON-Dateien: ${alt.actors.length} · aus Notizen: ${neu.actors.length}`);
if (neu.probleme.length) {
  z.push("", "Stat Blocks, die nicht gelesen werden konnten:");
  for (const p of neu.probleme) z.push(`  ! ${p.wo}: ${p.was}`);
}
if (neu.hinweise.length) {
  z.push("", "Hinweise beim Lesen der Notizen:");
  for (const h of neu.hinweise) z.push(`  · ${h.wo}: ${h.was}`);
}

const altNach = new Map(alt.actors.map(a => [a.name, a]));
const neuNach = new Map(neu.actors.map(a => [a.name, a]));
z.push("", "Nur in den Notizen: " + ([...neuNach.keys()].filter(n => !altNach.has(n)).join(", ") || "–"));
z.push("Nur als JSON-Datei: " + ([...altNach.keys()].filter(n => !neuNach.has(n)).join(", ") || "–"));

// Unterschiede nach Feld zählen, damit Muster sichtbar werden
const proFeld = new Map();
let gleich = 0;
for (const [name, n] of neuNach) {
  const a = altNach.get(name);
  if (!a || (nur && name !== nur)) continue;
  const fa = flach(a), fn = flach(n);
  const diffs = [...new Set([...Object.keys(fa), ...Object.keys(fn)])].filter(k => fa[k] !== fn[k]);
  if (!diffs.length) { gleich++; continue; }
  z.push("", `── ${name} (${diffs.length} Unterschiede)`);
  for (const k of diffs) {
    z.push(`   ${k}\n      JSON:    ${zeige(fa[k])}\n      Notiz:   ${zeige(fn[k])}`);
    const feld = k.replace(/\[[^\]]*\]/g, "[…]").replace(/\.[A-Za-z0-9]{16}(?=\.|$)/g, ".<id>");
    if (!proFeld.has(feld)) proFeld.set(feld, []);
    proFeld.get(feld).push(name);
  }
}
z.push("", `Völlig gleich: ${gleich}`);
z.push("", "Unterschiede nach Feld:");
for (const [feld, namen] of [...proFeld].sort((x, y) => y[1].length - x[1].length)) {
  z.push(`  ${String(namen.length).padStart(3)}× ${feld}  (${[...new Set(namen)].slice(0, 6).join(", ")}${new Set(namen).size > 6 ? ", …" : ""})`);
}

const text = z.join("\n");
fs.mkdirSync(DIST, { recursive: true });
fs.writeFileSync(path.join(DIST, "abgleich.txt"), text, "utf8");
console.log(text);
