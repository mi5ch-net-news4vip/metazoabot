import { Command } from '@cmd/define';

const ping: Command = {
  meta: {
    name: "ping",
    description: "Replies with ( ◞‸◟ )",
  },
  handler: async (interaction) => {
    await interaction.reply("( ◞‸◟ )");
  },
};

export default ping;

