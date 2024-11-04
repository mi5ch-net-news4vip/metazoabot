import { Command } from '@cmd/define';

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
