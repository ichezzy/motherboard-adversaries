/**
 * Veröffentlicht eine neue Version auf GitHub:
 * bauen → Zusammenfassung zeigen → nachfragen → version.txt + stand/ speichern → Commit + Push → Release mit ZIP.
 * Danach findet Foundry das Update selbst (Setup → Add-on Modules → Nach Updates suchen).
 */
import { execFileSync } from "node:child_process";
import readline from "node:readline/promises";
import path from "node:path";
import fs from "node:fs";
import { PROJEKT } from "./einstellungen.mjs";
import { bauen, zusammenfassung } from "./bauen.mjs";
import { speichereStand, VERSION_DATEI } from "./stand.mjs";

function befehl(prog, args, { leise = false } = {}) {
  try {
    return execFileSync(prog, args, { cwd: PROJEKT, encoding: "utf8", stdio: leise ? "pipe" : ["ignore", "pipe", "pipe"] }).trim();
  } catch (fehler) {
    const text = (fehler.stderr || fehler.stdout || fehler.message || "").toString().trim();
    throw new Error(`„${prog} ${args.join(" ")}“ ist fehlgeschlagen:\n${text}`);
  }
}

function releaseText(r) {
  const v = r.vergleich;
  // Release-Text auf GitHub: Englisch, wie alles, was außerhalb dieses PCs zu sehen ist.
  const zeilen = [`${r.actors.length} entries: ` + r.proGruppe.map(([g, n]) => `${g} ${n}`).join(", ") + "."];
  if (!r.letzte) zeilen.push("", "First release.");
  else {
    if (v.neu.length) zeilen.push("", "**New:** " + v.neu.join(", "));
    if (v.geaendert.length) zeilen.push("", "**Changed:** " + v.geaendert.map(g => g.name).join(", "));
    if (v.umbenannt.length) zeilen.push("", "**Renamed:** " + v.umbenannt.map(u => `${u.von} → ${u.nach}`).join(", "));
    if (v.entfernt.length) zeilen.push("", "**Removed:** " + v.entfernt.join(", "));
  }
  return zeilen.join("\n");
}

async function frage(text) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const antwort = (await rl.question(text)).trim().toLowerCase();
  rl.close();
  return antwort === "j" || antwort === "ja";
}

async function main() {
  const r = await bauen();
  console.log(zusammenfassung(r).replace(/\nNoch nichts hochgeladen.*$/, ""));
  if (!r.einst.github) throw new Error("In einstellungen.json fehlt „github“ (z. B. \"ichezzy/motherboard-adversaries\").");

  const v = r.vergleich;
  const nichtsNeu = r.letzte && !v.neu.length && !v.geaendert.length && !v.umbenannt.length && !v.entfernt.length;
  console.log("");
  if (nichtsNeu) console.log("Gegenüber der letzten Version hat sich nichts geändert.");
  if (r.probleme.length) console.log(`Achtung: ${r.probleme.length} Einträge konnten nicht gelesen werden (siehe oben).`);
  if (!(await frage(`Version ${r.version} jetzt auf GitHub veröffentlichen? (j/n) `))) {
    console.log("Nichts veröffentlicht.");
    return;
  }

  fs.writeFileSync(VERSION_DATEI, r.version + "\n", "utf8");
  speichereStand(r.alles);
  befehl("git", ["add", "-A"]);
  befehl("git", ["commit", "-q", "-m", `Version ${r.version}`]);
  console.log("Lade hoch …");
  befehl("git", ["push", "-q", "origin", "HEAD"]);
  const notizen = path.join(r.paket.modul, "..", "release.md");
  fs.writeFileSync(notizen, releaseText(r), "utf8");
  befehl("gh", [
    "release", "create", `v${r.version}`,
    path.join(path.dirname(r.paket.zipDatei), "module.json"), r.paket.zipDatei,
    "--repo", r.einst.github, "--title", `Version ${r.version}`, "--notes-file", notizen, "--target", "main"
  ]);
  console.log("");
  console.log(`Fertig: Version ${r.version} ist veröffentlicht.`);
  console.log("In Foundry: Setup → Add-on Modules → „Nach Updates suchen“ → bei „Motherboard: Adversaries“ auf „Aktualisieren“.");
}

try {
  await main();
} catch (fehler) {
  console.error("\nVERÖFFENTLICHEN IST ABGEBROCHEN:\n" + (fehler?.message ?? fehler));
  process.exitCode = 1;
}
