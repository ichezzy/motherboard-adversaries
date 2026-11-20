# Auftrag: Foundry-Format in die Leitfäden des Vaults übernehmen

*Für einen Writer's-Room-Chat im Aetherion-Vault. Von Chezzy weiterzugeben, Stand 20.11.2026.*

## Worum es geht

Mein Foundry-Modul **„Motherboard: Adversaries“** baut alle Gegner, Umgebungen und Roll Tables **direkt aus den Notizen** in `0_Daggerheart Mechaniken/` — per Doppelklick auf `E:\01_Dev\motherboard-adversaries\Gegner bauen.bat`. Damit das ohne Nacharbeit klappt, müssen Stat Blocks und Tabellen ein festes Format haben. Das Format steht in **`E:\01_Dev\motherboard-adversaries\docs\Notizformat.md`**. Diese Datei ist die Quelle der Wahrheit: Sie beschreibt genau, was der Build liest. Übernimm sie, ändere sie nicht.

**Ziel:** Jeder künftige Chat, der in diesem Vault einen Gegner, eine Umgebung oder eine Tabelle schreibt, hält das Format von selbst ein — weil es in den Leitfäden, Vorlagen und Prüflisten steht, die er ohnehin liest.

## Aufgaben

1. **Lesen:** `E:\01_Dev\motherboard-adversaries\docs\Notizformat.md` vollständig. Dann `0_Daggerheart Mechaniken/Adversaries bauen (DH).md`, `0_Daggerheart Mechaniken/Über diesen Ordner.md`, `_Vorlagen/Daggerheart Adversary.md`, `_Vorlagen/Daggerheart Environment.md` und in `_System/Konventionen.md` den Abschnitt zu Dateinamen und Mechanik.
2. **Neue Leitfaden-Notiz** `0_Daggerheart Mechaniken/Foundry-Format (DH).md`: der Inhalt von `Notizformat.md`, eingekleidet nach den Vault-Konventionen (Frontmatter wie beim Adversary-Leitfaden, Tags `mechanik`, `daggerheart`, `dh/leitfaden`, Callout „Auf einen Blick“). Inhaltlich nichts ändern. Dazu ein Satz: *Quelle ist `docs/Notizformat.md` im Modul-Repo; bei Abweichung gilt das Repo.*
3. **Verweise setzen:**
   - *Adversaries bauen (DH)*, Schritt 6 „Features schreiben“: kurz die Satzbau-Regel für Foundry ergänzen — Kosten fett und vorn (`**Mark a Stress**`), Reaction Roll mit **einem** Trait und Zahl, Reichweite ausgeschrieben, Schaden als `take **2d8+2** physical damage`, halber Schaden ausdrücklich. Mit Verweis auf Abschnitt 4 der neuen Notiz. Der Leitfaden erlaubt bisher Reaction Rolls „zur Wahl“ (*Agility or Instinct*); ergänze, dass Foundry diese nicht automatisieren kann — erlaubt bleibt es, empfohlen ist ein Trait.
   - *Adversaries bauen (DH)*, Schritt 10 „Notiz und Prüfliste“: Punkt *Foundry-Format eingehalten ([[Foundry-Format (DH)]]), `Gegner bauen.bat` meldet nichts unter „NICHT GELESEN“.*
   - *Über diesen Ordner* und *Konventionen* (Zeile zu Mechanik/Stat Blocks): je ein Verweis auf die neue Notiz, und die neue Callout-Art `[!rolltable]` nennen.
4. **Vorlagen:** `_Vorlagen/Daggerheart Adversary.md` und `_Vorlagen/Daggerheart Environment.md` so anpassen, dass der Stat Block **Zeile für Zeile** dem Format entspricht (Platzhalter in `{PLATZHALTER: …}` sind in Ordnung, die Struktur nicht). In beide Vorlagen ein auskommentiertes (`%% … %%`) Roll-Table-Beispiel.
5. **Junkarena:** In `0_Daggerheart Mechaniken/Environment/Junkarena (DH).md` die Zeile „**Was das Publikum wirft** (d6): …“ zusätzlich als englischen Callout `> [!rolltable] WHAT THE CROWD THROWS` anlegen — Vorschlag für den Wortlaut in Abschnitt 5 von `Notizformat.md`. Zeig mir die Übersetzung, bevor du speicherst. Ob die deutsche Zeile bleibt, entscheide ich.
6. **Bestand prüfen — nur lesen, nichts ändern:** Liste mir alle Stat Blocks und Tabellen in `0_Daggerheart Mechaniken/`, die vom Format abweichen, mit Notiz, Stelle und Vorschlag. Besonders: Reaction Rolls mit zwei Traits (z. B. Junkarena *Arm a Pit*), Kosten nicht fett oder nicht vorn, Tabellen im Fließtext, die Roll Tables werden könnten (Scrap- und Loot-Tabellen).

## Grenzen

- **Keine Werte und keine Feature-Texte ändern** — nur auf mein ausdrückliches Ja.
- Nichts in `E:\01_Dev\motherboard-adversaries` ändern.
- Neue Regeln sind `entwurf`; ✅ erst nach meinem Ja, wie im Vault üblich.

## Fertig, wenn

- Die neue Notiz, die Verweise und die Vorlagen stehen, und die Junkarena-Tabelle ist (nach meinem Ja) angelegt.
- Ich `Gegner bauen.bat` doppelklicke und die Zusammenfassung „Roll Tables: What the Crowd Throws (… Verweise in Features verlinkt)“ zeigt und nichts unter „NICHT GELESEN“.
- Ich die Liste aus Aufgabe 6 habe.
