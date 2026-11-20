/**
 * Motherboard: Adversaries — area helper
 *
 * Daggerheart (2.12.x) on Foundry 14 places an action's area as a Region via the crosshair button
 * on the chat card, but it does not target the tokens inside it. This helper does:
 * when the GM places such an area, every token inside it (except the acting adversary and its
 * own side) becomes a target of that chat card, and Reaction Rolls are requested.
 *
 * Uses only what the system's own buttons use: TargetField.formatTarget, message.system.getContext
 * and the action's "save" workflow (same as "Reaction Roll All Targets").
 */

const MODULE_ID = "motherboard-adversaries";
const PENDING_MS = 2 * 60 * 1000;

/** The chat card whose crosshair button the GM clicked last. */
let pending = null;

Hooks.once("init", () => {
  game.settings.register(MODULE_ID, "autoTarget", {
    name: "Auto-target tokens in placed areas",
    hint: "When you place an action's area (crosshair button on the chat card), every token inside it becomes a target of that card. The acting adversary and its own side are left out.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });
  game.settings.register(MODULE_ID, "autoSave", {
    name: "Request Reaction Rolls for those targets",
    hint: "After targeting, ask every target for its Reaction Roll right away (like \"Reaction Roll All Targets\").",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });
});

Hooks.on("renderChatMessageHTML", (message, html) => {
  if (!game.user.isGM) return;
  for (const button of html.querySelectorAll(".action-areas")) {
    button.addEventListener("click", () => {
      pending = { messageId: message.id, time: Date.now() };
    }, { capture: true });
  }
});

Hooks.on("createRegion", async (region, _options, userId) => {
  if (userId !== game.user.id || !game.user.isGM) return;
  if (!pending || Date.now() - pending.time > PENDING_MS) return;
  const message = game.messages.get(pending.messageId);
  pending = null;
  if (!message || !game.settings.get(MODULE_ID, "autoTarget")) return;

  try {
    const tokens = tokensInRegion(region, message);
    if (!tokens.length) {
      ui.notifications.info(`${region.name}: no tokens inside the area.`);
      return;
    }

    // Targets as the system formats them, written to the chat card and shown on the canvas
    const formatTarget = game.system.api.fields.ActionFields.TargetField.formatTarget;
    await message.update({ "system.targets": tokens.map(t => formatTarget(t)) });
    canvas.tokens.setTargets(tokens.map(t => t.id), { mode: "replace" });

    const system = game.messages.get(message.id)?.system;
    const names = tokens.map(t => t.name).join(", ");
    if (system?.hasSave && game.settings.get(MODULE_ID, "autoSave")) {
      const config = await system.getContext({ event: new MouseEvent("click") });
      await system.action?.workflow.get("save")?.execute(config, system.currentHitTargets, true);
      ui.notifications.info(`${region.name}: Reaction Rolls requested from ${names}.`);
    } else {
      ui.notifications.info(`${region.name}: targeted ${names}.`);
    }
  } catch (error) {
    console.error(`${MODULE_ID} | area helper failed`, error);
    ui.notifications.warn(`${region.name}: could not target the tokens inside the area automatically. Target them by hand.`);
  }
});

/**
 * Tokens whose center lies inside the region, without the acting token and without tokens
 * on the acting token's side. For environments (no token) only player characters count.
 */
function tokensInRegion(region, message) {
  const source = canvas.tokens.get(message.speaker?.token);
  const sourceActor = source?.actor ?? message.system?.actionActor ?? null;
  const sourceDisposition = source?.document.disposition ?? sourceActor?.prototypeToken?.disposition;
  const isEnvironment = sourceActor?.type === "environment";

  return canvas.tokens.placeables.filter(token => {
    if (!token.actor || token === source || token.document.hidden) return false;
    if (isEnvironment) {
      if (!["character", "companion"].includes(token.actor.type)) return false;
    } else if (sourceDisposition !== undefined && token.document.disposition === sourceDisposition) {
      return false;
    }
    const center = token.document.getCenterPoint();
    return region.testPoint({ x: center.x, y: center.y, elevation: center.elevation ?? token.document.elevation });
  });
}
