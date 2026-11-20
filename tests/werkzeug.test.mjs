import { test } from "node:test";
import assert from "node:assert/strict";
import { festeId } from "../werkzeug/ids.mjs";
import { naechsteVersion } from "../werkzeug/stand.mjs";
import { gruppeFuer } from "../werkzeug/notizen.mjs";
import { fertigmachen } from "../werkzeug/fertigmachen.mjs";

test("feste IDs: gleich bei gleichem Namen, 16 Zeichen, nur Buchstaben und Ziffern", () => {
  assert.equal(festeId("actor", "Kreischer"), festeId("actor", "Kreischer"));
  assert.notEqual(festeId("actor", "Kreischer"), festeId("actor", "Kreischer — Tier 2"));
  assert.match(festeId("actor", "Grubenbär"), /^[A-Za-z0-9]{16}$/);
});

test("Versionen zählen hoch", () => {
  assert.equal(naechsteVersion(null), "1.0");
  assert.equal(naechsteVersion("1.0"), "1.1");
  assert.equal(naechsteVersion("1.9"), "1.10");
});

test("Gruppe: Notiz, Phase nach Gedankenstrich, Variante", () => {
  const notizen = [
    { name: "Grubenbär", gruppe: "Restlinge", hatStatblock: true },
    { name: "Nachrufer", gruppe: "Restlinge", hatStatblock: true },
    { name: "Chimären", gruppe: "Chimären", hatStatblock: false }
  ];
  const varianten = [{ name: "Dreiklaue", basis: "Grubenbär" }];
  assert.equal(gruppeFuer("Grubenbär", notizen, varianten), "Restlinge");
  assert.equal(gruppeFuer("Nachrufer — Sirene", notizen, varianten), "Restlinge");
  assert.equal(gruppeFuer("Dreiklaue", notizen, varianten), "Restlinge");
  assert.equal(gruppeFuer("Chimären", notizen, varianten), null);
});

test("Horde bekommt den Effekt des Systems, Text bleibt", () => {
  const actor = {
    name: "X", type: "adversary",
    system: { type: "horde", typeData: { type: "horde", hordeHP: 2, hordeDamage: "1d4+2" }, experiences: {}, attack: { _id: "alt" } },
    items: [{ name: "Horde (1d4+2)", type: "feature", system: { description: "<p>Text</p>" }, effects: [] }]
  };
  const { actor: a } = fertigmachen(actor, { name: "Testrudel", ordnerId: "o".repeat(16) });
  const horde = a.items[0];
  assert.equal(horde.flags.daggerheart.hordeFeature, true);
  assert.equal(horde.effects.length, 1);
  assert.equal(horde.system.description, "<p>Text</p>");
  assert.equal(a._key, `!actors!${a._id}`);
  assert.equal(horde._key, `!actors.items!${a._id}.${horde._id}`);
  assert.equal(actor.items[0].effects.length, 0, "Original bleibt unverändert");
});
