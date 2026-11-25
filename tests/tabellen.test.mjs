import { test } from "node:test";
import assert from "node:assert/strict";
import { findeStatblocks } from "../werkzeug/aus-notizen.mjs";
import { tabelleLesen, titel, tabellenVerlinken } from "../werkzeug/tabellen.mjs";

const NOTIZ = `Text davor.

> [!statblock] JUNKARENA
> ***Tier 1 Event***
> [!rolltable] WHAT THE CROWD THROWS
> *Each tick of Cheers, something comes through the bars.*
>
> | d6 | Result |
> |---|---|
> | 1 | Half a Pressling |
> | 2–3 | A pipe, good for **hitting** things |
> | 4 | A [[NeuroStim (DH)\\|NeuroStim]] |
> | 5-6 | A bottle | It shatters on impact. |

Text danach.`;

test("Callouts: Roll Table wird gefunden, auch direkt nach einem Stat Block", () => {
  const bloecke = findeStatblocks(NOTIZ, "rolltable");
  assert.equal(bloecke.length, 1);
  assert.equal(findeStatblocks(NOTIZ, "statblock")[0].zeilen.length, 1, "Stat Block endet vor der Tabelle");
});

test("Tabelle lesen: Würfel, Bereiche, Links, dritte Spalte", () => {
  const t = tabelleLesen(findeStatblocks(NOTIZ, "rolltable")[0]);
  assert.equal(t.name, "What the Crowd Throws");
  assert.equal(t.formel, "1d6");
  assert.equal(t.beschreibung, "<p>Each tick of Cheers, something comes through the bars.</p>");
  assert.deepEqual(t.ergebnisse.map(e => [e.von, e.bis]), [[1, 1], [2, 3], [4, 4], [5, 6]]);
  assert.equal(t.ergebnisse[1].name, "A pipe, good for hitting things");
  assert.equal(t.ergebnisse[2].name, "A NeuroStim");
  assert.equal(t.ergebnisse[3].beschreibung, "<p>It shatters on impact.</p>");
  assert.deepEqual(t.hinweise, []);
});

test("Lücken werden gemeldet", () => {
  const t = tabelleLesen(findeStatblocks("> [!rolltable] X\n> | d6 | R |\n> |---|---|\n> | 1 | a |\n> | 3 | b |", "rolltable")[0]);
  assert.match(t.hinweise[0], /Kein Ergebnis für 2, 4, 5, 6/);
});

test("Titel und Verlinken", () => {
  assert.equal(titel("WHAT THE CROWD THROWS"), "What the Crowd Throws");
  assert.equal(titel("Loot of the Deadbands"), "Loot of the Deadbands");
  const actors = [{ items: [{ system: { description: "<p>(roll on <em>What the Crowd Throws</em>)</p>" } }], system: { notes: "<strong>what the crowd throws</strong>" } }];
  const n = tabellenVerlinken(actors, [{ name: "What the Crowd Throws", _id: "abcdefghijklmnop" }], "motherboard-adversaries.rolltables");
  assert.equal(n, 2);
  assert.equal(actors[0].items[0].system.description,
    "<p>(roll on @UUID[Compendium.motherboard-adversaries.rolltables.RollTable.abcdefghijklmnop]{What the Crowd Throws})</p>");
});

test("Beispiele in Codeblöcken und %% Kommentaren zählen nicht", () => {
  const leitfaden = "So sieht es aus:\n\n```markdown\n> [!rolltable] EXAMPLE\n> | d6 | R |\n```\n\n%%\n> [!rolltable] HIDDEN\n> | d6 | R |\n%%\n\n> [!rolltable] REAL\n> | d4 | R |\n> |---|---|\n> | 1-4 | x |";
  const bloecke = findeStatblocks(leitfaden, "rolltable");
  assert.deepEqual(bloecke.map(b => b.kopf), ["REAL"]);
});

import { bildSchluessel, bildFuer } from "../werkzeug/bilder.mjs";

test("Bilder: Umlaute, Zusatz, Tier 2 erbt das Bild der Notiz", () => {
  assert.equal(bildSchluessel("Grubenbär"), "grubenbaer");
  assert.equal(bildSchluessel("Wächter"), "waechter");
  const bilder = { nachName: new Map([["grubenbaer", "MB_Restling_Grubenbaer.jpg"], ["dreiklaue", "MB_Restling_Dreiklaue.jpg"], ["syfterbulwark", "MB_Syfter_Bulwark.jpg"]]) };
  assert.equal(bildFuer(bilder, { name: "Grubenbär", schluessel: "Grubenbär", notizName: "Grubenbär" }), "MB_Restling_Grubenbaer.jpg");
  assert.equal(bildFuer(bilder, { name: "Grubenbär — Dreiklaue", schluessel: "Grubenbär — Dreiklaue", notizName: "Grubenbär" }), "MB_Restling_Dreiklaue.jpg");
  assert.equal(bildFuer(bilder, { name: "Syfter Bulwark — Tier 2", schluessel: "Syfter Bulwark — Tier 2", notizName: "Syfter Bulwark" }), "MB_Syfter_Bulwark.jpg");
  assert.equal(bildFuer(bilder, { name: "Screecher", schluessel: "Kreischer", notizName: "Kreischer" }), null);
});

import { tokenFuer } from "../werkzeug/bilder.mjs";

test("Tokens: deutscher oder englischer Name, Zweitname, kein Erben von Tier 1", () => {
  const tokens = { nachName: new Map([
    ["kreischer", { datei: "MB_Restling_Kreischer_Token.png" }],
    ["threeclaw", { datei: "MB_Restling_Three-Claw_Token.png" }],
    ["syfterbulwark", { datei: "MB_Syfter_Syfter-Bulwark_Token.png" }],
    ["dreiklaue", { datei: "MB_Restling_Dreiklaue_Token.png" }]
  ]) };
  assert.equal(tokenFuer(tokens, { name: "Screecher", schluessel: "Kreischer" }).datei, "MB_Restling_Kreischer_Token.png");
  assert.equal(tokenFuer(tokens, { name: "Devourer — Three-Claw", schluessel: "Grubenbär — Three-Claw" }).datei, "MB_Restling_Three-Claw_Token.png");
  tokens.nachName.delete("threeclaw");
  assert.equal(tokenFuer(tokens, { name: "Devourer — Three-Claw", schluessel: "Grubenbär — Three-Claw", alias: ["Dreiklaue"] }).datei, "MB_Restling_Dreiklaue_Token.png");
  assert.equal(tokenFuer(tokens, { name: "Syfter Bulwark — Tier 2", schluessel: "Syfter Bulwark — Tier 2", notizName: "Syfter Bulwark" }), null);
});
