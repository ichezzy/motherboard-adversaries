/**
 * Kleine Markdown-Umwandlung für Stat-Block-Texte: fett, kursiv, Obsidian-Links.
 */

/** [[Ziel|Anzeige]] → Anzeige, [[Ziel]] → Ziel ohne „ (DH)“ */
export function linksAufloesen(text) {
  return text
    .replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, "$2")
    .replace(/\[\[([^\]]+)\]\]/g, (_, ziel) => ziel.split("#")[0].replace(/\s*\(DH\)$/, ""));
}

function htmlSicher(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/** Eine Zeile Markdown → HTML (ohne umschließendes <p>). */
export function inlineHtml(text) {
  let t = htmlSicher(linksAufloesen(text.trim()));
  t = t.replace(/\*\*\*(.+?)\*\*\*/g, "<strong><em>$1</em></strong>");
  t = t.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  t = t.replace(/(^|[^*])\*(?!\s)(.+?)\*(?!\*)/g, "$1<em>$2</em>");
  return t;
}

/** Für reine Text-Felder (z. B. Bezeichnungen): Links auflösen, Sternchen weg. */
export function klartext(text) {
  return linksAufloesen(text).replace(/\*+/g, "").trim();
}

/** „SIRENE“ → „Sirene“, „TIER 2“ → „Tier 2“ */
export function normaleSchreibung(text) {
  return text.toLocaleLowerCase("de").replace(/(^|[\s\-–—(])(\p{L})/gu, (_, vor, b) => vor + b.toLocaleUpperCase("de"));
}
