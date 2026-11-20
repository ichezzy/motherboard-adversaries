/**
 * Feste IDs: Aus denselben Namen entsteht bei jedem Build dieselbe ID.
 * Foundry verlangt 16 Zeichen aus Buchstaben und Ziffern.
 */
import { createHash } from "node:crypto";

const ZEICHEN = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const NAMENSRAUM = "white-signal-gegner";

export function festeId(...teile) {
  const hash = createHash("sha256").update([NAMENSRAUM, ...teile].join("␟")).digest();
  let id = "";
  for (let i = 0; i < 16; i++) id += ZEICHEN[hash[i] % ZEICHEN.length];
  return id;
}

/** Zählt gleichnamige Einträge mit, damit zwei Features „Horde“ trotzdem verschiedene IDs bekommen. */
export function idZaehler() {
  const gesehen = new Map();
  return (schluessel) => {
    const n = gesehen.get(schluessel) ?? 0;
    gesehen.set(schluessel, n + 1);
    return n;
  };
}
