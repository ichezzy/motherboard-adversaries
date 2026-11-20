import { test } from "node:test";
import assert from "node:assert/strict";
import { aktionFuer, kosten } from "../werkzeug/automatik.mjs";

const f = (text, form = "action") => ({ name: "Test", form, text });

test("Kosten nur am Anfang bzw. vor dem Save, nicht als Folge", () => {
  assert.deepEqual(kosten("**Mark a Stress**. All PCs ... or lose a Hope and **mark a Stress**."), { key: "stress", value: 1 });
  assert.deepEqual(kosten("When X happens, Sable can **mark a Stress** to pull them aside."), { key: "stress", value: 1 });
  assert.deepEqual(kosten("**Spend a Fear** to call the pack."), { key: "fear", value: 1 });
  assert.equal(kosten("must succeed on an Instinct Reaction Roll (12) or **mark a Stress**."), null);
});

test("Kreischer: Stress, Save, Kreis Close in Far", () => {
  const { aktion } = aktionFuer(f("**Mark a Stress**. All PCs within Close range of a point within Far range must succeed on an Instinct Reaction Roll (12) or lose a Hope and **mark a Stress**."));
  assert.equal(aktion.type, "attack");
  assert.deepEqual(aktion.cost.map(c => [c.key, c.value]), [["stress", 1]]);
  assert.deepEqual(aktion.save, { trait: "instinct", difficulty: 12, damageMod: "none" });
  assert.equal(aktion.range, "far");
  assert.equal(aktion.areas[0].size, "close");
  assert.equal(aktion.areas[0].type, "placed");
  assert.deepEqual(aktion.damage.resources, {}, "Hope/Stress beim Ziel bleiben Text");
});

test("Schaden mit halbem Schaden bei Erfolg", () => {
  const { aktion } = aktionFuer(f("**Spend a Fear** to scream. All PCs within Far range must make an Instinct Reaction Roll (18). Targets who fail take **3d8+3** magic damage. Targets who succeed take half damage."));
  assert.equal(aktion.cost[0].key, "fear");
  assert.equal(aktion.save.damageMod, "half");
  assert.equal(aktion.damage.main.value.flatMultiplier, 3);
  assert.equal(aktion.damage.main.value.dice, "d8");
  assert.equal(aktion.damage.main.value.bonus, 3);
  assert.deepEqual(aktion.damage.main.type, ["magical"]);
  assert.equal(aktion.areas[0].size, "far");
});

test("Nur Kosten: Effekt-Aktion ohne Save; Passive bekommen nichts", () => {
  const { aktion } = aktionFuer(f("**Mark a Stress** to become *Hidden* until after its next attack."));
  assert.equal(aktion.type, "effect");
  assert.equal(aktion.save, undefined);
  assert.equal(aktionFuer(f("It can be spotlighted. **Spend a Fear** as usual.", "passive")).aktion, null);
  assert.equal(aktionFuer(f("A creature within Close range can't be Hidden.")).aktion, null);
});

test("Zwei mögliche Werte: kein Save, nur Hinweis", () => {
  const { aktion, hinweise } = aktionFuer(f("A PC makes an Agility or Strength Reaction Roll (14)."));
  assert.equal(aktion, null);
  assert.equal(hinweise.length, 1);
});
