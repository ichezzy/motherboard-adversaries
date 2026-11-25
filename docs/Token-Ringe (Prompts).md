# Token-Ringe: Prompts

*Stand 25.11.2026 (Vanguard, Chimeras und Syfter überarbeitet). Für dein Bildwerkzeug (ChatGPT, Midjourney …). Erzeugt mit einem Skript aus festen Bausteinen, damit alle 32 Ringe gleich aufgebaut sind.*

## Das System

**Farbe = Fraktion, Wucht = Tier.** Jede Kategorie hat eine eigene, leuchtende Hauptfarbe und eigene Motive. Das Tier liest man an zwei Dingen, die bei allen Fraktionen gleich funktionieren:

| Tier | Was sich ändert | Marker unten am Ring |
|---|---|---|
| **1 — Grundform** | ein schlichter Ring, matt, Farbe nur als Akzent | 1 |
| **2 — verstärkt** | Doppelring, Motive an vier Stellen, Farbe glimmt | 2 |
| **3 — gefährlich** | schwer und vielschichtig, acht Motive, Risse leuchten, Funken | 3 |
| **4 — legendär** | zackige Silhouette, Halo aus Licht, Energiebögen, Farbe dominiert | 4 |

So sehen Spieler auf einen Blick, wie stark ein Gegner ist — ohne Zahlen auf der Karte. Beim Splitter Syndicate sind die Marker **Dornen** — im Syndikat der Rang, und den gibt es nur bis drei. Deshalb hat Tier 4 dort **drei Dornen und oben die rostrote Blüte** des Kopfes.

| Kategorie | Hauptfarbe | Marker | Warum |
|---|---|---|---|
| **Rustlings (Restlinge)** | electric cyan (around #00E5FF), glowing like corrupted signal static with faint scanline flicker | small cyan signal pips | Elektrisches Cyan nach dem Blaurausch (Blue Static); Material der Anthanen, an dem kein Staub haftet; Cordex-artige Zeichen und Antennen. |
| **Gutters** | acid lime green (around #B6FF00) used as fresh spray paint with drips | small lime spray-paint dots | Säuregrün wie die Sprühfarbe im Artwork-Stil; Schrott, Ketten, Warnband — Plünderer. |
| **Rustdogs (Rosthunde)** | hot signal orange (around #FF6A00), bright like a road flare | small orange dog tags | Signalorange wie eine Leuchtfackel; Hundemarken aus Schrott, eingeritzte Striche, der Bissabdruck als Zeichen. |
| **Splitter Syndicate** | deep crimson red (around #E0002A) and glossy black | sharp black thorns with crimson tips | Karmesinrot und glänzendes Schwarz der schwarzen Rose. Die Dornen sind im Syndikat der Rang — deshalb zeigen hier Dornen das Tier, und ab Tier 4 trägt der Ring die Blüte in rostigem Rot-Orange wie der Kopf des Syndikats. |
| **Chimeras (Chimären)** | ultraviolet magenta (around #FF00C8), glowing as bioluminescent veins under thin skin and along the seams | glowing magenta claw slashes | Magenta als leuchtende Adern unter der Haut statt in Phiolen; Chrom, das mit Sehnen, Knochen und Fell verwachsen ist, saubere OP-Nähte, Krallenspuren — mehr Raubtier als Labor. Einziger Hinweis auf die Herkunft: eine kleine Ohrmarke. Marker: leuchtende Krallenspuren — und **nur** dort, damit niemand Schmuck-Krallen oben als Tier liest; oben sitzt ein Raubtierauge. (Überarbeitet 25.11.2026: keine Phiolen, keine DNA.) |
| **Salvants (Vanguard Salvation Group)** | tarnished gold (around #C9A227) and glossy black lacquer, with cold white glints like a searchlight | small gold rank stars | Schwarzer Lack und mattes, angelaufenes Gold: Paradepanzer und Orden einer Befreiungsarmee, die heute für Geld Ordnung hält. Oben das Zeichen der alten Befreiung, dazu Torgitter und ein Überwachungsauge — Macht und Kontrolle statt Baustelle. Marker: goldene Rangsterne. Keine Warnstreifen, keine Lampen. (Überarbeitet 25.11.2026. Das Zeichen — aufgehende Sonne hinter Stadttürmen im Lorbeerkranz — hat das Bildwerkzeug erfunden; es steht jetzt im Prompt, damit neue Ringe dazu passen. Das Logo der VSG ist im Kanon noch offen.) |
| **Syfter** | cobalt blue (around #2F6BFF) and bright brushed steel | small cobalt compass ticks | Kobaltblau mit hellem Stahl; Kompassring mit Gradstrichen, Radar-Bogen — Messgerät und Navigation wie die MAVIS, für die, die regelmäßig rausgehen. (Stahl statt Messing, damit sich Syfter und Vanguard-Gold nicht ähneln.) |
| **Normale NPCs** | bone white (around #F2EEE4) and bright steel silver, crisp and clean | small bone-white rivets | Knochenweiß und Stahl — sauber und klar, aber zurückhaltend, damit die Fraktionen herausstechen. |

## So gehst du vor

1. **Zuerst die acht Grundformen (Tier 1)** erzeugen — eine pro Kategorie. Gib dabei das Referenzbild `MB_Gutter_Baseballschlaeger_ActionSplash_3x4.jpg` als Stilvorlage mit, wenn dein Werkzeug das kann.
2. **Dann Tier 2 bis 4 jeweils aus der Grundform:** das Tier-1-Bild als Vorlage hochladen und den Prompt des höheren Tiers nehmen. Dann bleibt der Ring derselbe und wird nur wuchtiger.
3. **Format:** quadratisch, 1024 × 1024.
4. **Durchsichtig machen:** Für dein Token-Werkzeug muss die **Mitte** des Rings durchsichtig sein (und am besten auch der Rand außen). Kann dein Bildwerkzeug kein transparentes PNG, nimm einen Hintergrund-Entferner und lösch die weiße Mitte und den weißen Rand.
5. **Ringe aufheben** im Vault unter `_Anhänge/Artwork/Token/Ringe/` als `MB_Ring_<Kategorie>_T<Tier>.png` — also `MB_Ring_Rustlings_T1.png`, `MB_Ring_Splitter_T4.png`, `MB_Ring_NPC_T2.png` … Kategorien: `Rustlings`, `Gutters`, `Rustdogs`, `Splitter`, `Chimeras`, `Salvants`, `Syfter`, `NPC`. (Das Modul benutzt die Ringe nicht selbst — sie sind dein Rohmaterial.)
6. **Prüfen:** Stimmt die Zahl der Marker? Ragt nichts über den Kreis? Sonst neu erzeugen.

## Vom Ring zum fertigen Token

1. Im Token-Werkzeug deiner Wahl (eine Website wie ein „Token Stamp“, ein Bildprogramm …) das Porträt des Gegners mit dem passenden Ring zusammensetzen: **Kategorie** nach seiner Gruppe, **Tier** nach seinem Stat Block.
2. Als **PNG oder WebP mit durchsichtigem Hintergrund** speichern, quadratisch (512 × 512 reicht).
3. Ablegen im Vault unter `_Anhänge/Artwork/Token/` als **`MB_<Gruppe>_<Name>_Token.png`** — der Name wie in Foundry, Umlaute als ae/oe/ue/ss: `MB_Restling_Screecher_Token.png`, `MB_Gutter_Gutter-Slugger_Token.png`, `MB_Syfter_Syfter-Bulwark-Tier-2_Token.png`. Der deutsche Name geht auch (`MB_Restling_Kreischer_Token.png`).
4. **„Gegner bauen“** doppelklicken: Die Zusammenfassung zeigt „Tokens: … von …“. Passt eine Datei zu keinem Gegner, steht sie unter den Hinweisen.
5. **Veröffentlichen.** Die Tokens liegen dann **im Modul selbst** — sie funktionieren in jeder Welt und bei jedem, der das Modul frisch installiert.

Tier-2-Fassungen (`… — Tier 2`) brauchen ein **eigenes** Token mit dem Tier-2-Ring; sie erben absichtlich nicht das Token von Tier 1.


---

## Rustlings (Restlinge)

### Tier 1 — Grundform → `MB_Ring_Rustlings_T1.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Rustlings — ancient machines of a vanished civilization, infected by a signal plague called Blue Static. Main color: electric cyan (around #00E5FF), glowing like corrupted signal static with faint scanline flicker. Material: smooth, ancient, otherworldly alloy in pale gunmetal that dust does not cling to, engraved with fine circuit traces and angular glyphs of an unknown machine script, with thin antenna-like prongs along the rim.

Tier 1, the base version: a single clean ring, matte finish, restrained ornament, a calm round silhouette. The main color appears only as one accent band and in the tier marker. Tier marker: exactly ONE small cyan signal pip at the bottom of the ring.
```

### Tier 2 — verstärkt → `MB_Ring_Rustlings_T2.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Rustlings — ancient machines of a vanished civilization, infected by a signal plague called Blue Static. Main color: electric cyan (around #00E5FF), glowing like corrupted signal static with faint scanline flicker. Material: smooth, ancient, otherworldly alloy in pale gunmetal that dust does not cling to, engraved with fine circuit traces and angular glyphs of an unknown machine script, with thin antenna-like prongs along the rim.

Tier 2, escalated: a double ring with a second, thinner band, the faction motif repeated at the four cardinal points, the main color now glowing softly from seams and inlays. Tier marker: exactly TWO small cyan signal pips side by side at the bottom of the ring.
```

### Tier 3 — gefährlich → `MB_Ring_Rustlings_T3.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Rustlings — ancient machines of a vanished civilization, infected by a signal plague called Blue Static. Main color: electric cyan (around #00E5FF), glowing like corrupted signal static with faint scanline flicker. Material: smooth, ancient, otherworldly alloy in pale gunmetal that dust does not cling to, engraved with fine circuit traces and angular glyphs of an unknown machine script, with thin antenna-like prongs along the rim.

Tier 3, dangerous: a heavy, layered ring with eight motif elements around the rim, cracks and seams glowing brightly in the main color, small sparks or particles, stronger contrast. Tier marker: exactly THREE small cyan signal pips side by side at the bottom of the ring.
```

### Tier 4 — legendär → `MB_Ring_Rustlings_T4.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Rustlings — ancient machines of a vanished civilization, infected by a signal plague called Blue Static. Main color: electric cyan (around #00E5FF), glowing like corrupted signal static with faint scanline flicker. Material: smooth, ancient, otherworldly alloy in pale gunmetal that dust does not cling to, engraved with fine circuit traces and angular glyphs of an unknown machine script, with thin antenna-like prongs along the rim.

Tier 4, legendary: the most elaborate version — an aggressive, jagged silhouette with spikes and flares (still inside the circle), an outer halo of intense light in the main color, energy arcs, ornate detail everywhere; the main color dominates. Tier marker: exactly FOUR small cyan signal pips side by side at the bottom of the ring.
```


---

## Gutters

### Tier 1 — Grundform → `MB_Ring_Gutters_T1.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Gutters — illegal scavengers, raiders and kidnappers. Main color: acid lime green (around #B6FF00) used as fresh spray paint with drips. Material: crudely welded scrap metal and rebar, chain links, black-and-lime hazard tape wrapped around the ring, bent nails, bottle caps, spray-paint tag shapes without readable letters.

Tier 1, the base version: a single clean ring, matte finish, restrained ornament, a calm round silhouette. The main color appears only as one accent band and in the tier marker. Tier marker: exactly ONE small lime spray-paint dot at the bottom of the ring.
```

### Tier 2 — verstärkt → `MB_Ring_Gutters_T2.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Gutters — illegal scavengers, raiders and kidnappers. Main color: acid lime green (around #B6FF00) used as fresh spray paint with drips. Material: crudely welded scrap metal and rebar, chain links, black-and-lime hazard tape wrapped around the ring, bent nails, bottle caps, spray-paint tag shapes without readable letters.

Tier 2, escalated: a double ring with a second, thinner band, the faction motif repeated at the four cardinal points, the main color now glowing softly from seams and inlays. Tier marker: exactly TWO small lime spray-paint dots side by side at the bottom of the ring.
```

### Tier 3 — gefährlich → `MB_Ring_Gutters_T3.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Gutters — illegal scavengers, raiders and kidnappers. Main color: acid lime green (around #B6FF00) used as fresh spray paint with drips. Material: crudely welded scrap metal and rebar, chain links, black-and-lime hazard tape wrapped around the ring, bent nails, bottle caps, spray-paint tag shapes without readable letters.

Tier 3, dangerous: a heavy, layered ring with eight motif elements around the rim, cracks and seams glowing brightly in the main color, small sparks or particles, stronger contrast. Tier marker: exactly THREE small lime spray-paint dots side by side at the bottom of the ring.
```

### Tier 4 — legendär → `MB_Ring_Gutters_T4.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Gutters — illegal scavengers, raiders and kidnappers. Main color: acid lime green (around #B6FF00) used as fresh spray paint with drips. Material: crudely welded scrap metal and rebar, chain links, black-and-lime hazard tape wrapped around the ring, bent nails, bottle caps, spray-paint tag shapes without readable letters.

Tier 4, legendary: the most elaborate version — an aggressive, jagged silhouette with spikes and flares (still inside the circle), an outer halo of intense light in the main color, energy arcs, ornate detail everywhere; the main color dominates. Tier marker: exactly FOUR small lime spray-paint dots side by side at the bottom of the ring.
```


---

## Rustdogs (Rosthunde)

### Tier 1 — Grundform → `MB_Ring_Rustdogs_T1.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Rustdogs — a street gang that is a family; the pack never forgets. Main color: hot signal orange (around #FF6A00), bright like a road flare. Material: riveted scrap sheet metal covered in scratched tally marks, dog tags made of scrap hanging from a ball chain around the ring, and a bite mark torn out of the rim at the top as their sign.

Tier 1, the base version: a single clean ring, matte finish, restrained ornament, a calm round silhouette. The main color appears only as one accent band and in the tier marker. Tier marker: exactly ONE small orange dog tag at the bottom of the ring.
```

### Tier 2 — verstärkt → `MB_Ring_Rustdogs_T2.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Rustdogs — a street gang that is a family; the pack never forgets. Main color: hot signal orange (around #FF6A00), bright like a road flare. Material: riveted scrap sheet metal covered in scratched tally marks, dog tags made of scrap hanging from a ball chain around the ring, and a bite mark torn out of the rim at the top as their sign.

Tier 2, escalated: a double ring with a second, thinner band, the faction motif repeated at the four cardinal points, the main color now glowing softly from seams and inlays. Tier marker: exactly TWO small orange dog tags side by side at the bottom of the ring.
```

### Tier 3 — gefährlich → `MB_Ring_Rustdogs_T3.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Rustdogs — a street gang that is a family; the pack never forgets. Main color: hot signal orange (around #FF6A00), bright like a road flare. Material: riveted scrap sheet metal covered in scratched tally marks, dog tags made of scrap hanging from a ball chain around the ring, and a bite mark torn out of the rim at the top as their sign.

Tier 3, dangerous: a heavy, layered ring with eight motif elements around the rim, cracks and seams glowing brightly in the main color, small sparks or particles, stronger contrast. Tier marker: exactly THREE small orange dog tags side by side at the bottom of the ring.
```

### Tier 4 — legendär → `MB_Ring_Rustdogs_T4.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Rustdogs — a street gang that is a family; the pack never forgets. Main color: hot signal orange (around #FF6A00), bright like a road flare. Material: riveted scrap sheet metal covered in scratched tally marks, dog tags made of scrap hanging from a ball chain around the ring, and a bite mark torn out of the rim at the top as their sign.

Tier 4, legendary: the most elaborate version — an aggressive, jagged silhouette with spikes and flares (still inside the circle), an outer halo of intense light in the main color, energy arcs, ornate detail everywhere; the main color dominates. Tier marker: exactly FOUR small orange dog tags side by side at the bottom of the ring.
```


---

## Splitter Syndicate

### Tier 1 — Grundform → `MB_Ring_Splitter_T1.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Splitter Syndicate — an organized crime syndicate whose sign is a black rose. Main colors: deep crimson red (around #E0002A) and glossy black. Material: polished black metal wrapped in thorny black rose vines, crimson enamel inlays, sprayed black-rose graffiti silhouettes on the rim.

Tier 1, the base version: a single clean ring, matte finish, restrained ornament, a calm round silhouette. The main color appears only as one accent band and in the tier marker. Tier marker: exactly ONE sharp black thorn with a crimson tip at the bottom of the ring.
```

### Tier 2 — verstärkt → `MB_Ring_Splitter_T2.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Splitter Syndicate — an organized crime syndicate whose sign is a black rose. Main colors: deep crimson red (around #E0002A) and glossy black. Material: polished black metal wrapped in thorny black rose vines, crimson enamel inlays, sprayed black-rose graffiti silhouettes on the rim.

Tier 2, escalated: a double ring with a second, thinner band, the faction motif repeated at the four cardinal points, the main color now glowing softly from seams and inlays. Tier marker: exactly TWO sharp black thorns with crimson tips side by side at the bottom of the ring.
```

### Tier 3 — gefährlich → `MB_Ring_Splitter_T3.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Splitter Syndicate — an organized crime syndicate whose sign is a black rose. Main colors: deep crimson red (around #E0002A) and glossy black. Material: polished black metal wrapped in thorny black rose vines, crimson enamel inlays, sprayed black-rose graffiti silhouettes on the rim.

Tier 3, dangerous: a heavy, layered ring with eight motif elements around the rim, cracks and seams glowing brightly in the main color, small sparks or particles, stronger contrast. Tier marker: exactly THREE sharp black thorns with crimson tips side by side at the bottom of the ring.
```

### Tier 4 — legendär → `MB_Ring_Splitter_T4.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Splitter Syndicate — an organized crime syndicate whose sign is a black rose. Main colors: deep crimson red (around #E0002A) and glossy black. Material: polished black metal wrapped in thorny black rose vines, crimson enamel inlays, sprayed black-rose graffiti silhouettes on the rim.

Tier 4, legendary: the most elaborate version — an aggressive, jagged silhouette with spikes and flares (still inside the circle), an outer halo of intense light in the main color, energy arcs, ornate detail everywhere; the main color dominates. Tier marker: exactly THREE sharp black thorns with crimson tips side by side at the bottom of the ring — the highest rank.

Add one black rose in full bloom at the top of the ring, its petals glowing in rusty red-orange — the mark of the syndicate's head.
```


---

## Chimeras (Chimären)

### Tier 1 — Grundform → `MB_Ring_Chimeras_T1.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Chimeras — escaped experiments, animals rebuilt from chrome and living tissue; more beast than machine. Main color: ultraviolet magenta (around #FF00C8), glowing as bioluminescent veins under thin skin and along the seams. Material: grafted chrome plates fused with sinew, bone ridges and patches of coarse fur, neat surgical stitches, curved fangs along the rim, and one small riveted ear tag as the only hint of where they came from. At the top of the ring, a fused bone-and-chrome plate with a small predator eye with a slit pupil. Claw marks appear ONLY in the tier marker at the bottom, nowhere else on the ring. Organic, predatory, subtle. No vials, no test tubes, no syringes, no DNA symbols, no laboratory glassware.

Tier 1, the base version: a single clean ring, matte finish, restrained ornament, a calm round silhouette. The main color appears only as one accent band and in the tier marker. Tier marker: exactly ONE glowing magenta claw slash at the bottom of the ring.
```

### Tier 2 — verstärkt → `MB_Ring_Chimeras_T2.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Chimeras — escaped experiments, animals rebuilt from chrome and living tissue; more beast than machine. Main color: ultraviolet magenta (around #FF00C8), glowing as bioluminescent veins under thin skin and along the seams. Material: grafted chrome plates fused with sinew, bone ridges and patches of coarse fur, neat surgical stitches, curved fangs along the rim, and one small riveted ear tag as the only hint of where they came from. At the top of the ring, a fused bone-and-chrome plate with a small predator eye with a slit pupil. Claw marks appear ONLY in the tier marker at the bottom, nowhere else on the ring. Organic, predatory, subtle. No vials, no test tubes, no syringes, no DNA symbols, no laboratory glassware.

Tier 2, escalated: a double ring with a second, thinner band, the faction motif repeated at the four cardinal points, the main color now glowing softly from seams and inlays. Tier marker: exactly TWO glowing magenta claw slashes side by side at the bottom of the ring.
```

### Tier 3 — gefährlich → `MB_Ring_Chimeras_T3.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Chimeras — escaped experiments, animals rebuilt from chrome and living tissue; more beast than machine. Main color: ultraviolet magenta (around #FF00C8), glowing as bioluminescent veins under thin skin and along the seams. Material: grafted chrome plates fused with sinew, bone ridges and patches of coarse fur, neat surgical stitches, curved fangs along the rim, and one small riveted ear tag as the only hint of where they came from. At the top of the ring, a fused bone-and-chrome plate with a small predator eye with a slit pupil. Claw marks appear ONLY in the tier marker at the bottom, nowhere else on the ring. Organic, predatory, subtle. No vials, no test tubes, no syringes, no DNA symbols, no laboratory glassware.

Tier 3, dangerous: a heavy, layered ring with eight motif elements around the rim, cracks and seams glowing brightly in the main color, small sparks or particles, stronger contrast. Tier marker: exactly THREE glowing magenta claw slashes side by side at the bottom of the ring.
```

### Tier 4 — legendär → `MB_Ring_Chimeras_T4.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Chimeras — escaped experiments, animals rebuilt from chrome and living tissue; more beast than machine. Main color: ultraviolet magenta (around #FF00C8), glowing as bioluminescent veins under thin skin and along the seams. Material: grafted chrome plates fused with sinew, bone ridges and patches of coarse fur, neat surgical stitches, curved fangs along the rim, and one small riveted ear tag as the only hint of where they came from. At the top of the ring, a fused bone-and-chrome plate with a small predator eye with a slit pupil. Claw marks appear ONLY in the tier marker at the bottom, nowhere else on the ring. Organic, predatory, subtle. No vials, no test tubes, no syringes, no DNA symbols, no laboratory glassware.

Tier 4, legendary: the most elaborate version — an aggressive, jagged silhouette with spikes and flares (still inside the circle), an outer halo of intense light in the main color, energy arcs, ornate detail everywhere; the main color dominates. Tier marker: exactly FOUR glowing magenta claw slashes side by side at the bottom of the ring.
```


---

## Salvants (Vanguard Salvation Group)

### Tier 1 — Grundform → `MB_Ring_Salvants_T1.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Vanguard Salvation Group, called the Salvants — once the liberation army that freed the city, today a disciplined militia for hire that controls the gates and keeps order for whoever pays. Main colors: tarnished gold (around #C9A227) and glossy black lacquer, with cold white glints like a searchlight. Material: black armored plates in the style of parade armor and riot gear, polished but scratched; at the top a gold medallion with the emblem of the old liberation — a rising sun behind city towers inside a laurel wreath; segments shaped like gate bars; a small round surveillance lens; braided gold cord. Authoritative, controlled, a little hollow. No hazard stripes, no yellow-and-black warning patterns, no work lamps, no chevron stripes, no construction look.

Tier 1, the base version: a single clean ring, matte finish, restrained ornament, a calm round silhouette. The main color appears only as one accent band and in the tier marker. Tier marker: exactly ONE small gold rank star at the bottom of the ring.
```

### Tier 2 — verstärkt → `MB_Ring_Salvants_T2.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Vanguard Salvation Group, called the Salvants — once the liberation army that freed the city, today a disciplined militia for hire that controls the gates and keeps order for whoever pays. Main colors: tarnished gold (around #C9A227) and glossy black lacquer, with cold white glints like a searchlight. Material: black armored plates in the style of parade armor and riot gear, polished but scratched; at the top a gold medallion with the emblem of the old liberation — a rising sun behind city towers inside a laurel wreath; segments shaped like gate bars; a small round surveillance lens; braided gold cord. Authoritative, controlled, a little hollow. No hazard stripes, no yellow-and-black warning patterns, no work lamps, no chevron stripes, no construction look.

Tier 2, escalated: a double ring with a second, thinner band, the faction motif repeated at the four cardinal points, the main color now glowing softly from seams and inlays. Tier marker: exactly TWO small gold rank stars side by side at the bottom of the ring.
```

### Tier 3 — gefährlich → `MB_Ring_Salvants_T3.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Vanguard Salvation Group, called the Salvants — once the liberation army that freed the city, today a disciplined militia for hire that controls the gates and keeps order for whoever pays. Main colors: tarnished gold (around #C9A227) and glossy black lacquer, with cold white glints like a searchlight. Material: black armored plates in the style of parade armor and riot gear, polished but scratched; at the top a gold medallion with the emblem of the old liberation — a rising sun behind city towers inside a laurel wreath; segments shaped like gate bars; a small round surveillance lens; braided gold cord. Authoritative, controlled, a little hollow. No hazard stripes, no yellow-and-black warning patterns, no work lamps, no chevron stripes, no construction look.

Tier 3, dangerous: a heavy, layered ring with eight motif elements around the rim, cracks and seams glowing brightly in the main color, small sparks or particles, stronger contrast. Tier marker: exactly THREE small gold rank stars side by side at the bottom of the ring.
```

### Tier 4 — legendär → `MB_Ring_Salvants_T4.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Vanguard Salvation Group, called the Salvants — once the liberation army that freed the city, today a disciplined militia for hire that controls the gates and keeps order for whoever pays. Main colors: tarnished gold (around #C9A227) and glossy black lacquer, with cold white glints like a searchlight. Material: black armored plates in the style of parade armor and riot gear, polished but scratched; at the top a gold medallion with the emblem of the old liberation — a rising sun behind city towers inside a laurel wreath; segments shaped like gate bars; a small round surveillance lens; braided gold cord. Authoritative, controlled, a little hollow. No hazard stripes, no yellow-and-black warning patterns, no work lamps, no chevron stripes, no construction look.

Tier 4, legendary: the most elaborate version — an aggressive, jagged silhouette with spikes and flares (still inside the circle), an outer halo of intense light in the main color, energy arcs, ornate detail everywhere; the main color dominates. Tier marker: exactly FOUR small gold rank stars side by side at the bottom of the ring.
```


---

## Syfter

### Tier 1 — Grundform → `MB_Ring_Syfter_T1.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Syfter — scrap hunters who venture into the wasteland outside the city, half explorers, half salvagers. Main colors: cobalt blue (around #2F6BFF) and bright brushed steel. Material: a steel navigation instrument — compass bezel with degree ticks, nested rotating rings like a sextant, a sweeping radar arc in cobalt light, cable clamps and field-worn leather wraps.

Tier 1, the base version: a single clean ring, matte finish, restrained ornament, a calm round silhouette. The main color appears only as one accent band and in the tier marker. Tier marker: exactly ONE small cobalt compass tick at the bottom of the ring.
```

### Tier 2 — verstärkt → `MB_Ring_Syfter_T2.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Syfter — scrap hunters who venture into the wasteland outside the city, half explorers, half salvagers. Main colors: cobalt blue (around #2F6BFF) and bright brushed steel. Material: a steel navigation instrument — compass bezel with degree ticks, nested rotating rings like a sextant, a sweeping radar arc in cobalt light, cable clamps and field-worn leather wraps.

Tier 2, escalated: a double ring with a second, thinner band, the faction motif repeated at the four cardinal points, the main color now glowing softly from seams and inlays. Tier marker: exactly TWO small cobalt compass ticks side by side at the bottom of the ring.
```

### Tier 3 — gefährlich → `MB_Ring_Syfter_T3.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Syfter — scrap hunters who venture into the wasteland outside the city, half explorers, half salvagers. Main colors: cobalt blue (around #2F6BFF) and bright brushed steel. Material: a steel navigation instrument — compass bezel with degree ticks, nested rotating rings like a sextant, a sweeping radar arc in cobalt light, cable clamps and field-worn leather wraps.

Tier 3, dangerous: a heavy, layered ring with eight motif elements around the rim, cracks and seams glowing brightly in the main color, small sparks or particles, stronger contrast. Tier marker: exactly THREE small cobalt compass ticks side by side at the bottom of the ring.
```

### Tier 4 — legendär → `MB_Ring_Syfter_T4.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Syfter — scrap hunters who venture into the wasteland outside the city, half explorers, half salvagers. Main colors: cobalt blue (around #2F6BFF) and bright brushed steel. Material: a steel navigation instrument — compass bezel with degree ticks, nested rotating rings like a sextant, a sweeping radar arc in cobalt light, cable clamps and field-worn leather wraps.

Tier 4, legendary: the most elaborate version — an aggressive, jagged silhouette with spikes and flares (still inside the circle), an outer halo of intense light in the main color, energy arcs, ornate detail everywhere; the main color dominates. Tier marker: exactly FOUR small cobalt compass ticks side by side at the bottom of the ring.
```


---

## Normale NPCs

### Tier 1 — Grundform → `MB_Ring_NPC_T1.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Category: ordinary people of the city — not part of any faction. Main colors: bone white (around #F2EEE4) and bright steel silver, crisp and clean. Material: a simple machined steel band with bone-white enamel, a few rivets, a small identity chip set into the rim.

Tier 1, the base version: a single clean ring, matte finish, restrained ornament, a calm round silhouette. The main color appears only as one accent band and in the tier marker. Tier marker: exactly ONE small bone-white rivet at the bottom of the ring.
```

### Tier 2 — verstärkt → `MB_Ring_NPC_T2.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Category: ordinary people of the city — not part of any faction. Main colors: bone white (around #F2EEE4) and bright steel silver, crisp and clean. Material: a simple machined steel band with bone-white enamel, a few rivets, a small identity chip set into the rim.

Tier 2, escalated: a double ring with a second, thinner band, the faction motif repeated at the four cardinal points, the main color now glowing softly from seams and inlays. Tier marker: exactly TWO small bone-white rivets side by side at the bottom of the ring.
```

### Tier 3 — gefährlich → `MB_Ring_NPC_T3.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Category: ordinary people of the city — not part of any faction. Main colors: bone white (around #F2EEE4) and bright steel silver, crisp and clean. Material: a simple machined steel band with bone-white enamel, a few rivets, a small identity chip set into the rim.

Tier 3, dangerous: a heavy, layered ring with eight motif elements around the rim, cracks and seams glowing brightly in the main color, small sparks or particles, stronger contrast. Tier marker: exactly THREE small bone-white rivets side by side at the bottom of the ring.
```

### Tier 4 — legendär → `MB_Ring_NPC_T4.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Category: ordinary people of the city — not part of any faction. Main colors: bone white (around #F2EEE4) and bright steel silver, crisp and clean. Material: a simple machined steel band with bone-white enamel, a few rivets, a small identity chip set into the rim.

Tier 4, legendary: the most elaborate version — an aggressive, jagged silhouette with spikes and flares (still inside the circle), an outer halo of intense light in the main color, energy arcs, ornate detail everywhere; the main color dominates. Tier marker: exactly FOUR small bone-white rivets side by side at the bottom of the ring.
```


---

## Zusatz: Porträt für das Token (optional)

Wenn sich aus dem Splash-Bild kein guter Ausschnitt für das Token machen lässt, erzeug ein eigenes Porträt und setz es im Token-Werkzeug in den Ring. Prompt (`{…}` ersetzen):

```text
Token portrait for a tabletop RPG: {WHO, e.g. a ragged signal drone with whining rotors and a cracked lens eye}, head and upper body only, facing the viewer, centered, filling a circle in the middle of a square canvas with a little space around it. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines, flat cel-shaded colors with hard shadows, scratchy hatching, dry-brush grunge texture. Muted dusty palette — sand beige, bone white, rust brown, oxidized iron grey — with one small accent in {MAIN COLOR OF THE FACTION}. Plain flat background. No frame, no ring, no text, no logos, no watermark.
```
