/**
 * Roll Tables aus den Notizen: Callouts „> [!rolltable] NAME“ mit einer Markdown-Tabelle.
 *
 *   > [!rolltable] WHAT THE CROWD THROWS
 *   > *Optional: one line of description.*
 *   >
 *   > | d6 | Result |
 *   > |---|---|
 *   > | 1 | Half a Pressling |
 *   > | 2–3 | A pipe, good for hitting things |
 *
 * Erste Spalte: Würfel im Kopf (d6, d12, 2d6 …), darunter Zahl oder Bereich (2–3).
 * Zweite Spalte: das Ergebnis. Eine optionale dritte Spalte wird zur Beschreibung des Ergebnisses.
 */
import fs from "node:fs";
import path from "node:path";
import { findeStatblocks } from "./aus-notizen.mjs";
import { inlineHtml, klartext } from "./markdown.mjs";
import { festeId } from "./ids.mjs";
import { STATS } from "./fertigmachen.mjs";

const KLEINE_WOERTER = new Set(["a", "an", "the", "and", "or", "of", "on", "in", "to", "for", "at", "by", "with", "from"]);

/** „WHAT THE CROWD THROWS“ → „What the Crowd Throws“; gemischte Schreibung bleibt, wie sie ist. */
export function titel(text) {
  const t = text.trim();
  if (t !== t.toUpperCase()) return t;
  return t.toLocaleLowerCase("en").split(/\s+/).map((w, i) =>
    i > 0 && KLEINE_WOERTER.has(w) ? w : w.replace(/^(\p{L})/u, b => b.toLocaleUpperCase("en"))
  ).join(" ");
}

function zellen(zeile) {
  return zeile.replace(/\\\|/g, "\u0000").replace(/^\|/, "").replace(/\|$/, "")
    .split("|").map(z => z.replace(/\u0000/g, "|").trim());
}

class TabellenFehler extends Error {}

/** @returns {{ name, beschreibung, formel, ergebnisse: {von, bis, name, beschreibung}[], hinweise: string[] }} */
export function tabelleLesen(block) {
  const hinweise = [];
  const name = titel(block.kopf);
  if (!name) throw new TabellenFehler("Die Tabelle hat keinen Namen ([!rolltable] NAME)");
  let beschreibung = "";
  const zeilen = block.zeilen.map(z => z.text).filter(t => t !== "");
  const tabelle = zeilen.filter(t => t.startsWith("|"));
  for (const t of zeilen.filter(t => !t.startsWith("|"))) {
    const kursiv = t.match(/^\*(?!\*)(.+)\*$/);
    if (kursiv && !beschreibung) beschreibung = `<p>${inlineHtml(kursiv[1])}</p>`;
    else hinweise.push(`Zeile außerhalb der Tabelle ignoriert: „${t}“`);
  }
  if (tabelle.length < 3) throw new TabellenFehler("Keine Tabelle gefunden (Kopfzeile, Trennzeile, mindestens eine Zeile)");

  const kopf = zellen(tabelle[0]);
  const w = kopf[0].match(/^(\d*)d(\d+)$/i);
  if (!w) throw new TabellenFehler(`Die erste Spalte muss im Kopf den Würfel nennen (z. B. d6), steht dort: „${kopf[0]}“`);
  const anzahl = w[1] ? Number(w[1]) : 1;
  const seiten = Number(w[2]);
  const formel = `${anzahl}d${seiten}`;

  const ergebnisse = [];
  for (const zeile of tabelle.slice(1)) {
    if (/^\|?\s*:?-{3,}/.test(zeile)) continue;
    const z = zellen(zeile);
    const r = z[0].match(/^(\d+)\s*(?:[–—-]\s*(\d+))?$/);
    if (!r) throw new TabellenFehler(`Erste Spalte ist keine Zahl oder kein Bereich: „${z[0]}“`);
    const von = Number(r[1]);
    const bis = r[2] ? Number(r[2]) : von;
    if (bis < von) throw new TabellenFehler(`Bereich rückwärts: „${z[0]}“`);
    if (!z[1]) throw new TabellenFehler(`Zeile „${z[0]}“ hat kein Ergebnis`);
    ergebnisse.push({ von, bis, name: klartext(z[1]), beschreibung: z[2] ? `<p>${inlineHtml(z[2])}</p>` : "" });
  }

  // Lücken und Überschneidungen melden (gewürfelt wird trotzdem)
  const min = anzahl, max = anzahl * seiten;
  const belegt = new Map();
  for (const e of ergebnisse) for (let n = e.von; n <= e.bis; n++) belegt.set(n, (belegt.get(n) ?? 0) + 1);
  const luecken = [], doppelt = [];
  for (let n = min; n <= max; n++) {
    if (!belegt.has(n)) luecken.push(n);
    else if (belegt.get(n) > 1) doppelt.push(n);
  }
  if (luecken.length) hinweise.push(`Kein Ergebnis für ${luecken.join(", ")} (${formel})`);
  if (doppelt.length) hinweise.push(`Mehrere Ergebnisse für ${doppelt.join(", ")}`);
  if ([...belegt.keys()].some(n => n < min || n > max)) hinweise.push(`Zahlen außerhalb von ${min}–${max} (${formel})`);
  return { name, beschreibung, formel, ergebnisse, hinweise };
}

function alleMarkdown(ordner) {
  return fs.readdirSync(ordner, { withFileTypes: true }).flatMap(e => {
    const voll = path.join(ordner, e.name);
    if (e.isDirectory()) return alleMarkdown(voll);
    return e.name.toLowerCase().endsWith(".md") ? [voll] : [];
  }).sort((a, b) => a.localeCompare(b, "de"));
}

/** Liest alle Roll Tables und macht daraus Kompendium-Dokumente. */
export function findeTabellen(einst) {
  const dokumente = [];
  const probleme = [];
  const hinweise = [];
  const namen = new Set();
  for (const datei of alleMarkdown(einst.pfade.tabellen)) {
    const text = fs.readFileSync(datei, "utf8");
    if (!/\[!rolltable\]/i.test(text)) continue;
    for (const block of findeStatblocks(text, "rolltable")) {
      const wo = `${path.basename(datei)} → [!rolltable] ${block.kopf}`;
      try {
        const t = tabelleLesen(block);
        for (const h of t.hinweise) hinweise.push({ wo, was: h });
        if (namen.has(t.name.toLowerCase())) { probleme.push({ wo, was: `Eine Tabelle „${t.name}“ gibt es schon – nur die erste zählt` }); continue; }
        namen.add(t.name.toLowerCase());
        const id = festeId("tabelle", t.name);
        dokumente.push({
          name: t.name,
          img: "icons/svg/d20-grey.svg",
          description: t.beschreibung,
          results: t.ergebnisse.map((e, i) => {
            const rid = festeId("ergebnis", t.name, i);
            return {
              _id: rid, type: "text", name: e.name, img: "icons/svg/d20-black.svg", description: e.beschreibung,
              weight: 1, range: [e.von, e.bis], drawn: false, flags: {}, _stats: { ...STATS },
              _key: `!tables.results!${id}.${rid}`
            };
          }),
          formula: t.formel,
          replacement: true,
          displayRoll: true,
          folder: null,
          sort: 0,
          ownership: { default: 0 },
          flags: {},
          _stats: { ...STATS },
          _id: id,
          _key: `!tables!${id}`
        });
      } catch (fehler) {
        if (!(fehler instanceof TabellenFehler)) throw fehler;
        probleme.push({ wo, was: fehler.message });
      }
    }
  }
  return { dokumente, probleme, hinweise };
}

/**
 * Macht kursiv oder fett geschriebene Tabellennamen in Features und Umgebungs-Notizen zu Links,
 * z. B. „<em>What the Crowd Throws</em>“ → @UUID[…]{What the Crowd Throws}.
 */
export function tabellenVerlinken(actors, tabellen, packId) {
  if (!tabellen.length) return 0;
  const nachName = new Map(tabellen.map(t => [t.name.toLowerCase(), t]));
  let anzahl = 0;
  const ersetzen = html => html.replace(/<(em|strong)>([^<]+)<\/\1>/g, (ganz, _tag, text) => {
    const t = nachName.get(text.trim().toLowerCase());
    if (!t) return ganz;
    anzahl++;
    return `@UUID[Compendium.${packId}.RollTable.${t._id}]{${text.trim()}}`;
  });
  for (const a of actors) {
    for (const item of a.items ?? []) item.system.description = ersetzen(item.system.description ?? "");
    if (a.system?.notes) a.system.notes = ersetzen(a.system.notes);
  }
  return anzahl;
}
