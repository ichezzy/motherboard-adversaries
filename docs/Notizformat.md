# Notizformat für „Motherboard: Adversaries“

**Was das ist:** Der Vertrag zwischen den Obsidian-Notizen und dem Build. Alles, was hier steht, liest `Gegner bauen.bat` ohne Nacharbeit ins Foundry-Modul. Was davon abweicht, meldet der Build als „NICHT GELESEN“ — oder es bleibt nur Text.

**Für wen:** jeden Chat und jeden Agenten, der in `0_Daggerheart Mechaniken/` Stat Blocks oder Roll Tables schreibt oder überarbeitet.

**Grundregeln**
- Alles **innerhalb** eines Callouts ist **Englisch** (Foundry ist englisch). Eigennamen der Welt (Kreischer, Restlinge, Pressling …) bleiben, wie sie sind. Der Text **um** die Callouts herum bleibt Deutsch und landet nicht in Foundry.
- Ein Feld, ein Absatz, ein Feature: **eine Zeile**. Keine Zeilenumbrüche mitten im Satz.
- Werte und Texte stehen nur in der Notiz. Der Build rät nichts dazu und korrigiert nichts.
- Nach jeder Änderung: `Gegner bauen.bat` doppelklicken. Steht in der Zusammenfassung nichts unter „NICHT GELESEN oder FEHLERHAFT“, ist die Notiz in Ordnung.

---

## 1. Wo die Notizen liegen

| Was | Ort | Wird im Kompendium |
|---|---|---|
| Gegner | `0_Daggerheart Mechaniken/Adversary/<Gruppe>/<Name> (DH).md` | Ordner = Unterordner (Chimeras, Gutters …). Ein neuer Unterordner wird automatisch ein neuer Ordner. |
| Umgebungen | `0_Daggerheart Mechaniken/Environment/<Name> (DH).md` | Ordner „Environments“ |
| Roll Tables | in **jeder** Notiz unter `0_Daggerheart Mechaniken/` | Kompendium „Motherboard: Roll Tables“ |

- Der **Name in Foundry** ist die **Überschrift des Callouts**: `> [!statblock] SCREECHER` wird „Screecher“. So kann der Gegner in Foundry englisch heißen, während die Notiz deutsch bleibt (`Kreischer (DH).md`). Steht in der Überschrift nur der Notizname in Großbuchstaben, übernimmt der Build die Schreibweise der Notiz (mit ä, ö, ü, ß).
- Der **Dateiname** ist der feste Anker: Daraus entsteht die ID. Wer die Überschrift ändert, benennt den Gegner in Foundry um — er wird ersetzt, nicht verdoppelt, und die Zusammenfassung zeigt „umbenannt: Kreischer → Screecher“. Wer die **Datei** umbenennt, bekommt einen neuen Eintrag.
- Großbuchstaben in der Überschrift werden zu normaler Schreibung (*Wings of the Storm*, *Arena-Treiberin*). Wer eine besondere Schreibung braucht, schreibt die Überschrift gemischt: `> [!statblock] Three-Claw`.
- Notizen **ohne** `[!statblock]` (Übersichten wie *Gutter-Crews*) werden übersprungen.

## 2. Stat Block für Gegner

```markdown
> [!statblock] KREISCHER
> ***Tier 1 Support***
> *A ragged signal drone from the old masts, circling high on whining rotors.*
> **Motives & Tactics:** Circle out of reach, scream on familiar frequencies, call the pack
>
> > **Difficulty:** 12 | **Thresholds:** 4/8 | **HP:** 3 | **Stress:** 3
> > **ATK:** +1 | **Feedback Pulse:** Far | 1d6+2 mag
> >
> > ---
> > **Experience:** Frequencies +2, Keen Senses +3
>
> ### FEATURES
> ***Rotors - Passive:*** The Kreischer flies. A PC can only reach it in Melee range by climbing or flying.
>
> ***Feedback Howl - Action:*** **Mark a Stress**. All PCs within Close range of a point within Far range must succeed on an Instinct Reaction Roll (12) or lose a Hope.
```

| Zeile | Regel |
|---|---|
| Kopf | `> [!statblock] NAME` in Großbuchstaben — der englische Name, wie er in Foundry erscheinen soll. |
| Tier-Zeile | `***Tier <1–4> <Typ>***`. Typ: Bruiser, Horde, Leader, Minion, Ranged, Skulk, Social, Solo, Standard, Support. |
| Horde | `***Tier 1 Horde (2/HP)***` — und ein Feature `***Horde (1d4+2) - Passive:***`. Der Würfel in Klammern ist der Horden-Schaden ab halben HP; Foundry schaltet ihn automatisch um. |
| Minion | `**Thresholds:** None`, fester Schaden `2 phy`, Feature `***Minion (3) - Passive:***`. |
| Seite | Zusatz nach ` — ` in der Tier-Zeile: `— Verbündete` (Token freundlich), `— Neutral`, `— Feindlich`. Ohne Zusatz: feindlich (Ausnahmen pro Gruppe stehen in `einstellungen.json`, z. B. Syfter neutral). Andere Zusätze wie `— Phase 1: Die geliehene Stimme` werden ignoriert. |
| Beschreibung | **eine** kursive Zeile direkt unter der Tier-Zeile. |
| Motives & Tactics | Pflicht. |
| Werte | Genau diese vier, getrennt durch ` \| `: Difficulty, Thresholds (`4/8` oder `None`), HP, Stress. |
| Angriff | `**ATK:** +1 \| **<Name des Angriffs>:** <Reichweite> \| <Schaden>`. Reichweite: Melee, Very Close, Close, Far, Very Far. Schaden: `1d6+2 mag`, `2d10+4 phy`, fest `2 phy`. Minus auch als `−`. |
| Experience | optional, `Name +N`, mehrere mit Komma. |
| `### FEATURES` | Pflicht vor dem ersten Feature. |
| Feature | `***Name - Passive:*** Text` (oder `Action`, `Reaction`), alles in einer Zeile. Klammern im Namen sind erlaubt: `Relentless (2)`. |
| Mehr Absätze | Eine leere `>`-Zeile, dann der nächste Absatz mit `> `. |
| Aufzählung | `> - …` direkt unter dem Feature; wird eine Liste. |
| Formatierung | `**fett**`, `*kursiv*`. Links `[[Ziel\|Anzeige]]` werden zu „Anzeige“, `[[Ziel (DH)]]` zu „Ziel“. |
| Größe | Folgt dem Typ: Solo → huge (3×3), Bruiser → large (2×2), sonst medium. Ausnahmen in `einstellungen.json`. |

**Zwei Stat Blocks in einer Notiz** (Bossphasen, Tier 2, Varianten): Der zweite Kopf bekommt einen Zusatz nach dem Gedankenstrich — `> [!statblock] NACHRUFER — SIRENE` wird „Nachrufer — Sirene“, `> [!statblock] SYFTER BULWARK — TIER 2` wird „Syfter Bulwark — Tier 2“. Der feste Anker ist hier *Notizname + Zusatz*; wer den **Zusatz** ändert, bekommt einen neuen Eintrag, wer nur den Namen davor ändert (`CALLBACK — SIRENE`), benennt um. Zwischen zwei Callouts steht eine Zeile **ohne** `>`.

**Varianten** bekommen einen eigenen Stat Block in derselben Notiz (wie *Grubenbär — Dreiklaue*). Varianten im Fließtext liest der Build nicht.

## 3. Stat Block für Umgebungen

```markdown
> [!statblock] JUNKARENA
> ***Tier 1 Event***
> *Junker's show beneath the city: a square pit under a dome of light.*
> **Impulses:** Put on a show, trap the brave, punish whoever waits
>
> > **Difficulty:** 14
> > **Potential Adversaries:** Wave 1 — [[Rohrmolch (DH)|Rohrmolch]], Rassler · Wave 2 — Heuler · on your side: Sable
>
> ### FEATURES
> ***The Dome - Passive:*** A dome of light closes the arena.
> *What did the last one who tried leave on the floor?*
```

- Typ: Exploration, Social, Traversal, Event.
- **Impulses** statt Motives & Tactics.
- **Potential Adversaries:** Gruppen durch ` · ` getrennt; jede Gruppe wird in Foundry eine eigene Zeile.
- Die **kursive Frage** in der Zeile unter einem Feature wird ein geheimer Abschnitt, den nur die Spielleitung sieht.
- Der Reiter „Notes“ in Foundry (Tabellen der Junkarena) kommt aus dem Projekt (`texte/<Name>.notes.html`), nicht aus der Notiz.

## 4. Features so schreiben, dass Foundry sie ausführt

Der Build macht aus **Action**- und **Reaction**-Features eine Aktion des Daggerheart-Systems, wenn der Text so gebaut ist. **Passive** bekommen nie eine Aktion.

| Im Text | In Foundry |
|---|---|
| `**Mark a Stress**`, `**Mark 2 Stress**`, `**Spend a Fear**` — fett, am Anfang oder direkt nach dem Auslöser („When …, the Skipper can **mark a Stress** to …“) | wird beim Benutzen abgezogen |
| `<Trait> Reaction Roll (<Zahl>)` — genau **ein** Trait: Agility, Strength, Finesse, Instinct, Presence, Knowledge | die Ziele werden zur Reaction Roll aufgefordert; ohne Zahl gilt die Difficulty des Gegners |
| `All PCs within <Reichweite> range` (auch *each*, *every*, *all targets*) | Kreis dieser Größe zum Platzieren |
| `within <Reichweite 1> range of a point within <Reichweite 2> range` | Kreis Größe 1, Reichweite 2 |
| `a PC` / `a target within <Reichweite> range` | ein Ziel (mit T markieren) |
| nach der Reaction Roll: `take **3d8+3** magic damage` oder `taking **2d8+2** physical damage` | Schaden bei Fehlschlag |
| `Targets who succeed take half damage` / `half on a success` | halber Schaden bei Erfolg; sonst kein Schaden bei Erfolg |
| nach der Reaction Roll: `or lose a Hope`, `or **mark a Stress**`, `or **mark 2 Stress**` | wer den Save **nicht** schafft, verliert die Hope bzw. markiert den Stress (macht der Helfer im Modul) |
| `Targets who succeed must **mark a Stress**` / `On a success, they **mark a Stress**` — im selben Satz wie „succeed“ | wer den Save **schafft**, markiert den Stress |
| `Gain a Fear for each PC who fails` | du bekommst die Fear je gescheitertem Save |

Was **nur ersatzweise** gilt („if they can't, they mark a Stress **instead**“), bleibt Text.

**Bleibt Text** (die Spielleitung handelt selbst): Zustände (*Vulnerable* …), Armor Slots, Spotlight, Beschwören, Fear außerhalb von „for each PC who fails“, Angriffswürfe („make an attack“ — automatisiert werden dann nur die Kosten).

**Nicht automatisch:** `Agility or Strength Reaction Roll` (zwei Traits) — das System kann nur einen. Wer die Automatik will, schreibt einen Trait.

Nach dem Build steht in `dist/automatik.txt`, welches Feature was bekommen hat.

## 5. Roll Tables

```markdown
> [!rolltable] WHAT THE CROWD THROWS
> *Each tick of Cheers, something comes through the bars.*
>
> | d6 | Result |
> |---|---|
> | 1 | Half a Pressling |
> | 2 | A pipe, good for hitting things |
> | 3–4 | A [[NeuroStim (DH)\|NeuroStim]] |
> | 5 | A piece of scrap (one Shard) |
> | 6 | A bottle that shatters on impact — and a whistle that someone in the crowd answers |
```

| Teil | Regel |
|---|---|
| Kopf | `> [!rolltable] NAME` in Großbuchstaben; in Foundry „What the Crowd Throws“. Namen sind über alle Tabellen eindeutig. |
| Beschreibung | optional, eine kursive Zeile vor der Tabelle. |
| Erste Spalte | im Kopf der Würfel (`d4`, `d6`, `d8`, `d10`, `d12`, `d20`, `2d6` …), darunter eine Zahl oder ein Bereich (`3–4`). Jede mögliche Zahl genau einmal — Lücken meldet der Build. |
| Zweite Spalte | das Ergebnis, kurz. |
| Dritte Spalte | optional: Details zum Ergebnis. Dann hat auch der Kopf drei Spalten: `\| d6 \| Result \| Details \|`. |
| Links in Tabellen | mit `\|`: `[[NeuroStim (DH)\|NeuroStim]]` (Obsidian verlangt das in Tabellen). |
| Platz | eigener Callout, durch eine Zeile **ohne** `>` vom Stat Block getrennt. Gern direkt unter dem Stat Block, der die Tabelle benutzt. |
| Verweis | Den Namen im Feature **kursiv oder fett** und genau wie die Tabelle schreiben: `(roll on *What the Crowd Throws*)`. In Foundry wird das ein Link, der die Tabelle öffnet. |

## 6. Prüfliste vor dem Speichern

- [ ] Callout-Kopf richtig (`[!statblock]` / `[!rolltable]`), alles darin Englisch.
- [ ] Tier-Zeile mit gültigem Typ; Horde mit `(n/HP)` und Feature `Horde (Würfel)`.
- [ ] Werte- und ATK-Zeile genau im Format oben.
- [ ] `### FEATURES` vorhanden, jedes Feature eine Zeile mit `- Passive:`, `- Action:` oder `- Reaction:`.
- [ ] Kosten fett und vorn, Reaction Roll mit einem Trait und Zahl, Reichweite ausgeschrieben.
- [ ] Roll Table: Würfel im Kopf, alle Zahlen belegt, Verweis kursiv mit genau dem Namen.
- [ ] `Gegner bauen.bat`: nichts unter „NICHT GELESEN“.
