import { Command } from '../commandBase';

const anon: Command = {
  meta: {
    name: "cervix",
    description: "Replies with 子宮なでなでしたい",
  },
  handler: async (interaction) => {
    await interaction.reply("子宮なでなでしたい");
  },
};

export default anon;

