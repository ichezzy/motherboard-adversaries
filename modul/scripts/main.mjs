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
 *
 * Further down: Hope/Stress/Fear consequences of Reaction Rolls, and removing the area once
 * every target has rolled.
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
  game.settings.register(MODULE_ID, "removeArea", {
    name: "Remove the area when the attack is over",
    hint: "The area placed with the crosshair button disappears as soon as every target's Reaction Roll is in (or right away if nobody stands inside it).",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });
  game.settings.register(MODULE_ID, "applyOnFail", {
    name: "Apply Hope, Stress and Fear after Reaction Rolls",
    hint: "For Motherboard features like \"…or lose a Hope and mark a Stress\": every target that fails its Reaction Roll loses the Hope and marks the Stress, and \"gain a Fear for each PC who fails\" adds the Fear. Lines like \"Targets who succeed must mark a Stress\" apply to targets who succeed.",
    scope: "world",
    config: true,
    type: Boolean,
    default: true
  });
});

/* -------------------------------------------- */
/*  Consequences of Reaction Rolls               */
/* -------------------------------------------- */

/**
 * Daggerheart 2.12.9 applies Hope/Stress parts of an action to every target, saved or not.
 * So Motherboard features carry these consequences as flags on the feature item:
 *   flags["motherboard-adversaries"].onFailedSave     = { hope, stress, fear }  ("…or lose a Hope")
 *   flags["motherboard-adversaries"].onSuccessfulSave = { hope, stress }        ("Targets who succeed must mark a Stress")
 * This hook applies them once per target as soon as its Reaction Roll is in, using the system's
 * own Actor#modifyResource.
 */
const inProgress = new Set();

Hooks.on("updateChatMessage", async (message, changes) => {
  if (game.users.activeGM?.id !== game.user.id) return;
  const changed = Object.keys(foundry.utils.flattenObject(changes ?? {}));
  if (!changed.some(key => key.startsWith("system.targetSaves"))) return;
  await applyConsequences(message);
  await removeAreaWhenDone(message);
});

async function applyConsequences(message) {
  if (!game.settings.get(MODULE_ID, "applyOnFail")) return;

  const system = message.system;
  const onFail = system?.item?.getFlag?.(MODULE_ID, "onFailedSave");
  const onSuccess = system?.item?.getFlag?.(MODULE_ID, "onSuccessfulSave");
  if ((!onFail && !onSuccess) || system.targeting?.usingSelect) return;

  const applied = new Set(message.getFlag(MODULE_ID, "applied") ?? []);
  const open = system._getCurrentTargets().filter(t =>
    t.saveResult && !applied.has(t.id) && !inProgress.has(`${message.id}.${t.id}`)
  );
  if (!open.length) return;

  const feature = system.item.name;
  try {
    for (const target of open) {
      inProgress.add(`${message.id}.${target.id}`);
      const failed = target.saveResult.success === false;
      const folgen = (failed ? onFail : onSuccess) ?? {};
      const actor = foundry.utils.fromUuidSync(target.actorId);
      const resources = [];
      if (folgen.hope) resources.push({ key: "hope", value: -folgen.hope });
      if (folgen.stress) resources.push({ key: "stress", value: folgen.stress });
      if (actor && resources.length) await actor.modifyResource(resources);
      if (failed && folgen.fear) await (system.actionActor ?? actor)?.modifyResource([{ key: "fear", value: folgen.fear }]);
      applied.add(target.id);

      const parts = [];
      if (folgen.hope) parts.push(`loses ${folgen.hope} Hope`);
      if (folgen.stress) parts.push(`marks ${folgen.stress} Stress`);
      if (failed && folgen.fear) parts.push(`you gain ${folgen.fear} Fear`);
      if (parts.length) ui.notifications.info(`${feature}: ${target.name} ${failed ? "failed" : "succeeded"} — ${parts.join(", ")}.`);
    }
    await message.setFlag(MODULE_ID, "applied", [...applied]);
  } catch (error) {
    console.error(`${MODULE_ID} | applying consequences failed`, error);
    ui.notifications.warn(`${feature}: could not apply Hope/Stress automatically. Apply it by hand.`);
  } finally {
    for (const target of open) inProgress.delete(`${message.id}.${target.id}`);
  }
}

/* -------------------------------------------- */
/*  Removing the area                            */
/* -------------------------------------------- */

/** The area (Region) this helper targeted from is remembered on the chat card as a flag. */
async function removeArea(message, delay = 1500) {
  const uuid = message.getFlag(MODULE_ID, "area");
  if (!uuid || !game.settings.get(MODULE_ID, "removeArea")) return;
  await message.unsetFlag(MODULE_ID, "area");
  setTimeout(async () => {
    try {
      const region = await foundry.utils.fromUuid(uuid);
      await region?.delete();
    } catch (error) {
      console.error(`${MODULE_ID} | removing the area failed`, error);
    }
  }, delay);
}

/** As soon as every target of the card has its Reaction Roll, the attack is over. */
async function removeAreaWhenDone(message) {
  if (!message.getFlag(MODULE_ID, "area")) return;
  const targets = message.system?._getCurrentTargets?.() ?? [];
  if (targets.length && targets.every(t => t.saveResult)) await removeArea(message);
}

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
    // Remember the area on the card so it can be removed when the attack is over
    await message.setFlag(MODULE_ID, "area", region.uuid);
    const tokens = tokensInRegion(region, message);
    if (!tokens.length) {
      ui.notifications.info(`${region.name}: no tokens inside the area.`);
      await removeArea(message, 3000);
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
