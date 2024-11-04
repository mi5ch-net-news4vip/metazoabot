import discord from "discord.js";

import commandRouting from '@src/command/route';
import getClientInstance from '@src/bot/client';
import CreateDebugger from '@src/util/debug';

import { getCommandList } from '@src/command/body';

import dotenv from 'dotenv'
dotenv.config();

const REST = discord.REST;
const Routes = discord.Routes;

const dbgr = CreateDebugger();

type AnyChannel = (discord.DMChannel | discord.PartialDMChannel | discord.NewsChannel | discord.StageChannel | discord.TextChannel | discord.PrivateThreadChannel | discord.PublicThreadChannel<any> | discord.VoiceChannel)

export function bootBot() {
  // TOKENなかったら即死する
  if (process.env.DISCORD_BOT_SECRET_TOKEN == undefined) {
    dbgr.log("DISCORD_BOT_TOKENが設定されていません。");
    process.exit(0);
  }

  /**
   * コマンドのキー
   */
  const commandKeys = getCommandList()

  // discord rest api client instance
  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_SECRET_TOKEN);

  (async () => {
    try {
      dbgr.log('Started refreshing application (/) commands.');

      // ここで実際に設定したコマンドを登録している
      await rest.put(Routes.applicationCommands(process.env.DISCORD_BOT_SECRET_CLIENT ?? ""), { body: getCommandList() });

      dbgr.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      dbgr.log(error);
    }
  })();

  /*
   * BOT起動
   * BOTの起動時処理などはこっち
   */
  const client = getClientInstance();

  client.on("interactionCreate", commandRouting);
  //client.on("interactionCreate", async (interaction) => {

  //  commandRouting(interaction);

  //  // BOTがなんかしらのコマンドなどを受領したときの処理
  //  if (!interaction.isChatInputCommand()) return;

  //  if (interaction.commandName === commandKeys.ping) {
  //    await interaction.reply("( ◞‸◟ )");
  //  }
  //  if (interaction.commandName === commandKeys.pregnant) {
  //    await interaction.reply("子宮なでなでしたい");
  //  }
  //  if (interaction.commandName === commandKeys.anon) {
  //    dbgr.log("匿名お嬢様 channnelId: " + channelIds.anon)
  //    const ch = client.channels.cache.get(channelIds.anon)
  //    if (ch === undefined) {
  //      dbgr.log("匿名お嬢様 channnelId: " + channelIds.anon)
  //      await interaction.reply("壁に話しかけさせようとするな💢\nchannel-id: " + channelIds.anon);
  //      return;
  //    }
  //    dbgr.log("interaction.options: " + interaction.options)
  //    dbgr.log(interaction.options)
  //    //await ch.send(interaction.options.getString("message", true))
  //    await interaction?.channel?.send(interaction.options.getString("message", true))
  //  }
  //});

  // ログイン実施
  client.login(process?.env?.DISCORD_BOT_SECRET_TOKEN);
}

