/**
 * Stufe 2: Liest die Stat Blocks (> [!statblock] NAME) direkt aus den Notizen und baut daraus Actors.
 * Bricht ein Stat Block, werden alle anderen trotzdem gebaut; der Fehler landet in der Zusammenfassung.
 */
import fs from "node:fs";
import path from "node:path";
import { inlineHtml, klartext, normaleSchreibung } from "./markdown.mjs";
import {
  gegnerVorlage, umgebungVorlage, featureVorlage, groesseFuer, REICHWEITEN, GEGNER_TYPEN, UMGEBUNG_TYPEN
} from "./vorlagen.mjs";
import { PROJEKT } from "./einstellungen.mjs";
import { aktionFuer } from "./automatik.mjs";

const MODUL_FLAG = "motherboard-adversaries";

const KOPF = /^>\s*\[!statblock\]\s*(.*)$/i;
export const GESINNUNG = { feindlich: -1, neutral: 0, freundlich: 1 };
const GROESSEN = { medium: 1, large: 2, huge: 3, gargantuan: 4, small: 1, tiny: 1 };
const FEATURE = /^\*\*\*(.+)\s+[-–—]\s+(Passive|Action|Reaction):\*\*\*\s*(.*)$/i;

class StatblockFehler extends Error {}

/** Zerlegt eine Notiz in ihre Callouts eines Typs (statblock, rolltable). Jede Zeile ohne die führenden „>“. */
export function findeStatblocks(text, typ = "statblock") {
  const muster = typ === "statblock" ? KOPF : new RegExp(`^>\\s*\\[!${typ}\\]\\s*(.*)$`, "i");
  const bloecke = [];
  let aktuell = null;
  let codeblock = false;   // ```…``` – Beispiele in Leitfäden zählen nicht
  let kommentar = false;   // %% … %% – auskommentiert zählt nicht
  for (const roh of text.split(/\r?\n/)) {
    const ohnePrefix = roh.replace(/^(\s*>\s?)+/, "").trim();
    if (!kommentar && /^(```|~~~)/.test(ohnePrefix)) { codeblock = !codeblock; aktuell = null; continue; }
    if (!codeblock && (ohnePrefix.match(/%%/g) ?? []).length % 2 === 1) { kommentar = !kommentar; aktuell = null; continue; }
    if (codeblock || kommentar) continue;
    const kopf = roh.match(muster);
    if (kopf) {
      aktuell = { kopf: kopf[1].trim(), zeilen: [] };
      bloecke.push(aktuell);
      continue;
    }
    // Ein anderer Callout direkt dahinter beendet den aktuellen
    if (/^>\s*\[![\w-]+\]/.test(roh)) { aktuell = null; continue; }
    if (!aktuell) continue;
    if (!/^\s*>/.test(roh)) { aktuell = null; continue; }
    const tiefe = (roh.match(/^(\s*>\s?)+/)[0].match(/>/g) || []).length;
    aktuell.zeilen.push({ text: roh.replace(/^(\s*>\s?)+/, "").trim(), tiefe });
  }
  return bloecke;
}

function zahl(text, was) {
  const t = String(text).trim().replace(/[−–]/g, "-");
  if (!/^[+-]?\d+$/.test(t)) throw new StatblockFehler(`${was} ist keine Zahl: „${text}“`);
  return Number(t);
}

/** „1d6+2 mag“, „2d10 − 3 phy“, „2 phy“ */
export function schaden(text) {
  const t = text.trim().replace(/[−–]/g, "-");
  let m = t.match(/^(\d*)d(\d+)\s*(?:([+-])\s*(\d+))?\s+(phy|mag)\w*$/i);
  if (m) {
    const bonus = m[3] ? Number(m[3] + m[4]) : null;
    return {
      wert: {
        custom: { enabled: false, formula: "" },
        dice: `d${m[2]}`, bonus, multiplier: "flat", flatMultiplier: m[1] ? Number(m[1]) : 1
      },
      typ: m[5].toLowerCase().startsWith("phy") ? "physical" : "magical"
    };
  }
  m = t.match(/^(\d+)\s+(phy|mag)\w*$/i);
  if (m) {
    return {
      wert: { custom: { enabled: true, formula: m[1] }, dice: "d6", bonus: null, multiplier: "flat", flatMultiplier: 1 },
      typ: m[2].toLowerCase().startsWith("phy") ? "physical" : "magical"
    };
  }
  throw new StatblockFehler(`Schaden nicht verstanden: „${text}“ (erwartet z. B. „1d6+2 mag“ oder „2 phy“)`);
}

/** Zerlegt eine Werte-Zeile „**A:** 1 | **B:** x | rest“ in Segmente. */
function segmente(zeile) {
  return zeile.split(/\s+\|\s+/).map(s => {
    const m = s.match(/^\*\*(.+?):\*\*\s*(.*)$/);
    return m ? { schluessel: m[1].trim(), wert: m[2].trim() } : { schluessel: null, wert: s.trim() };
  });
}

/** Absätze → <p>, Aufzählungen → <ul>, Fragen bei Umgebungen → geheimer Abschnitt (ID setzt fertigmachen). */
function featureHtml(f, istUmgebung) {
  let html = "";
  for (const stueck of f.stuecke) {
    if (stueck.art === "absatz") html += `<p>${inlineHtml(stueck.text)}</p>`;
    else if (stueck.art === "liste") html += `<ul>${stueck.punkte.map(p => `<li>${inlineHtml(p)}</li>`).join("")}</ul>`;
    else if (stueck.art === "frage") {
      if (istUmgebung) html += `<section id="secret-" class="secret"><p>${inlineHtml(stueck.text)}</p></section>`;
      else html += `<p>${inlineHtml(stueck.text)}</p>`;
    }
  }
  return html;
}

/** Liest einen Feature-Kopf „Name - Passive: Text“ (auch ohne Sternchen, für Varianten). */
export function featureAusZeile(zeile) {
  const m = zeile.match(FEATURE) ?? zeile.match(/^(.+)\s+[-–—]\s+(Passive|Action|Reaction):\s*(.*)$/i);
  if (!m) return null;
  return { name: m[1].trim(), form: m[2].toLowerCase(), stuecke: m[3].trim() ? [{ art: "absatz", text: m[3] }] : [] };
}

/**
 * Wandelt einen Stat Block in einen Actor um.
 * @returns {{ actor: object, hinweise: string[] }}
 */
export function statblockZuActor(block, name) {
  const hinweise = [];
  const zeilen = block.zeilen.filter(z => z.text !== "" && !/^-{3,}$/.test(z.text) && !/^>+$/.test(z.text));
  let i = 0;

  // 1. Tier-Zeile
  const tierZeile = zeilen[i]?.text.match(/^\*\*\*Tier\s+(\d+)\s+(.+?)\*\*\*$/i);
  if (!tierZeile) throw new StatblockFehler(`Erste Zeile ist keine Tier-Zeile wie „***Tier 1 Support***“: „${zeilen[i]?.text ?? "(leer)"}“`);
  i++;
  const tier = Number(tierZeile[1]);
  const rest = tierZeile[2];
  const typWort = rest.match(/^([A-Za-zÄÖÜäöü]+)/)[1].toLowerCase();
  // Umgebung: hat „Impulses“ statt „Motives & Tactics“, oder einen reinen Umgebungs-Typ (Event, Exploration, Traversal)
  const umgebung = zeilen.some(z => /^\*\*Impulses:\*\*/i.test(z.text)) || (UMGEBUNG_TYPEN.includes(typWort) && !GEGNER_TYPEN.includes(typWort));
  if (!GEGNER_TYPEN.includes(typWort) && !UMGEBUNG_TYPEN.includes(typWort)) {
    throw new StatblockFehler(`Unbekannter Typ „${typWort}“ in der Tier-Zeile`);
  }
  const actor = umgebung ? umgebungVorlage() : gegnerVorlage();
  actor.name = name;
  const s = actor.system;
  s.tier = tier;
  s.type = typWort;

  if (!umgebung) {
    const g = groesseFuer(typWort);
    s.size = g.size;
    actor.prototypeToken.width = g.feld;
    actor.prototypeToken.height = g.feld;
    actor.prototypeToken.name = name;
    if (/Verbündet/i.test(rest)) actor.prototypeToken.disposition = GESINNUNG.freundlich;
    else if (/\bNeutral\b/i.test(rest)) actor.prototypeToken.disposition = GESINNUNG.neutral;
    else if (/\bFeindlich\b/i.test(rest)) actor.prototypeToken.disposition = GESINNUNG.feindlich;
    else actor.prototypeToken.disposition = null; // Gruppe/Ausnahme entscheidet, sonst feindlich
    if (typWort === "horde") {
      const h = rest.match(/Horde\s*\((\d+)\s*\/\s*HP\)/i);
      if (!h) throw new StatblockFehler(`Horde ohne „(n/HP)“ in der Tier-Zeile: „${rest}“`);
      s.typeData = { type: "horde", hordeHP: Number(h[1]), hordeDamage: "" };
    }
  }

  // 2. Beschreibung (kursiv)
  const besch = zeilen[i]?.text.match(/^\*(?!\*)(.+)\*$/);
  if (besch) { s.description = `<p>${inlineHtml(besch[1])}</p>`; i++; }
  else hinweise.push("Keine kursive Beschreibung unter der Tier-Zeile");

  // 3. Werte bis FEATURES
  let featuresAb = zeilen.findIndex(z => /^#+\s*FEATURES\s*$/i.test(z.text));
  if (featuresAb < 0) featuresAb = zeilen.length;
  const gefunden = new Set();
  for (; i < featuresAb; i++) {
    const zeile = zeilen[i].text;
    const segs = segmente(zeile);
    for (let k = 0; k < segs.length; k++) {
      const { schluessel, wert } = segs[k];
      const key = schluessel?.toLowerCase();
      if (!key) { hinweise.push(`Zeile nicht verstanden: „${zeile}“`); break; }
      gefunden.add(key);
      if (key === "motives & tactics") s.motivesAndTactics = klartext(wert);
      else if (key === "impulses") s.impulses = klartext(wert);
      else if (key === "difficulty") s.difficulty = zahl(wert, "Difficulty");
      else if (key === "thresholds") {
        if (/^none$/i.test(wert)) s.damageThresholds = { major: 0, severe: 0 };
        else {
          const m = wert.match(/^(\d+)\s*\/\s*(\d+)$/);
          if (!m) throw new StatblockFehler(`Thresholds nicht verstanden: „${wert}“`);
          s.damageThresholds = { major: Number(m[1]), severe: Number(m[2]) };
        }
      }
      else if (key === "hp") s.resources.hitPoints.max = zahl(wert, "HP");
      else if (key === "stress") s.resources.stress.max = zahl(wert, "Stress");
      else if (key === "atk") {
        s.attack.roll.bonus = String(zahl(wert, "ATK"));
        const angriff = segs[k + 1];
        const dmg = segs[k + 2];
        if (!angriff?.schluessel || !dmg) throw new StatblockFehler(`Angriff nicht verstanden: „${zeile}“ (erwartet „**ATK:** +1 | **Name:** Far | 1d6+2 mag“)`);
        s.attack.name = angriff.schluessel;
        const reichweite = REICHWEITEN[angriff.wert.toLowerCase()];
        if (!reichweite) throw new StatblockFehler(`Reichweite nicht verstanden: „${angriff.wert}“`);
        s.attack.range = reichweite;
        const sch = schaden(dmg.wert);
        s.attack.damage.main.value = sch.wert;
        s.attack.damage.main.type = [sch.typ];
        gefunden.add("angriff");
        break;
      }
      else if (key === "experience" || key === "experiences") {
        for (const teil of wert.split(/\s*,\s*/).filter(Boolean)) {
          const m = teil.match(/^(.+?)\s+([+−–-]\s*\d+)$/);
          if (!m) throw new StatblockFehler(`Experience nicht verstanden: „${teil}“`);
          s.experiences[`#${Object.keys(s.experiences).length}`] = { name: m[1].trim(), value: zahl(m[2].replace(/\s/g, ""), "Experience"), description: "" };
        }
      }
      else if (key === "potential adversaries" && umgebung) {
        for (const gruppe of wert.split(/\s+·\s+/).filter(Boolean)) {
          s.potentialAdversaries[`#${Object.keys(s.potentialAdversaries).length}`] = { label: klartext(gruppe), adversaries: [] };
        }
      }
      else hinweise.push(`Unbekannter Eintrag „${schluessel}“ – ignoriert`);
    }
  }
  const pflicht = umgebung ? ["difficulty", "impulses"] : ["difficulty", "thresholds", "hp", "stress", "atk", "motives & tactics"];
  for (const p of pflicht) if (!gefunden.has(p)) throw new StatblockFehler(`Es fehlt „${p}“`);

  // 4. Features (in den ungefilterten Zeilen, damit Leerzeilen Absätze trennen)
  const features = [];
  const start = block.zeilen.findIndex(z => /^#+\s*FEATURES\s*$/i.test(z.text));
  for (let k = start < 0 ? block.zeilen.length : start + 1; k < block.zeilen.length; k++) {
    const roh = block.zeilen[k].text;
    const f = roh.match(FEATURE) ? featureAusZeile(roh) : null;
    if (f) { features.push(f); continue; }
    if (roh === "" || /^>+$/.test(roh)) continue;
    const aktuell = features.at(-1);
    if (!aktuell) { hinweise.push(`Text vor dem ersten Feature ignoriert: „${roh}“`); continue; }
    const punkt = roh.match(/^[-*]\s+(.*)$/);
    const frage = roh.match(/^\*(?!\*)(.+)\*$/);
    if (punkt && !frage) {
      const letztes = aktuell.stuecke.at(-1);
      if (letztes?.art === "liste") letztes.punkte.push(punkt[1]);
      else aktuell.stuecke.push({ art: "liste", punkte: [punkt[1]] });
    } else if (frage) aktuell.stuecke.push({ art: "frage", text: roh });
    else aktuell.stuecke.push({ art: "absatz", text: roh });
  }
  actor.items = features.map(f => mitRohtext(featureVorlage(f.name, f.form, featureHtml(f, umgebung)), f));

  if (!umgebung && s.type === "horde") {
    const horde = features.find(f => /^Horde\b/i.test(f.name));
    const m = horde?.name.match(/\(([^)]+)\)/);
    if (m) s.typeData.hordeDamage = m[1].replace(/\s+/g, "");
    else hinweise.push("Horde ohne Feature „Horde (Würfel)“ – Horden-Schaden fehlt");
  }
  return { actor, hinweise, umgebung };
}

/** Der Markdown-Text jedes Features, damit die Automatik ihn später lesen kann (landet nicht im Kompendium). */
const ROHTEXT = new WeakMap();
function mitRohtext(item, f) {
  const text = f.stuecke.filter(s => s.art !== "frage").map(s => s.art === "liste" ? s.punkte.join(" ") : s.text).join(" ");
  ROHTEXT.set(item, { name: f.name, form: f.form, text });
  return item;
}

/** Hängt an passende Features eine Aktion des Systems (Kosten, Save, Schaden). */
function automatikAnwenden(actor, einst, protokoll) {
  const a = einst.automatik ?? {};
  if (!a.an) return;
  if (Array.isArray(a.nurFuer) && !a.nurFuer.includes(actor.name)) return;
  for (const item of actor.items) {
    const roh = ROHTEXT.get(item);
    if (!roh) continue;
    const { aktion, zusammenfassung, hinweise, beiFehlschlag, beiErfolg } = aktionFuer(roh, item.img);
    if (aktion) {
      item.system.actions = { "#0": aktion };
      // Folgen eines Saves wendet der Helfer im Modul an (modul/scripts/main.mjs)
      if (beiFehlschlag || beiErfolg) {
        const flag = {};
        if (beiFehlschlag) flag.onFailedSave = beiFehlschlag;
        if (beiErfolg) flag.onSuccessfulSave = beiErfolg;
        item.flags = { ...item.flags, [MODUL_FLAG]: flag };
      }
      protokoll.push({ gegner: actor.name, feature: item.name, was: zusammenfassung });
    }
    for (const h of hinweise) protokoll.push({ gegner: actor.name, feature: item.name, was: `Hinweis: ${h}`, hinweis: true });
  }
}

/** Name eines Stat Blocks: der erste heißt wie die Notiz, weitere bekommen den Zusatz nach dem Gedankenstrich. */
export function blockName(notizName, kopf, index) {
  if (index === 0) return notizName;
  const zusatz = kopf.split(/\s+[—–-]\s+/).slice(1).join(" — ");
  return `${notizName} — ${normaleSchreibung(zusatz || kopf)}`;
}

/** Gesinnung und Größe aus den Einstellungen (Gruppe, Ausnahmen je Gegner). */
function regelnAnwenden(actor, gruppe, einst) {
  if (actor.type !== "adversary") return;
  const t = actor.prototypeToken;
  const ausnahme = einst.ausnahmen?.[actor.name] ?? {};
  if (t.disposition === null || ausnahme.gesinnung) {
    const wort = ausnahme.gesinnung ?? einst.gesinnungProGruppe?.[gruppe] ?? "feindlich";
    if (!(wort in GESINNUNG)) throw new StatblockFehler(`Unbekannte Gesinnung „${wort}“ in den Einstellungen (möglich: feindlich, neutral, freundlich)`);
    t.disposition = GESINNUNG[wort];
  }
  if (ausnahme.groesse) {
    if (!(ausnahme.groesse in GROESSEN)) {
      throw new StatblockFehler(`Unbekannte Größe „${ausnahme.groesse}“ in den Einstellungen (möglich: ${Object.keys(GROESSEN).join(", ")})`);
    }
    actor.system.size = ausnahme.groesse;
    t.width = t.height = GROESSEN[ausnahme.groesse];
  }
}

function varianteBauen(basis, v) {
  const a = structuredClone(basis);
  a.name = v.name;
  if (a.prototypeToken) a.prototypeToken.name = v.name;
  const s = a.system;
  const setzen = {
    hp: x => { s.resources.hitPoints.max = x; },
    stress: x => { s.resources.stress.max = x; },
    difficulty: x => { s.difficulty = x; },
    major: x => { s.damageThresholds.major = x; },
    severe: x => { s.damageThresholds.severe = x; },
    atk: x => { s.attack.roll.bonus = String(x); },
    tier: x => { s.tier = x; }
  };
  for (const [k, x] of Object.entries(v.werte ?? {})) {
    const f = setzen[k.toLowerCase()];
    if (!f) throw new StatblockFehler(`Variante „${v.name}“: unbekannter Wert „${k}“ (möglich: HP, Stress, Difficulty, Major, Severe, ATK, Tier)`);
    f(zahl(x, k));
  }
  if (v.beschreibungZusatz) {
    const zusatz = inlineHtml(v.beschreibungZusatz);
    s.description = s.description.endsWith("</p>") ? s.description.slice(0, -4) + " " + zusatz + "</p>" : s.description + `<p>${zusatz}</p>`;
  }
  // structuredClone verliert die Rohtexte – wieder zuordnen
  basis.items.forEach((item, i) => { const r = ROHTEXT.get(item); if (r) ROHTEXT.set(a.items[i], r); });
  const neu = (liste) => (liste ?? []).map(z => {
    const f = featureAusZeile(z);
    if (!f) throw new StatblockFehler(`Variante „${v.name}“: Feature nicht verstanden: „${z}“ (erwartet „Name - Passive: Text“)`);
    return mitRohtext(featureVorlage(f.name, f.form, featureHtml(f, false)), f);
  });
  a.items = [...neu(v.featuresVorne), ...a.items, ...neu(v.featuresHinten)];
  return a;
}

/**
 * @returns {{ eintraege: {name, gruppe, actor, herkunft}[], probleme: {wo, was}[], hinweise: {wo, was}[] }}
 */
export function ausNotizen(einst, notizen) {
  const eintraege = [];
  const probleme = [];
  const hinweise = [];

  // Notizen-Reiter der Umgebungen (system.notes): HTML-Dateien im Projekt, siehe "umgebungsNotizen" in den Einstellungen.
  const umgebungsNotizen = new Map();
  for (const [name, datei] of Object.entries(einst.umgebungsNotizen ?? {})) {
    try {
      umgebungsNotizen.set(name, fs.readFileSync(path.resolve(PROJEKT, datei), "utf8").trim());
    } catch {
      probleme.push({ wo: "einstellungen.json", was: `Notizen-Datei für „${name}“ fehlt: ${datei}` });
    }
  }

  for (const notiz of notizen.filter(n => n.hatStatblock)) {
    const datei = path.basename(notiz.datei);
    findeStatblocks(notiz.text).forEach((block, index) => {
      const name = blockName(notiz.name, block.kopf, index);
      try {
        const { actor, hinweise: h, umgebung } = statblockZuActor(block, name);
        if (umgebung !== notiz.umgebung) h.push(umgebung ? "Sieht aus wie eine Umgebung, liegt aber bei den Gegnern" : "Sieht aus wie ein Gegner, liegt aber bei den Umgebungen");
        if (umgebung && umgebungsNotizen.has(name)) actor.system.notes = umgebungsNotizen.get(name);
        regelnAnwenden(actor, notiz.gruppe, einst);
        for (const was of h) hinweise.push({ wo: `${datei} → ${name}`, was });
        eintraege.push({ name, gruppe: notiz.gruppe, actor, herkunft: datei });
      } catch (fehler) {
        if (!(fehler instanceof StatblockFehler)) throw fehler;
        probleme.push({ wo: `${datei} → [!statblock] ${block.kopf}`, was: fehler.message });
      }
    });
  }

  for (const v of einst.varianten) {
    const basis = eintraege.find(e => e.name === v.basis);
    if (!basis) { probleme.push({ wo: `Variante ${v.name}`, was: `Basis-Gegner „${v.basis}“ nicht gefunden` }); continue; }
    try {
      const actor = varianteBauen(basis.actor, v);
      regelnAnwenden(actor, basis.gruppe, einst);
      eintraege.push({ name: v.name, gruppe: basis.gruppe, actor, herkunft: `Variante von ${v.basis}` });
    } catch (fehler) {
      if (!(fehler instanceof StatblockFehler)) throw fehler;
      probleme.push({ wo: `Variante ${v.name}`, was: fehler.message });
    }
  }
  for (const name of Object.keys(einst.ausnahmen ?? {})) {
    if (!eintraege.some(e => e.name === name)) hinweise.push({ wo: "einstellungen.json", was: `Ausnahme für „${name}“, aber diesen Gegner gibt es nicht` });
  }

  // Automatik erst am Ende, damit Varianten sie genauso bekommen wie ihre Basis
  const automatik = [];
  for (const e of eintraege) automatikAnwenden(e.actor, einst, automatik);
  for (const name of einst.automatik?.nurFuer ?? []) {
    if (!eintraege.some(e => e.name === name)) hinweise.push({ wo: "einstellungen.json", was: `Automatik für „${name}“, aber diesen Gegner gibt es nicht` });
  }
  return { eintraege, probleme, hinweise, automatik };
}
