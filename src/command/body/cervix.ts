import { Command } from '../commandBase';

const cervix: Command = {
  meta: {
    name: "cervix",
    description: "Replies with 子宮なでなでしたい",
  },
  handler: async (interaction) => {
    await interaction.reply("子宮なでなでしたい");
  },
};

export default cervix;
