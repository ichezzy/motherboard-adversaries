/**
 * Macht aus einem Actor (egal ob aus JSON-Datei oder später aus einer Notiz) einen Kompendium-Eintrag:
 * feste IDs, Ordner, _stats, _key-Felder für das Foundry-Werkzeug, Horden-Effekt.
 * Werte und Texte bleiben unverändert.
 */
import { festeId, idZaehler } from "./ids.mjs";

export const STATS = Object.freeze({ coreVersion: "14.365", systemId: "daggerheart", systemVersion: "2.12.9" });

const stats = () => ({ ...STATS });

/** Foundrys eingebaute Horden-Regel, wie in den SRD-Horden von Daggerheart 2.12.9. */
function hordenEffekt(id) {
  return {
    name: "Horde",
    img: "icons/magic/movement/chevrons-down-yellow.webp",
    showIcon: 2,
    system: {
      conditionals: [{
        type: "dataCompare",
        key: "system.resources.hitPoints.value",
        comparator: "greaterEquals",
        value: "@system.resources.hitPoints.max / 2"
      }],
      changes: [{
        type: "standardAttack",
        value: { name: "", damageTypes: [], attackRange: null, trait: null, damageFormula: "@system.typeData.hordeDamage", img: null },
        priority: 0,
        phase: "initial"
      }],
      duration: { description: "" },
      rangeDependence: null,
      stacking: null,
      targetDispositions: []
    },
    _id: id,
    type: "base",
    disabled: false,
    start: null,
    duration: { value: null, units: "seconds", expiry: null, expired: false },
    description: "",
    tint: "#ffffff",
    transfer: true,
    statuses: [],
    folder: null,
    sort: 0,
    flags: {},
    _stats: stats()
  };
}

/** Geheime Abschnitte (Fragen bei Umgebungen) bekommen feste IDs statt zufälliger. */
function geheimIds(html, actorName, featureName) {
  let n = 0;
  return html.replace(/id="secret-[A-Za-z0-9]*"/g, () => `id="secret-${festeId("geheim", actorName, featureName, n++)}"`);
}

/**
 * @param {object} actor   Actor-Daten (werden nicht verändert; es wird eine Kopie zurückgegeben)
 * @param {object} opts    { name, ordnerId, hordenSchadenAutomatisch }
 * @returns {{ actor: object, hinweise: string[] }}
 */
export function fertigmachen(actor, { name, ordnerId, hordenSchadenAutomatisch = true }) {
  const a = structuredClone(actor);
  const hinweise = [];
  const actorId = festeId("actor", name);

  a.name = name;
  a._id = actorId;
  a.folder = ordnerId;
  a.sort = 0;
  a.flags ??= {};
  a.effects ??= [];
  a.ownership = { default: 0 };
  a._stats = stats();
  if (a.prototypeToken) a.prototypeToken.name = name;

  // Experiences: feste Schlüssel aus dem Namen
  if (a.system?.experiences) {
    const zaehler = idZaehler();
    a.system.experiences = Object.fromEntries(
      Object.values(a.system.experiences).map(exp => [festeId("experience", name, exp.name, zaehler(exp.name)), exp])
    );
  }
  // Standardangriff
  if (a.system?.attack) a.system.attack._id = festeId("angriff", name);

  // Potenzielle Gegner bei Umgebungen
  if (a.system?.potentialAdversaries) {
    const zaehler = idZaehler();
    a.system.potentialAdversaries = Object.fromEntries(
      Object.values(a.system.potentialAdversaries).map(g => [festeId("potenziell", name, g.label, zaehler(g.label)), g])
    );
  }

  // Features
  const zaehler = idZaehler();
  a.items = (a.items ?? []).map((item, index) => {
    const itemId = festeId("feature", name, item.name, zaehler(item.name));
    const i = {
      ...item,
      _id: itemId,
      folder: null,
      sort: index * 100000,
      flags: item.flags ?? {},
      ownership: { default: 0 },
      _stats: stats(),
      _key: `!actors.items!${actorId}.${itemId}`
    };
    i.system = { ...item.system, description: geheimIds(item.system?.description ?? "", name, item.name) };
    i.effects = (item.effects ?? []).map((eff, n) => {
      const effId = festeId("effekt", name, item.name, n);
      return { ...eff, _id: effId, _stats: stats(), _key: `!actors.items.effects!${actorId}.${itemId}.${effId}` };
    });
    return i;
  });

  // Horden: Ab halben HP macht der Standardangriff den Horden-Schaden (Systemregel, wie bei SRD-Horden).
  if (a.type === "adversary" && a.system?.type === "horde" && hordenSchadenAutomatisch) {
    const horde = a.items.find(i => /^Horde\b/i.test(i.name));
    if (!horde) {
      hinweise.push("Horde ohne Feature „Horde (…)“ – der halbe Schaden ab halben HP greift nicht automatisch.");
    } else if (!horde.effects.length) {
      horde.flags = { ...horde.flags, daggerheart: { ...(horde.flags.daggerheart ?? {}), hordeFeature: true } };
      const effId = festeId("effekt", name, horde.name, "horde");
      horde.effects = [{ ...hordenEffekt(effId), _key: `!actors.items.effects!${actorId}.${horde._id}.${effId}` }];
    }
  }

  a._key = `!actors!${actorId}`;
  return { actor: a, hinweise };
}

/** Ordner-Dokument im Kompendium. Die Einträge darin sortiert Foundry alphabetisch. */
export function ordnerDokument(name, position) {
  const id = festeId("ordner", name);
  return {
    type: "Actor",
    folder: null,
    name,
    color: null,
    sorting: "a",
    _id: id,
    description: "",
    sort: (position + 1) * 100000,
    flags: {},
    _stats: stats(),
    _key: `!folders!${id}`
  };
}
