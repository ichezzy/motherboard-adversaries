/**
 * Baut das Modul „Motherboard: Adversaries“.
 *   node werkzeug/bauen.mjs
 * Liest nur aus dem Vault. Schreibt nur in den Ordner dist/ dieses Projekts.
 */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { ladeEinstellungen, PROJEKT } from "./einstellungen.mjs";
import { findeNotizen } from "./notizen.mjs";
import { ausJsonDateien } from "./aus-json.mjs";
import { ausNotizen } from "./aus-notizen.mjs";
import { fertigmachen, ordnerDokument } from "./fertigmachen.mjs";
import { bauePaket } from "./paket.mjs";
import { ladeStand, vergleiche, letzteVersion, naechsteVersion } from "./stand.mjs";

export const DIST = path.join(PROJEKT, "dist");

function gruppenReihenfolge(einst, vorhanden) {
  const fest = Object.values(einst.gruppen);
  const rest = [...vorhanden].filter(g => !fest.includes(g) && g !== einst.umgebungsGruppe && g !== "Ungrouped")
    .sort((a, b) => a.localeCompare(b, "de"));
  return [...fest, ...rest, "Ungrouped", einst.umgebungsGruppe].filter(g => vorhanden.has(g));
}

/**
 * Liest alle Gegner aus der gewählten Quelle („notizen“ oder „json“) und macht sie fertig fürs Kompendium.
 */
export function sammeln(einst, quelle = einst.quelle) {
  const notizen = findeNotizen(einst);
  let gelesen;
  if (quelle === "json") gelesen = ausJsonDateien(einst, notizen);
  else if (quelle === "notizen") gelesen = ausNotizen(einst, notizen);
  else throw new Error(`In einstellungen.json steht "quelle": "${quelle}" – erlaubt sind "notizen" oder "json".`);
  const { probleme, hinweise } = gelesen;

  // Doppelte Namen: der erste gewinnt, der zweite wird gemeldet.
  const eintraege = [];
  const namen = new Set();
  for (const e of gelesen.eintraege) {
    if (namen.has(e.name)) { probleme.push({ wo: e.herkunft, was: `„${e.name}“ gibt es doppelt – nur der erste ist im Kompendium` }); continue; }
    namen.add(e.name);
    eintraege.push(e);
  }

  if (quelle === "json") {
    for (const n of notizen.filter(n => n.hatStatblock && !namen.has(n.name))) {
      hinweise.push({ wo: path.basename(n.datei), was: "Notiz hat einen Stat Block, aber keine JSON-Datei" });
    }
  }

  const gruppen = gruppenReihenfolge(einst, new Set(eintraege.map(e => e.gruppe)));
  const ordner = gruppen.map((g, i) => ordnerDokument(g, i));
  const ordnerId = Object.fromEntries(ordner.map(o => [o.name, o._id]));

  const actors = [];
  for (const e of eintraege) {
    const { actor, hinweise: h } = fertigmachen(e.actor, {
      name: e.name, ordnerId: ordnerId[e.gruppe], hordenSchadenAutomatisch: einst.hordenSchadenAutomatisch
    });
    actors.push(actor);
    for (const was of h) hinweise.push({ wo: e.name, was });
  }
  const proGruppe = gruppen.map(g => [g, eintraege.filter(e => e.gruppe === g).length]);
  return { quelle, actors, ordner, proGruppe, probleme, hinweise, automatik: gelesen.automatik ?? [] };
}

/**
 * @returns {Promise<object>} alles, was die Zusammenfassung und das Veröffentlichen brauchen
 */
export async function bauen({ version } = {}) {
  const einst = ladeEinstellungen();
  const s = sammeln(einst);
  const letzte = letzteVersion();
  const neueVersion = version ?? naechsteVersion(letzte);
  const vergleich = vergleiche(ladeStand(), s.actors);
  const paket = await bauePaket({ dokumente: [...s.ordner, ...s.actors], version: neueVersion, einst, ziel: DIST });
  // Liste aller automatisierten Features zum Nachlesen
  const liste = s.automatik.map(a => `${a.gegner} → ${a.feature}: ${a.was}`).join("\n");
  fs.writeFileSync(path.join(DIST, "automatik.txt"), liste + "\n", "utf8");
  return { einst, ...s, vergleich, letzte, version: neueVersion, paket };
}

export function zusammenfassung(r) {
  const z = [];
  const quelle = r.quelle === "json" ? `JSON-Dateien in ${r.einst.ordner.jsonDateien}` : `Notizen in ${r.einst.ordner.gegner} und ${r.einst.ordner.umgebungen}`;
  z.push("");
  z.push(`=== Motherboard: Adversaries · Version ${r.version} ===`);
  z.push(`Quelle: ${quelle}`);
  z.push("");
  z.push("Im Kompendium:");
  const breite = Math.max(...r.proGruppe.map(([g]) => g.length), 6);
  for (const [g, n] of r.proGruppe) z.push(`  ${g.padEnd(breite)}  ${String(n).padStart(3)}`);
  z.push(`  ${"Gesamt".padEnd(breite)}  ${String(r.actors.length).padStart(3)}`);
  z.push("");

  const v = r.vergleich;
  if (!r.letzte) {
    z.push("Noch nichts veröffentlicht – alle Einträge sind neu.");
  } else {
    z.push(`Gegenüber der veröffentlichten Version ${r.letzte}:`);
    z.push(`  neu: ${v.neu.length} · geändert: ${v.geaendert.length} · entfernt: ${v.entfernt.length} · unverändert: ${v.gleich.length}`);
    for (const n of v.neu) z.push(`  + neu:       ${n}`);
    for (const g of v.geaendert) z.push(`  ~ geändert:  ${g.name} (${g.bereiche.slice(0, 4).join(", ")}${g.bereiche.length > 4 ? ", …" : ""})`);
    for (const n of v.entfernt) z.push(`  - entfernt:  ${n}`);
  }
  z.push("");

  if (r.probleme.length) {
    z.push(`NICHT GELESEN oder FEHLERHAFT (${r.probleme.length}) – alle anderen sind trotzdem gebaut:`);
    for (const p of r.probleme) z.push(`  ! ${p.wo}: ${p.was}`);
    z.push("");
  }
  if (r.hinweise.length) {
    z.push(`Hinweise (${r.hinweise.length}):`);
    for (const h of r.hinweise) z.push(`  · ${h.wo}: ${h.was}`);
    z.push("");
  }
  const mitAktion = r.automatik.filter(a => !a.hinweis);
  if (r.automatik.length) {
    const gegner = new Set(mitAktion.map(a => a.gegner)).size;
    z.push(`Automatik: ${mitAktion.length} Features bei ${gegner} Gegnern bekommen eine Aktion.`);
    z.push(`  Liste mit allen Details: ${path.join(DIST, "automatik.txt")}`);
    z.push("");
  }
  z.push(`Modul gebaut: ${r.paket.modul}`);
  z.push(`ZIP:          ${r.paket.zipDatei}`);
  z.push("Noch nichts hochgeladen. Zum Veröffentlichen: „Gegner veröffentlichen.bat“.");
  return z.join("\n");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    const r = await bauen();
    console.log(zusammenfassung(r));
  } catch (fehler) {
    console.error("\nDER BUILD IST ABGEBROCHEN:\n" + (fehler?.message ?? fehler));
    process.exitCode = 1;
  }
}
