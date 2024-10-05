import { Interaction } from "discord.js";

import { Command } from "./commandBase";
import cl from "./body";

/**
 * BOTがなんかしらのコマンドなどを受領したときの処理
 *
 * @param {Interaction} interaction
 */
async function interactionCreate(interaction: Interaction) {
  // コマンドじゃない場合は反応しない
  if (!interaction.isChatInputCommand()) {
    return;
  }

  const commandList = cl as Command[];

  const found = commandList.find(c => c.meta.name == interaction.commandName);
  if (found) {
    found.handler(interaction)
  }
}

export default interactionCreate;
