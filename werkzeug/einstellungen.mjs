/**
 * Liest einstellungen.json und prüft sie. Fehlermeldungen auf Deutsch, damit Chezzy sie selbst beheben kann.
 */
import fs from "node:fs";
import path from "node:path";

export const PROJEKT = path.resolve(import.meta.dirname, "..");

export function ladeEinstellungen(datei = path.join(PROJEKT, "einstellungen.json")) {
  let text;
  try {
    text = fs.readFileSync(datei, "utf8");
  } catch {
    throw new Error(`Die Einstellungsdatei fehlt: ${datei}`);
  }
  let e;
  try {
    e = JSON.parse(text);
  } catch (fehler) {
    throw new Error(
      `In der Einstellungsdatei stimmt die Schreibweise nicht (${fehler.message}).\n` +
      `Häufige Ursachen: ein fehlendes Komma, ein Komma zu viel vor } oder ], oder ein einzelner \\ im Pfad (es müssen zwei sein: \\\\).`
    );
  }
  for (const feld of ["vault", "ordner", "gruppen", "umgebungsGruppe"]) {
    if (!(feld in e)) throw new Error(`In der Einstellungsdatei fehlt der Eintrag „${feld}“.`);
  }
  if (!fs.existsSync(e.vault)) throw new Error(`Den Vault finde ich nicht: ${e.vault}`);
  const pfade = {
    jsonDateien: path.join(e.vault, e.ordner.jsonDateien),
    gegner: path.join(e.vault, e.ordner.gegner),
    umgebungen: path.join(e.vault, e.ordner.umgebungen),
    tabellen: path.join(e.vault, e.ordner.tabellen ?? "0_Daggerheart Mechaniken")
  };
  for (const [name, p] of Object.entries(pfade)) {
    if (!fs.existsSync(p)) throw new Error(`Den Ordner „${name}“ finde ich nicht: ${p}`);
  }
  // Bilder sind freiwillig: fehlt der Ordner, bleibt es bei den Standard-Symbolen
  pfade.artwork = path.join(e.vault, e.ordner.artwork ?? path.join("_Anhänge", "Artwork"));
  return {
    ...e,
    pfade,
    quelle: e.quelle ?? "notizen",
    varianten: e.varianten ?? [],
    hordenSchadenAutomatisch: e.hordenSchadenAutomatisch ?? true
  };
}
