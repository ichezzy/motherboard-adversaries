# Motherboard: Adversaries

Foundry-VTT-Modul (Foundry 14, System Daggerheart 2.12.9) für die Kampagne *White Signal*. Es bringt alle Gegner, Umgebungen und Roll Tables als Kompendien mit — gebaut **direkt aus den Obsidian-Notizen**, mit einem Doppelklick.

Diese Anleitung ist für Chezzy. Fachwörter stehen nur da, wo sie nötig sind, und werden gleich erklärt.

---

## 1. Was das Modul kann

**Zwei Kompendien** im Ordner „Motherboard“ in der Foundry-Seitenleiste (Buch-Symbol). Spieler sehen beide nicht, nur du und Assistenten.

| Kompendium | Inhalt |
|---|---|
| **Motherboard: Adversaries** | Alle Gegner in Ordnern nach Gruppe (Rustlings, Gutters, Chimeras, Salvants, Syfter) und alle Umgebungen (Environments) |
| **Motherboard: Roll Tables** | Alle Tabellen aus `[!rolltable]`-Kästen, z. B. *What the Crowd Throws* |

**Automatik in den Features.** Steht in einem Feature „**Mark a Stress**“ oder „**Spend a Fear**“, eine Reaction Roll, eine Reichweite oder Schaden, dann führt Foundry das aus, wenn du im Bogen auf das Feature klickst:
- Stress bzw. Fear wird abgezogen.
- Die Ziele werden zur Reaction Roll aufgefordert.
- Schaden lässt sich im Chat anwenden; wer den Save schafft, bekommt keinen oder halben Schaden — wie es im Text steht.
- „…or lose a Hope and mark a Stress“ trifft nur, wer den Save nicht schafft. „Targets who succeed must mark a Stress“ trifft nur, wer ihn schafft.

**Kreis-Helfer.** Hat ein Feature einen Bereich („All PCs within Far range …“), steht auf der Chat-Karte ein **Fadenkreuz ⌖**. Klick drauf, setz den Kreis — der Helfer macht alle Figuren darin zu Zielen, fragt ihre Reaction Rolls an und nimmt den Kreis wieder weg, wenn alle gewürfelt haben.

**Horden** würfeln ab halben HP automatisch den kleineren Horden-Schaden.

**Bilder.** Gibt es im Vault ein Bild für einen Gegner, steht es im Bogen.

### Einstellungen in Foundry

Einstellungen → Module konfigurieren → **Motherboard: Adversaries**. Alle vier sind an; einzeln abschalten, wenn etwas stört:

| Einstellung | Was sie tut |
|---|---|
| Auto-target tokens in placed areas | Figuren im gesetzten Kreis werden Ziele der Chat-Karte |
| Request Reaction Rolls for those targets | Diese Ziele werden sofort zur Reaction Roll aufgefordert |
| Remove the area when the attack is over | Der Kreis verschwindet, wenn alle gewürfelt haben |
| Apply Hope, Stress and Fear after Reaction Rolls | Hope-Verlust, Stress und Fear aus dem Feature-Text werden angewendet |

Dazu die Einstellung des Systems: Einstellungen → Daggerheart → **Automation Settings** → „Reaction Roll“ sollte auf *Always* oder *Show Dialog Only* stehen.

---

## 2. Einmal installieren

1. Foundry-Setup → **Add-on Modules** → **Install Module**.
2. Unten bei **Manifest URL** einfügen:
   `https://github.com/ichezzy/motherboard-adversaries/releases/latest/download/module.json`
3. **Install** klicken.
4. Welt starten → Einstellungen → **Manage Modules** → „Motherboard: Adversaries“ anhaken → speichern.

---

## 3. Der Alltag: Gegner ändern und in Foundry bringen

1. **Notiz ändern** — in Obsidian, im Stat Block (`[!statblock]`) oder einer Tabelle (`[!rolltable]`). Wie die Kästen aussehen müssen, steht in `docs/Notizformat.md` (im Vault: `0_Daggerheart Mechaniken/Foundry-Format (DH).md`).
2. **`Gegner bauen.bat` doppelklicken** (im Projektordner `E:\01_Dev\motherboard-adversaries`). Das baut das Modul nur auf diesem PC. Nichts wird hochgeladen.
3. **Zusammenfassung lesen** (siehe Abschnitt 4). Steht etwas unter „NICHT GELESEN“, die Notiz reparieren und wieder bauen.
4. **`Gegner veröffentlichen.bat` doppelklicken.** Zeigt dieselbe Zusammenfassung, fragt „(j/n)“. Mit **j** wird die Versionsnummer erhöht und die neue Version auf GitHub hochgeladen.
5. **In Foundry aktualisieren:** zurück ins Setup → Add-on Modules → **Nach Updates suchen** → bei „Motherboard: Adversaries“ **Aktualisieren** → Welt wieder starten.
6. **Gegner in der Welt neu ziehen.** Gegner, die du schon in die Welt gezogen hast, sind Kopien und ändern sich durch ein Update **nicht**. Für die neue Fassung: den Gegner in der Welt (Seitenleiste „Actors“) löschen und neu aus dem Kompendium ziehen. Tokens, die schon in einer Szene stehen, ebenfalls neu setzen.

---

## 4. Die Zusammenfassung lesen

| Zeile | Bedeutung |
|---|---|
| **Im Kompendium** | Wie viele Einträge pro Ordner |
| **Roll Tables** | Welche Tabellen gefunden wurden und wie viele Verweise in Features zu Links wurden |
| **Bilder** | Wie viele Gegner ein Bild haben |
| **neu / geändert / umbenannt / entfernt** | Unterschied zur zuletzt **veröffentlichten** Version. Bei „geändert“ steht in Klammern, was sich geändert hat (z. B. `Feature „Rotors“`, `system.difficulty`). |
| **NICHT GELESEN oder FEHLERHAFT** | Diese Stat Blocks oder Tabellen fehlen im Modul. Alle anderen sind trotzdem gebaut. |
| **Hinweise** | Nichts kaputt, aber wissenswert (z. B. ein Bild ohne passenden Gegner, eine Lücke in einer Tabelle) |
| **Automatik** | Wie viele Features eine Aktion bekommen. Die Liste mit jedem Feature steht in `dist\automatik.txt`. |

---

## 5. Wenn etwas schiefgeht

| Meldung | Was tun |
|---|---|
| *Erste Zeile ist keine Tier-Zeile wie „\*\*\*Tier 1 Support\*\*\*“* | Direkt unter `> [!statblock] NAME` muss `> ***Tier <Zahl> <Typ>***` stehen. |
| *Unbekannter Typ „…“ in der Tier-Zeile* | Typ falsch geschrieben. Erlaubt: Bruiser, Horde, Leader, Minion, Ranged, Skulk, Social, Solo, Standard, Support; Umgebungen: Exploration, Social, Traversal, Event. |
| *Horde ohne „(n/HP)“* | Tier-Zeile wie `***Tier 1 Horde (2/HP)***` schreiben. |
| *Es fehlt „hp“* (oder difficulty, thresholds, stress, atk, motives & tactics) | Die Werte-Zeile muss genau so aussehen: `> > **Difficulty:** 12 \| **Thresholds:** 4/8 \| **HP:** 3 \| **Stress:** 3`. Oft fehlt ein `\|` oder ein Doppelpunkt steht außerhalb der Sternchen. |
| *Angriff nicht verstanden* / *Reichweite nicht verstanden* / *Schaden nicht verstanden* | ATK-Zeile: `> > **ATK:** +1 \| **Name:** Far \| 1d6+2 mag`. Reichweite: Melee, Very Close, Close, Far, Very Far. Schaden mit `phy` oder `mag`. |
| *„…“ gibt es doppelt* | Zwei Stat Blocks mit gleichem Namen. Einen umbenennen. |
| *Die erste Spalte muss im Kopf den Würfel nennen* | Tabellenkopf wie `\| d6 \| Result \|`. |
| *Kein Ergebnis für 4, 5 (1d6)* | In der Tabelle fehlen Zahlen. Kein Fehler, aber beim Würfeln passiert dann nichts. |
| *In der Einstellungsdatei stimmt die Schreibweise nicht* | `einstellungen.json` hat einen Tippfehler: meist ein fehlendes Komma, ein Komma zu viel vor `}` oder `]`, oder ein einfacher `\` im Pfad (es müssen zwei sein: `\\`). |
| *Den Vault finde ich nicht* | Google Drive (G:) läuft nicht oder der Pfad in `einstellungen.json` stimmt nicht. |
| Beim Veröffentlichen: *„git push …“ ist fehlgeschlagen* oder *„gh release …“* | Internet prüfen. Wenn es nach Anmeldung klingt: einmal `gh auth login` in einem Terminal ausführen und den Schritten folgen, dann wieder veröffentlichen. |
| In Foundry passiert beim Kreis nichts | Browser-Konsole öffnen (F12), rote Zeile mit `motherboard-adversaries` suchen und an Claude geben. |

Und immer gut: `docs/Testanleitung.md` durchgehen.

---

## 6. Die Einstellungsdatei `einstellungen.json`

Mit einem Texteditor öffnen. Pfade mit doppeltem `\\`.

| Eintrag | Bedeutung |
|---|---|
| `vault` | Wo der Obsidian-Vault liegt |
| `ordner` | Unterordner im Vault: `gegner`, `umgebungen`, `tabellen` (hier wird nach `[!rolltable]` gesucht), `artwork` (Bilder), `jsonDateien` (alte Exporte, nur noch zum Vergleich) |
| `quelle` | `notizen` (normal) oder `json` (alter Weg aus den Export-Dateien) |
| `gruppen` | Unterordner im Vault → Name des Ordners in Foundry, z. B. `"Restlinge": "Rustlings"` |
| `umgebungsGruppe` | Name des Ordners für Umgebungen |
| `bilder.token` | `standard` (Token behält das Standard-Symbol) oder `splash` (Token zeigt das Bild des Gegners) |
| `hordenSchadenAutomatisch` | Horden-Schaden ab halben HP automatisch (`true`/`false`) |
| `automatik.an` | Features automatisieren (`true`/`false`); mit `"nurFuer": ["Name", …]` nur für diese Gegner |
| `umgebungsNotizen` | Welche Umgebung ihren Notes-Reiter aus einer Datei in `texte\` bekommt (Junkarena) |
| `gesinnungProGruppe` | Token-Gesinnung pro Gruppe: `feindlich`, `neutral`, `freundlich` (Syfter: neutral) |
| `ausnahmen` | Sonderregeln je Gegner, z. B. `"Syfter Bulwark": { "groesse": "medium" }` oder `{ "gesinnung": "freundlich" }` |
| `varianten` | Gegner, die aus einem anderen abgeleitet werden. Besser: eigener Stat Block in der Notiz. |
| `github` | Wohin veröffentlicht wird |

---

## 7. Was wo liegt

| Ordner / Datei | Inhalt |
|---|---|
| `Gegner bauen.bat`, `Gegner veröffentlichen.bat` | Die beiden Doppelklick-Dateien |
| `einstellungen.json` | Siehe Abschnitt 6 |
| `texte\` | Zusatztexte, die nicht aus den Notizen kommen (Junkarena-Notes) |
| `docs\` | Notizformat, Testanleitung, offene Punkte, Aufträge für andere Chats |
| `dist\` | Das Ergebnis des letzten Builds: Modulordner, ZIP, `automatik.txt`. Wird bei jedem Build neu geschrieben. |
| `stand\`, `version.txt` | Was zuletzt veröffentlicht wurde. **Nicht von Hand ändern** — daran misst die Zusammenfassung „neu / geändert“. |
| `werkzeug\`, `modul\`, `tests\` | Der Code: Build, der Helfer in Foundry, automatische Prüfungen |

Der Vault wird nur gelesen. Der Build schreibt nie hinein.
