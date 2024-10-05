import { Command } from '../commandBase';

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

