import { SlashCommandBuilder } from '@discordjs/builders';

import { Command } from "../commandBase";

import ping from "./ping";
import cervix from "./cervix";
import anon from "./anon";

const commandList: Command[] = [
  ping,
  cervix,
  anon
];

export function buildCommandList() {
  const builder = new SlashCommandBuilder()
  const builtCommandList = [];

  for (const c of commandList) {
    let x = builder.setName(c.meta.name)
      .setDescription(c.meta.description)
    if 
    buildCommandList.push()
  }
}

export default commandList;
