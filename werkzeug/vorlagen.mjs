/**
 * Grundgerüste für Actors und Features – Struktur wie in Foundrys „Export Data“ (Daggerheart 2.12.9),
 * abgeglichen mit den SRD-Gegnern des Systems.
 */
import { STATS } from "./fertigmachen.mjs";

export const QUELLE = "White Signal (Homebrew)";
const GEGNER_BILD = "systems/daggerheart/assets/icons/documents/actors/dragon-head.svg";
const UMGEBUNG_BILD = "systems/daggerheart/assets/icons/documents/actors/forest.svg";

export const REICHWEITEN = {
  "melee": "melee",
  "very close": "veryClose",
  "close": "close",
  "far": "far",
  "very far": "veryFar"
};

export const GEGNER_TYPEN = ["bruiser", "horde", "leader", "minion", "ranged", "skulk", "social", "solo", "standard", "support"];
export const UMGEBUNG_TYPEN = ["exploration", "social", "traversal", "event"];

export function groesseFuer(typ) {
  if (typ === "solo") return { size: "huge", feld: 3 };
  if (typ === "bruiser") return { size: "large", feld: 2 };
  return { size: "medium", feld: 1 };
}

function widerstand() {
  return { resistance: false, immunity: false, reduction: 0 };
}

export function angriffVorlage() {
  return {
    name: "Attack",
    roll: {
      bonus: "0", type: "attack", trait: null, difficulty: null, advState: "neutral",
      diceRolling: { multiplier: "prof", flatMultiplier: 1, dice: "d6", compare: null, treshold: null },
      useDefault: false
    },
    damage: {
      main: {
        value: { custom: { enabled: false, formula: "" }, dice: "d6", bonus: null, multiplier: "flat", flatMultiplier: 1 },
        applyTo: "hitPoints",
        type: ["physical"],
        resultBased: false,
        valueAlt: { multiplier: "prof", flatMultiplier: 1, dice: "d6", bonus: null, custom: { enabled: false, formula: "" } },
        base: false, includeBase: false, direct: false, fullRestore: false, itemId: null
      },
      resources: {}
    },
    img: "icons/skills/melee/blood-slash-foam-red.webp",
    type: "attack",
    range: "melee",
    chatDisplay: false,
    _id: "",
    systemPath: "attack",
    baseAction: false,
    description: "",
    originItem: { type: "itemCollection" },
    actionType: "action",
    triggers: [], areas: [], cost: [],
    uses: { value: null, max: null, recovery: null, consumeOnSuccess: false },
    target: { type: "any", amount: null },
    effects: [],
    save: { trait: null, difficulty: null, damageMod: "none" }
  };
}

export function gegnerVorlage() {
  return {
    name: "",
    img: GEGNER_BILD,
    type: "adversary",
    system: {
      difficulty: 0,
      damageThresholds: { major: 0, severe: 0 },
      resources: { hitPoints: { value: 0, max: 0 }, stress: { value: 0, max: 0 } },
      motivesAndTactics: "",
      resistance: { physical: widerstand(), magical: widerstand() },
      type: "standard",
      notes: "",
      experiences: {},
      tier: 1,
      description: "",
      attack: angriffVorlage(),
      attribution: { source: QUELLE, page: null, artist: "" },
      size: "medium",
      advantageSources: [], disadvantageSources: [],
      criticalThreshold: 20,
      typeData: null,
      subTypes: {}
    },
    flags: {},
    prototypeToken: {
      name: "", displayName: 0, actorLink: false, width: 1, height: 1,
      texture: { src: GEGNER_BILD, fit: "contain", scaleX: 1, scaleY: 1 },
      disposition: -1, displayBars: 0,
      bar1: { attribute: "resources.hitPoints" }, bar2: { attribute: "resources.stress" }
    },
    items: [],
    effects: [],
    _stats: { ...STATS },
    ownership: { default: 0 }
  };
}

export function umgebungVorlage() {
  return {
    name: "",
    img: UMGEBUNG_BILD,
    type: "environment",
    system: {
      potentialAdversaries: {},
      notes: "",
      difficulty: 0,
      tier: 1,
      description: "",
      type: "exploration",
      impulses: "",
      attribution: { source: QUELLE, page: null, artist: "" }
    },
    flags: {},
    items: [],
    effects: [],
    _stats: { ...STATS },
    ownership: { default: 0 }
  };
}

export function featureVorlage(name, form, beschreibung) {
  return {
    name,
    type: "feature",
    _id: "",
    img: "icons/svg/aura.svg",
    system: {
      description: beschreibung,
      resource: null, actions: {}, attribution: {}, gmNotes: "",
      featureForm: form, granter: null, actorResources: []
    },
    effects: [], folder: null, sort: 0, flags: {},
    _stats: { ...STATS },
    ownership: { default: 0 }
  };
}
