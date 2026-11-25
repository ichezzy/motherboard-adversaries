# Token-Ringe: Prompts

*Stand 25.11.2026. Für dein Bildwerkzeug (ChatGPT, Midjourney …). Erzeugt mit einem Skript aus festen Bausteinen, damit alle 32 Ringe gleich aufgebaut sind.*

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
| **Chimeras (Chimären)** | ultraviolet magenta (around #FF00C8) | small magenta vial lights | Ultraviolett-Magenta nach Labor und Experiment; Chrom und Kabelsehnen, Nähte, Probengläser — die Versuchstiere der CTC. |
| **Salvants (VSG)** | signal yellow (around #FFD400) and black | small yellow chevrons | Signalgelb mit Schwarz wie Absperrung und Miliz; Schablonenschrift-Flächen, Panzerplatten, Scheinwerfer — die käufliche Ordnungsmacht. |
| **Syfter** | cobalt blue (around #2F6BFF) and polished brass | small brass-and-cobalt compass ticks | Kobaltblau mit poliertem Messing; Kompassring mit Gradstrichen, Radar-Bogen — Messgerät und Navigation wie die MAVIS, für die, die regelmäßig rausgehen. |
| **Normale NPCs** | bone white (around #F2EEE4) and bright steel silver, crisp and clean | small bone-white rivets | Knochenweiß und Stahl — sauber und klar, aber zurückhaltend, damit die Fraktionen herausstechen. |

## So gehst du vor

1. **Zuerst die acht Grundformen (Tier 1)** erzeugen — eine pro Kategorie. Gib dabei das Referenzbild `MB_Gutter_Baseballschlaeger_ActionSplash_3x4.jpg` als Stilvorlage mit, wenn dein Werkzeug das kann.
2. **Dann Tier 2 bis 4 jeweils aus der Grundform:** das Tier-1-Bild als Vorlage hochladen und den Prompt des höheren Tiers nehmen. Dann bleibt der Ring derselbe und wird nur wuchtiger.
3. **Format:** quadratisch, 1024 × 1024.
4. **Hintergrund und Mitte** dürfen weiß bleiben. Das Modul schneidet beim Bauen alles außerhalb des Kreises und die runde Mitte selbst aus — wichtig ist nur, dass der Ring **rund und mittig** ist und **nichts über den Kreis hinausragt**. Wenn dein Werkzeug transparente PNGs kann: umso besser.
5. **Ablegen** im Vault unter `_Anhänge/Artwork/Token/` mit diesem Namen:
   `MB_Ring_<Kategorie>_T<Tier>.png` — also `MB_Ring_Rustlings_T1.png`, `MB_Ring_Splitter_T4.png`, `MB_Ring_NPC_T2.png` …
   Kategorien: `Rustlings`, `Gutters`, `Rustdogs`, `Splitter`, `Chimeras`, `Salvants`, `Syfter`, `NPC`.
6. **Prüfen:** Stimmt die Zahl der Marker? Ragt nichts über den Kreis? Sonst neu erzeugen.


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

Faction: the Chimeras — lab-grown animal hybrids of chrome and living tissue, escaped from a corporate laboratory. Main color: ultraviolet magenta (around #FF00C8). Material: chrome plating fused with sinewy organic cables, stitched surgical seams, specimen tags, small glass vials with glowing magenta fluid set into the rim, claw scratches.

Tier 1, the base version: a single clean ring, matte finish, restrained ornament, a calm round silhouette. The main color appears only as one accent band and in the tier marker. Tier marker: exactly ONE small magenta vial light at the bottom of the ring.
```

### Tier 2 — verstärkt → `MB_Ring_Chimeras_T2.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Chimeras — lab-grown animal hybrids of chrome and living tissue, escaped from a corporate laboratory. Main color: ultraviolet magenta (around #FF00C8). Material: chrome plating fused with sinewy organic cables, stitched surgical seams, specimen tags, small glass vials with glowing magenta fluid set into the rim, claw scratches.

Tier 2, escalated: a double ring with a second, thinner band, the faction motif repeated at the four cardinal points, the main color now glowing softly from seams and inlays. Tier marker: exactly TWO small magenta vial lights side by side at the bottom of the ring.
```

### Tier 3 — gefährlich → `MB_Ring_Chimeras_T3.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Chimeras — lab-grown animal hybrids of chrome and living tissue, escaped from a corporate laboratory. Main color: ultraviolet magenta (around #FF00C8). Material: chrome plating fused with sinewy organic cables, stitched surgical seams, specimen tags, small glass vials with glowing magenta fluid set into the rim, claw scratches.

Tier 3, dangerous: a heavy, layered ring with eight motif elements around the rim, cracks and seams glowing brightly in the main color, small sparks or particles, stronger contrast. Tier marker: exactly THREE small magenta vial lights side by side at the bottom of the ring.
```

### Tier 4 — legendär → `MB_Ring_Chimeras_T4.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Chimeras — lab-grown animal hybrids of chrome and living tissue, escaped from a corporate laboratory. Main color: ultraviolet magenta (around #FF00C8). Material: chrome plating fused with sinewy organic cables, stitched surgical seams, specimen tags, small glass vials with glowing magenta fluid set into the rim, claw scratches.

Tier 4, legendary: the most elaborate version — an aggressive, jagged silhouette with spikes and flares (still inside the circle), an outer halo of intense light in the main color, energy arcs, ornate detail everywhere; the main color dominates. Tier marker: exactly FOUR small magenta vial lights side by side at the bottom of the ring.
```


---

## Salvants (VSG)

### Tier 1 — Grundform → `MB_Ring_Salvants_T1.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Salvants — the city's paid militia, officially protectors, in truth for hire. Main colors: signal yellow (around #FFD400) and black. Material: bolted armor segments with stencil-painted panels (no readable letters), black-and-yellow chevron stripes, the rim of a riot shield, a small mounted spotlight lamp, scuffed but well maintained.

Tier 1, the base version: a single clean ring, matte finish, restrained ornament, a calm round silhouette. The main color appears only as one accent band and in the tier marker. Tier marker: exactly ONE small yellow chevron at the bottom of the ring.
```

### Tier 2 — verstärkt → `MB_Ring_Salvants_T2.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Salvants — the city's paid militia, officially protectors, in truth for hire. Main colors: signal yellow (around #FFD400) and black. Material: bolted armor segments with stencil-painted panels (no readable letters), black-and-yellow chevron stripes, the rim of a riot shield, a small mounted spotlight lamp, scuffed but well maintained.

Tier 2, escalated: a double ring with a second, thinner band, the faction motif repeated at the four cardinal points, the main color now glowing softly from seams and inlays. Tier marker: exactly TWO small yellow chevrons side by side at the bottom of the ring.
```

### Tier 3 — gefährlich → `MB_Ring_Salvants_T3.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Salvants — the city's paid militia, officially protectors, in truth for hire. Main colors: signal yellow (around #FFD400) and black. Material: bolted armor segments with stencil-painted panels (no readable letters), black-and-yellow chevron stripes, the rim of a riot shield, a small mounted spotlight lamp, scuffed but well maintained.

Tier 3, dangerous: a heavy, layered ring with eight motif elements around the rim, cracks and seams glowing brightly in the main color, small sparks or particles, stronger contrast. Tier marker: exactly THREE small yellow chevrons side by side at the bottom of the ring.
```

### Tier 4 — legendär → `MB_Ring_Salvants_T4.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Salvants — the city's paid militia, officially protectors, in truth for hire. Main colors: signal yellow (around #FFD400) and black. Material: bolted armor segments with stencil-painted panels (no readable letters), black-and-yellow chevron stripes, the rim of a riot shield, a small mounted spotlight lamp, scuffed but well maintained.

Tier 4, legendary: the most elaborate version — an aggressive, jagged silhouette with spikes and flares (still inside the circle), an outer halo of intense light in the main color, energy arcs, ornate detail everywhere; the main color dominates. Tier marker: exactly FOUR small yellow chevrons side by side at the bottom of the ring.
```


---

## Syfter

### Tier 1 — Grundform → `MB_Ring_Syfter_T1.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Syfter — scrap hunters who venture into the wasteland outside the city, half explorers, half salvagers. Main colors: cobalt blue (around #2F6BFF) and polished brass. Material: a brass navigation instrument — compass bezel with degree ticks, nested rotating rings like a sextant, a sweeping radar arc in cobalt light, cable clamps and field-worn leather wraps.

Tier 1, the base version: a single clean ring, matte finish, restrained ornament, a calm round silhouette. The main color appears only as one accent band and in the tier marker. Tier marker: exactly ONE small brass-and-cobalt compass tick at the bottom of the ring.
```

### Tier 2 — verstärkt → `MB_Ring_Syfter_T2.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Syfter — scrap hunters who venture into the wasteland outside the city, half explorers, half salvagers. Main colors: cobalt blue (around #2F6BFF) and polished brass. Material: a brass navigation instrument — compass bezel with degree ticks, nested rotating rings like a sextant, a sweeping radar arc in cobalt light, cable clamps and field-worn leather wraps.

Tier 2, escalated: a double ring with a second, thinner band, the faction motif repeated at the four cardinal points, the main color now glowing softly from seams and inlays. Tier marker: exactly TWO small brass-and-cobalt compass ticks side by side at the bottom of the ring.
```

### Tier 3 — gefährlich → `MB_Ring_Syfter_T3.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Syfter — scrap hunters who venture into the wasteland outside the city, half explorers, half salvagers. Main colors: cobalt blue (around #2F6BFF) and polished brass. Material: a brass navigation instrument — compass bezel with degree ticks, nested rotating rings like a sextant, a sweeping radar arc in cobalt light, cable clamps and field-worn leather wraps.

Tier 3, dangerous: a heavy, layered ring with eight motif elements around the rim, cracks and seams glowing brightly in the main color, small sparks or particles, stronger contrast. Tier marker: exactly THREE small brass-and-cobalt compass ticks side by side at the bottom of the ring.
```

### Tier 4 — legendär → `MB_Ring_Syfter_T4.png`

```text
Circular token frame (token ring) for a tabletop RPG on a virtual tabletop, seen straight from above, perfectly centered and perfectly round. The whole frame, including every spike, flare and hanging part, fits inside one perfect circle that touches the edges of the square canvas. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines of varying weight, flat cel-shaded color blocks with hard-edged shadows, scratchy hand-inked hatching, dry-brush grunge texture, visible grain. The colors must pop: one loud, saturated main color against black ink and dark metal, clearly readable on both dark and light battle maps. The center of the ring is completely empty — a clean, perfectly round hole that takes up the inner 70 percent of the diameter, filled with flat pure white, with no figure, no portrait, no pattern and no shading inside it. Plain flat pure white background outside the ring. No text, no letters, no readable numbers, no logos, no watermark, no signature.

Faction: the Syfter — scrap hunters who venture into the wasteland outside the city, half explorers, half salvagers. Main colors: cobalt blue (around #2F6BFF) and polished brass. Material: a brass navigation instrument — compass bezel with degree ticks, nested rotating rings like a sextant, a sweeping radar arc in cobalt light, cable clamps and field-worn leather wraps.

Tier 4, legendary: the most elaborate version — an aggressive, jagged silhouette with spikes and flares (still inside the circle), an outer halo of intense light in the main color, energy arcs, ornate detail everywhere; the main color dominates. Tier marker: exactly FOUR small brass-and-cobalt compass ticks side by side at the bottom of the ring.
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

## Zusatz: Porträt für ein eigenes Token-Bild (optional)

Das Modul schneidet das Porträt für den Token normalerweise aus dem Splash-Bild aus. Wo der Ausschnitt nicht passt, kannst du ein eigenes Porträt erzeugen und als `MB_<Gruppe>_<Name>_Token.png` neben das Splash-Bild legen. Prompt (`{…}` ersetzen):

```text
Token portrait for a tabletop RPG: {WHO, e.g. a ragged signal drone with whining rotors and a cracked lens eye}, head and upper body only, facing the viewer, centered, filling a circle in the middle of a square canvas with a little space around it. Gritty scrappunk illustration style — Gachiakuta manga inking fused with Borderlands cel-shading: bold black ink outlines, flat cel-shaded colors with hard shadows, scratchy hatching, dry-brush grunge texture. Muted dusty palette — sand beige, bone white, rust brown, oxidized iron grey — with one small accent in {MAIN COLOR OF THE FACTION}. Plain flat background. No frame, no ring, no text, no logos, no watermark.
```
