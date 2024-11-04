import {
  SlashCommandBuilder,
} from '@discordjs/builders';

import { Command } from '@cmd/define';

// FIXME!! コマンドを追加したら必ずここにも追加すること
import ping from "./ping";
import cervix from "./cervix";
import anon from "./anon";

type OmmitSlashCommand = SlashCommandBuilder | Omit<typeof self, "addSubcommand" | "addSubcommandGroup">;

let builtCommandList: OmmitSlashCommand[] | null = null;

const commandList: Command[] = [
  ping,
  cervix,
  anon,
];

export function getCommandList() {
  if (builtCommandList) {
    return builtCommandList
  }

  builtCommandList = [];

  const builder = new SlashCommandBuilder();

  for (const c of commandList) {
    let command: OmmitSlashCommand = builder.setName(c.meta.name)
      .setDescription(c.meta.description)

    if (c.meta.optionList) {
      for (const o of c.meta.optionList) {
        command.addStringOption(
          option => option.setName(o.name)
            .setDescription(o.description)
            .setRequired(o.required)
        )
        builtCommandList?.push(command)
      }
    }
  }
}

export default commandList;
