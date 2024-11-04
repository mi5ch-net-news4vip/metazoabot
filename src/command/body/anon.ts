import getClientInstance from '@src/bot/client';
import { Command } from '@cmd/define';
import channelIdList from '../../channelIdList';
import CreateDebugger from '@src/util/debug';
import sendWrapper from '@cmd/util';

const dbgr = CreateDebugger(true);

const anon: Command = {
  meta: {
    name: "anon",
    description: "(匿名お嬢様の代わり) あなたに代わってめたぞあがつぶやきます",
    optionList: [
      {
        name: "message",
        description: "つぶやきたい内容",
        type: typeof String,
        required: true
      }
    ]
  },
  handler: async (interaction) => {
    const client = getClientInstance();

    dbgr.log(`匿名お嬢様 channnelId: + ${channelIdList.anon}`)
    const ch = client.channels.cache.get(channelIdList.anon)
    if (ch === undefined) {
      dbgr.log("匿名お嬢様 channnelId: " + channelIdList.anon)
      await interaction.reply("壁に話しかけさせようとするな💢\nchannel-id: " + channelIdList.anon);
      return;
    }
    dbgr.log("interaction.options: " + interaction.options)
    dbgr.log(interaction.options)
    await sendWrapper(interaction, interaction.options.getString("message", true))
  },
};

export default anon;

