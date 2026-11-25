# Auftrag: Englische Namen für Gegner, Umgebungen und ihre Begriffe

*Für einen Writer's-Room-Chat im Aetherion-Vault (Cowork oder Claude Code — Hauptsache mit Schreibzugriff auf den Vault und mit der Namensschmiede). Von Chezzy weiterzugeben, Stand 25.11.2026.*

## Worum es geht

Mein Foundry-Modul **„Motherboard: Adversaries“** zeigt alles auf **Englisch** — die Stat Blocks sind es schon, die **Namen** der Gegner noch nicht: *Kreischer, Grubenbär, Nachrufer, Wespenkönigin, Arena-Treiberin …* Jeder Gegner, jede Umgebung und jeder deutsche Begriff **innerhalb** der Stat Blocks soll eine englische Form bekommen.

Das ist keine Übersetzung. Es gilt die Regel aus `_System/Namensbildung.md` (*Lokalisierung*, beschlossen 15.09.2026): **zwei Formen, die zweite ist eine eigene Prägung**; Ferronds englisches Register ist Signal- und Elektrotechnik (Static, Deadband, Gridspire); dazu die **Zweisprachigkeitsprüfung**. Einige englische Formen gibt es schon im `_System/Begriffsindex.md`: **Restlinge (Rustlings)**, **Nachrufer (Callback)**, **Chimären (Chimera)**, **Netzpfeiler (Gridspire)**, **der Sturm (the Whiteout)**, **Dreiklaue (🔍 Three-Claw, noch offen)**, **Blaurausch (Blue Static)**, **Peiler (Tuner)**.

## Aufgaben

1. **Bestand aufnehmen (nur lesen):** Alle Notizen mit `[!statblock]` unter `0_Daggerheart Mechaniken/Adversary/` und `Environment/`. Liste je Notiz: deutscher Name, vorhandene englische Form (Begriffsindex), und jedes **deutsche Wort innerhalb der Callouts** — Feature-Namen (*Fremdtakt, Feldloch, Funkloch, Sog* …), Begriffe im Text (*Restlinge, Chimären, Bake, Schirm, Funk, Äther, Pressling* …), Gruppen in *Potential Adversaries*. Begriffe, die Ferrond bewusst deutsch lässt, markierst du als solche.
2. **Namen finden — Stück für Stück, mit mir:** Mit der Namensschmiede je Name zwei, drei Kandidaten mit Herleitung und Prüfung. Ich entscheide; höchstens eine Frage pro Antwort. Fang mit **Kreischer, Grubenbär und Grubenbär — Dreiklaue** an, damit wir das Verfahren einmal ganz durchspielen, dann gruppenweise: Restlinge, Chimären, Gutters, Syfter, Umgebungen.
3. **Eintragen:** Jeder entschiedene Name kommt in den `Begriffsindex` als *Deutsch (English)*, wie im Bestand üblich, mit ✅ und Datum erst nach meinem Ja.
4. **Stat Blocks umstellen — erst nach meinem Ja je Gruppe:**
   - **Überschrift des Callouts** = englischer Name in Großbuchstaben: `> [!statblock] SCREECHER`. Das Modul zeigt diese Überschrift als Namen in Foundry. Bei zweiten Stat Blocks bleibt die Form `NAME — ZUSATZ` (z. B. `CALLBACK — SIREN`); ändert sich der Zusatz, legt das Modul den Eintrag neu an — das ist in Ordnung.
   - **Innerhalb der Callouts** den deutschen Namen durch den englischen ersetzen: Beschreibung, Features (*The Kreischer flies* → *The Screecher flies*), *Potential Adversaries*, Roll Tables. Feature-Namen ebenso.
   - **Nicht ändern:** Dateinamen (`Kreischer (DH).md` bleibt — daran hängen Links und die festen IDs im Modul), Artwork-Dateien in `_Anhänge/Artwork/`, alle Zahlen und Regeln, den deutschen Text außerhalb der Callouts (dort bei Erstnennung *Deutsch (English)* nach den Konventionen).
5. **Leitfaden:** In `0_Daggerheart Mechaniken/Foundry-Format (DH).md` und `Adversaries bauen (DH).md` festhalten: Die Callout-Überschrift ist der englische Name; ein neuer Gegner bekommt seinen englischen Namen gleich beim Bauen.

## Grenzen

- Keine Werte, keine Regeln, keine Feature-Wirkung ändern.
- Nichts in `E:\01_Dev\motherboard-adversaries` ändern.
- Neue Namen sind `entwurf`, bis ich sie bestätige.

## Fertig, wenn

- Jeder Gegner und jede Umgebung im Begriffsindex eine englische Form hat (oder bewusst keine).
- Alle Callout-Überschriften und Callout-Texte die englischen Formen benutzen.
- Ich `E:\01_Dev\motherboard-adversaries\Gegner bauen.bat` doppelklicke und die Zusammenfassung die Umbenennungen zeigt (*Kreischer → Screecher*) und nichts unter „NICHT GELESEN“.
