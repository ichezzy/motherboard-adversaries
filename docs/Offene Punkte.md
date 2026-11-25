# Offene Punkte

*Stand 25.11.2026, Version 1.8. Was noch zu entscheiden, zu schreiben oder zu bauen ist — und wo das Modul bewusst aufhört.*

## A. Für dich oder den Writer's Room (Inhalt im Vault)

| Punkt | Was zu tun wäre |
|---|---|
| **Englische Namen** | Auftrag in `docs/Auftrag Englische Namen.md`. Bis dahin heißen die Gegner in Foundry deutsch (*Kreischer, Grubenbär …*). Das Modul ist vorbereitet: Überschrift des Stat Blocks ändern genügt. |
| **Die Hüter des Hotspot** | In *Hotspot* steht bei den möglichen Gegnern „the keepers of the Hotspot (no stat block yet)“. Es gibt noch keinen Stat Block. |
| **Junkarena-Notes** | Der Notes-Reiter der Junkarena (Abteile, Abschalten, Spickzettel) kommt aus meiner englischen Übersetzung in `texte\Junkarena.notes.html`, nicht aus der Notiz. Bitte die Übersetzung gegenlesen. Später könnten diese Tabellen als eigener Kasten in die Notiz (z. B. `[!gmnotes]`), dann liest der Build sie mit. |
| **Bilder** | Erst ein Gegner hat ein Bild (Gutter Slugger). Die Prompts liegen in `_Anhänge/Artwork`; jedes neue Bild unter dem Namen aus der Prompt-Datei ablegen — der nächste Build nimmt es mit. |
| **Token-Bilder** | Entscheidung offen: Splash-Bild als Token oder eigene Token-Bilder (siehe unten). |

## B. Sonderregeln, die nur in `einstellungen.json` stehen

Nicht im Vault sichtbar — wer die Notiz liest, sieht sie nicht:

- **Syfter sind neutral** (`gesinnungProGruppe`). Ohne diese Zeile wären sie feindlich.
- **Syfter Bulwark** und **Syfter Bulwark — Tier 2** sind **mittelgroß**, obwohl Bruiser sonst groß sind (`ausnahmen`).

Wenn das Regeln der Welt sind: in die Tier-Zeile schreiben (`— Neutral`) bzw. im Leitfaden festhalten.

## C. Grenzen der Automatik (bewusst Text)

| Was | Warum |
|---|---|
| Zustände (*Vulnerable, Restrained, Hidden* …) | Werden nicht gesetzt. Möglich wäre es über Effekte des Systems — eigener Schritt, wenn gewünscht. |
| Armor Slots, Spotlight, Beschwören, Countdowns | Das bleibt Spielleitung am Tisch. |
| Angriffe in Features („make an attack …“) | Nur die Kosten werden abgezogen; den Angriff würfelst du mit dem Standardangriff. |
| Fear gewinnen | Nur „Gain a Fear for each PC who fails“ ist automatisch. |
| Ersatzfolgen („… mark a Stress **instead**“) | Bleiben Text. |
| Reaction Roll mit zwei Traits („Agility or Strength“) | Das System kann nur einen; Feature bleibt ohne Save. |

## D. Technik

- **Der Kreis-Helfer und die Hope/Stress-Automatik** nutzen Abläufe von Daggerheart **2.12.9**. Nach jedem System-Update einmal `docs/Testanleitung.md` durchgehen.
- **Bildgröße:** Bilder kommen unverändert ins Modul. Mit allen Gegnern können es um die 50–100 MB werden; dann dauert das Update in Foundry etwas. Falls das stört: Bilder beim Bauen verkleinern (eigener kleiner Schritt).
- **Zweite Stat Blocks:** Ändert sich der Zusatz nach dem Gedankenstrich (*SIRENE* → *SIREN*), legt das Modul den Eintrag neu an statt umzubenennen. Harmlos.

## E. Ideen für später

- **Mögliche Gegner der Umgebungen als echte Links:** In Foundry stehen sie bisher als Text. Sie könnten auf die Gegner im Kompendium zeigen, dann ziehst du sie direkt aus der Umgebung in die Szene.
- **Zustände automatisch** (siehe C).
- **Scrap-Tabellen als Beute:** *Shards, Metals, Components* sind jetzt Roll Tables; mit dem Modul *Motherboard: Ferrond* (Scrap-Loot) könnten sie zusammenspielen.
