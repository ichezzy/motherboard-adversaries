/**
 * Automatik für Features: Aus dem englischen Feature-Text wird eine Aktion des Daggerheart-Systems –
 * so, wie die SRD-Gegner sie haben:
 *   - „**Mark a Stress**“ / „**Spend a Fear**“ am Anfang  → Kosten (werden beim Benutzen abgezogen)
 *   - „Instinct Reaction Roll (12)“                       → Save mit Wert und Schwierigkeit
 *   - „within Close range of a point within Far range“   → Reichweite Far, Kreis „Close“ zum Platzieren
 *   - „All PCs within Far range“                          → Kreis „Far“ zum Platzieren
 *   - „take **3d8+3** magic damage … half damage“         → Schaden bei Fehlschlag, halb bei Erfolg
 * Alles andere bleibt Text (auch „lose a Hope“ beim Ziel). Ist etwas unklar, gibt es keine Aktion, sondern einen Hinweis.
 */
import { REICHWEITEN } from "./vorlagen.mjs";

const ZAHLWORT = { a: 1, an: 1, one: 1, two: 2, three: 3, four: 4 };
const TRAITS = "Agility|Strength|Finesse|Instinct|Presence|Knowledge";
const RW = "Melee|Very Close|Close|Far|Very Far";

const zahl = w => ZAHLWORT[w.toLowerCase()] ?? Number(w);
const reichweite = w => REICHWEITEN[w.toLowerCase()];
const ohneMarkdown = t => t.replace(/\*+/g, "").replace(/\s+/g, " ").trim();

function grundgeruest(typ, name, bild) {
  const a = {
    type: typ,
    _id: "",
    systemPath: "actions",
    description: "",
    chatDisplay: true,
    actionType: "action",
    cost: [],
    uses: { value: null, max: "", recovery: null, consumeOnSuccess: false },
    target: { type: "any", amount: null },
    effects: [],
    name,
    img: bild,
    range: "",
    areas: [],
    baseAction: false,
    originItem: { type: "itemCollection" },
    triggers: []
  };
  if (typ === "attack") {
    a.damage = { main: null, resources: {} };
    a.roll = {
      type: null, trait: null, difficulty: null, bonus: null, advState: "neutral",
      diceRolling: { multiplier: "prof", flatMultiplier: 1, dice: "d6", compare: null, treshold: null },
      useDefault: false
    };
    a.save = { trait: null, difficulty: null, damageMod: "none" };
  }
  return a;
}

/** Kosten: das erste fett gedruckte „Mark a Stress“/„Spend a Fear“, das nicht die Folge eines Saves ist. */
export function kosten(text) {
  const m = text.match(/\*\*(Mark|Spend) (a|an|one|two|three|\d+) (Stress|Fear)\*\*/i);
  if (!m) return null;
  const davor = ohneMarkdown(text.slice(0, m.index));
  if (/\bmust$|Reaction Roll|\bor$|\band$|\bfail/i.test(davor)) return null;
  return { key: m[3].toLowerCase(), value: zahl(m[2]) };
}

export function save(textPlain) {
  const m = textPlain.match(new RegExp(`\\b(${TRAITS})(?: or (${TRAITS}))? Reaction Roll(?:\\s*\\((\\d+)\\))?`, "i"));
  if (!m) return { save: null };
  if (m[2]) return { save: null, hinweis: `Reaction Roll mit zwei Werten (${m[1]} oder ${m[2]}) – Save bleibt Text` };
  return { save: { trait: m[1].toLowerCase(), difficulty: m[3] ? Number(m[3]) : null }, ende: m.index + m[0].length };
}

export function bereich(textPlain) {
  let m = textPlain.match(new RegExp(`within (${RW}) range of a point within (${RW}) range`, "i"));
  if (m) return { range: reichweite(m[2]), flaeche: reichweite(m[1]) };
  m = textPlain.match(new RegExp(`\\b(?:all|each|every)(?: \\w+)? (?:PCs?|creatures?|targets?|enemies|characters?|one)(?: \\w+)? within (${RW}) range`, "i"));
  if (m) return { range: reichweite(m[1]), flaeche: reichweite(m[1]) };
  m = textPlain.match(new RegExp(`\\b(?:a|an|one|up to \\w+) (?:\\w+ )?(?:PCs?|targets?|creatures?|enemy|enemies)(?: \\w+)? within (${RW}) range`, "i"));
  if (m) return { range: reichweite(m[1]), flaeche: null };
  // Sonst: die erste genannte Reichweite, Ziel per Markierung
  m = textPlain.match(new RegExp(`within (${RW}) range`, "i"));
  if (m) return { range: reichweite(m[1]), flaeche: null };
  return { range: "", flaeche: null };
}

function wurfWert(formel) {
  const f = formel.replace(/\s+/g, "").replace(/[−–]/g, "-");
  const m = f.match(/^(\d*)d(\d+)([+-]\d+)?$/i);
  if (m) {
    return {
      custom: { enabled: false, formula: "" },
      flatMultiplier: m[1] ? Number(m[1]) : 1, dice: `d${m[2]}`, bonus: m[3] ? Number(m[3]) : null, multiplier: "flat"
    };
  }
  if (/^\d+$/.test(f)) return { custom: { enabled: true, formula: f }, multiplier: "flat", flatMultiplier: 1, dice: "d6", bonus: null };
  return null;
}

/**
 * @param {{name:string, form:string, text:string}} f  text = Markdown des Features (alle Absätze)
 * @returns {{ aktion: object|null, zusammenfassung: string|null, hinweise: string[] }}
 */
export function aktionFuer(f, bild = "icons/svg/aura.svg") {
  const hinweise = [];
  if (f.form === "passive") return { aktion: null, zusammenfassung: null, hinweise };
  const plain = ohneMarkdown(f.text);
  const k = kosten(f.text);
  const s = save(plain);
  if (s.hinweis) hinweise.push(s.hinweis);
  if (!k && !s.save) return { aktion: null, zusammenfassung: null, hinweise };

  const name = k ? (k.key === "stress" ? "Mark Stress" : "Spend Fear") : "Roll Save";
  const aktion = grundgeruest(s.save ? "attack" : "effect", name, bild);
  const teile = [];
  if (k) {
    aktion.cost = [{ scalable: false, key: k.key, value: k.value, step: null, itemId: null, consumeOnSuccess: false }];
    teile.push(`${k.value} ${k.key === "stress" ? "Stress" : "Fear"}`);
  }
  // Reichweite und Kreis nur, wenn jemand einen Save würfeln muss
  const b = s.save ? bereich(plain) : { range: "", flaeche: null };
  aktion.range = b.range ?? "";
  if (b.flaeche) {
    aktion.areas = [{ name: f.name, type: "placed", shape: "emanation", size: b.flaeche, effects: [], hasHole: false }];
  }

  if (s.save) {
    aktion.save = { trait: s.save.trait, difficulty: s.save.difficulty, damageMod: "none" };
    teile.push(`Save ${s.save.trait[0].toUpperCase() + s.save.trait.slice(1)}${s.save.difficulty ? ` (${s.save.difficulty})` : ""}`);
    const folge = plain.slice(s.ende);
    const sch = folge.match(/take (\d*d\d+(?:\s*[+−–-]\s*\d+)?|\d+) (magic|magical|physical) damage/i);
    if (sch) {
      const wert = wurfWert(sch[1]);
      if (wert) {
        aktion.damage.main = {
          value: wert, applyTo: "hitPoints", type: [/^phys/i.test(sch[2]) ? "physical" : "magical"],
          base: false, resultBased: false, valueAlt: null, includeBase: false, direct: false,
          groupAttack: "", fullRestore: false, itemId: null
        };
        teile.push(`${sch[1].replace(/\s+/g, "")} ${/^phys/i.test(sch[2]) ? "phy" : "mag"}`);
      }
      if (/half damage|half on a success|take half|half that damage/i.test(folge)) {
        aktion.save.damageMod = "half";
        teile.push("halb bei Erfolg");
      }
    }
    // „lose a Hope“ / „mark a Stress“ beim Ziel bleiben Text: Das System (2.12.9) zieht solche
    // Ressourcen auch bei geschafftem Save ab – nur der Haupt-Schaden richtet sich nach dem Save.
    if (/\blose (a|an|one|two|three|\d+) Hope\b|\bmark (a|an|one|two|three|\d+) Stress\b/i.test(folge)) {
      hinweise.push("Hope/Stress-Verlust beim Ziel bleibt Text (das System würde ihn auch bei geschafftem Save abziehen)");
    }
  }
  if (b.flaeche) teile.push(`Kreis ${b.flaeche}${b.range !== b.flaeche ? ` in ${b.range}` : ""}`);
  else if (b.range) teile.push(`Ziel in ${b.range}`);
  return { aktion, zusammenfassung: teile.join(", "), hinweise };
}
