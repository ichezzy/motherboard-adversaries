import { test } from "node:test";
import assert from "node:assert/strict";
import { findeStatblocks, statblockZuActor, blockName, schaden } from "../werkzeug/aus-notizen.mjs";
import { inlineHtml, normaleSchreibung } from "../werkzeug/markdown.mjs";

const KREISCHER = `Vorlesetext, gehört nicht dazu.

> [!statblock] KREISCHER
> ***Tier 1 Support***
> *A ragged signal drone from the old masts, circling high on whining rotors. Before it strikes, every receiver in range howls with feedback.*
> **Motives & Tactics:** Circle out of reach, scream on familiar frequencies, call the pack, flee from silence
>
> > **Difficulty:** 12 | **Thresholds:** 4/8 | **HP:** 3 | **Stress:** 3
> > **ATK:** +1 | **Feedback Pulse:** Far | 1d6+2 mag
> >
> > ---
> > **Experience:** Frequencies +2
>
> ### FEATURES
> ***Rotors - Passive:*** The Kreischer flies. A PC can only reach it in Melee range by climbing, leaping from something tall, or flying.
>
> ***Feedback Howl - Action:*** **Mark a Stress**. All PCs within Close range of a point within Far range must succeed on an Instinct Reaction Roll (12) or lose a Hope and **mark a Stress**.
>
> ***Call the Pack - Action:*** **Spend a Fear** to call nearby [[Restlinge (DH)|Restlinge]]: summon one [[Nahtjäger (DH)]] horde at Far range.
> >

## Am Tisch
Deutscher Text.`;

test("Kreischer wie in Anhang B", () => {
  const bloecke = findeStatblocks(KREISCHER);
  assert.equal(bloecke.length, 1);
  const { actor, hinweise } = statblockZuActor(bloecke[0], "Kreischer");
  assert.deepEqual(hinweise, []);
  const s = actor.system;
  assert.equal(s.tier, 1);
  assert.equal(s.type, "support");
  assert.equal(s.difficulty, 12);
  assert.deepEqual(s.damageThresholds, { major: 4, severe: 8 });
  assert.equal(s.resources.hitPoints.max, 3);
  assert.equal(s.resources.stress.max, 3);
  assert.equal(s.attack.name, "Feedback Pulse");
  assert.equal(s.attack.range, "far");
  assert.equal(s.attack.roll.bonus, "1");
  assert.equal(s.attack.damage.main.value.dice, "d6");
  assert.equal(s.attack.damage.main.value.bonus, 2);
  assert.deepEqual(s.attack.damage.main.type, ["magical"]);
  assert.deepEqual(Object.values(s.experiences), [{ name: "Frequencies", value: 2, description: "" }]);
  assert.equal(actor.items.length, 3);
  assert.equal(actor.items[1].system.featureForm, "action");
  assert.equal(actor.items[1].system.description,
    "<p><strong>Mark a Stress</strong>. All PCs within Close range of a point within Far range must succeed on an Instinct Reaction Roll (12) or lose a Hope and <strong>mark a Stress</strong>.</p>");
  assert.match(actor.items[2].system.description, /call nearby Restlinge: summon one Nahtjäger horde/);
  assert.equal(actor.prototypeToken.disposition, null, "Gesinnung entscheidet später die Einstellung");
});

test("Minion: Thresholds None, fester Schaden, typografisches Minus", () => {
  const block = findeStatblocks(`> [!statblock] GUTTER RUNT
> ***Tier 1 Minion***
> *A runt.*
> **Motives & Tactics:** Swarm
>
> > **Difficulty:** 9 | **Thresholds:** None | **HP:** 1 | **Stress:** 1
> > **ATK:** −2 | **Sharpened Pipe:** Melee | 2 phy
>
> ### FEATURES
> ***Minion (3) - Passive:*** Defeated when they take any damage.`)[0];
  const { actor } = statblockZuActor(block, "Gutter Runt");
  assert.deepEqual(actor.system.damageThresholds, { major: 0, severe: 0 });
  assert.equal(actor.system.attack.roll.bonus, "-2");
  assert.deepEqual(actor.system.attack.damage.main.value.custom, { enabled: true, formula: "2" });
  assert.equal(actor.system.attack.damage.main.value.bonus, null);
});

test("Horde und Verbündete aus der Tier-Zeile", () => {
  const horde = statblockZuActor(findeStatblocks(`> [!statblock] HEULER
> ***Tier 1 Horde (2/HP)***
> *Pack.*
> **Motives & Tactics:** Howl
> > **Difficulty:** 12 | **Thresholds:** 5/10 | **HP:** 5 | **Stress:** 3
> > **ATK:** +1 | **Bites:** Melee | 1d8+3 phy
> ### FEATURES
> ***Horde (1d4+2) - Passive:*** Half damage.`)[0], "Heuler").actor;
  assert.deepEqual(horde.system.typeData, { type: "horde", hordeHP: 2, hordeDamage: "1d4+2" });
  const sable = statblockZuActor(findeStatblocks(`> [!statblock] SABLE
> ***Tier 1 Standard — Verbündete***
> *Ally.*
> **Motives & Tactics:** Survive
> > **Difficulty:** 12 | **Thresholds:** 6/11 | **HP:** 4 | **Stress:** 3
> > **ATK:** +1 | **Length of Chain:** Very Close | 1d8+1 phy
> ### FEATURES
> ***Ally - Passive:*** On the PCs' side.`)[0], "Sable").actor;
  assert.equal(sable.prototypeToken.disposition, 1);
  assert.equal(sable.system.attack.range, "veryClose");
});

test("Umgebung: Impulses, Aufzählung, geheime Frage", () => {
  const { actor, umgebung } = statblockZuActor(findeStatblocks(`> [!statblock] ARENA
> ***Tier 1 Event***
> *A pit.*
> **Impulses:** Put on a show
>
> > **Difficulty:** 14
> > **Potential Adversaries:** [[Rohrmolch (DH)|Rohrmolch]], Rassler · Kronenbrecher
>
> ### FEATURES
> ***The Crowd - Passive:*** Two countdowns.
> - **Cheers** tick down.
> - **Boos** tick down.
>
> *Whose name is on the screen?*`)[0], "Arena");
  assert.equal(umgebung, true);
  assert.equal(actor.type, "environment");
  assert.equal(actor.system.impulses, "Put on a show");
  assert.deepEqual(Object.values(actor.system.potentialAdversaries).map(g => g.label), ["Rohrmolch, Rassler", "Kronenbrecher"]);
  assert.equal(actor.items[0].system.description,
    '<p>Two countdowns.</p><ul><li><strong>Cheers</strong> tick down.</li><li><strong>Boos</strong> tick down.</li></ul>' +
    '<section id="secret-" class="secret"><p><em>Whose name is on the screen?</em></p></section>');
});

test("Zweiter Stat Block heißt wie die Notiz plus Zusatz", () => {
  assert.equal(blockName("Nachrufer", "NACHRUFER", 0), "Nachrufer");
  assert.equal(blockName("Nachrufer", "NACHRUFER — SIRENE", 1), "Nachrufer — Sirene");
  assert.equal(blockName("Syfter Bulwark", "SYFTER BULWARK — TIER 2", 1), "Syfter Bulwark — Tier 2");
  assert.equal(normaleSchreibung("ÄTHERSTURM"), "Äthersturm");
});

test("Schaden und Markdown", () => {
  assert.equal(schaden("3d10+4 phy").wert.flatMultiplier, 3);
  assert.equal(schaden("2d8 − 1 mag").wert.bonus, -1);
  assert.throws(() => schaden("viel phy"));
  assert.equal(inlineHtml("***Wichtig*** und *kursiv* und [[Ziel (DH)]]"), "<strong><em>Wichtig</em></strong> und <em>kursiv</em> und Ziel");
});
