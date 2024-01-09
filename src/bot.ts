import discord from "discord.js";
import { SlashCommandBuilder } from '@discordjs/builders';
import CreateDebugger from '@src/util/debug';

import dotenv from 'dotenv'
dotenv.config();

const REST = discord.REST;
const Routes = discord.Routes;
const Client = discord.Client;
const GatewayIntentBits = discord.GatewayIntentBits;

const isDebug = true;
const dbgr = CreateDebugger(isDebug);

type AnyChannel = (discord.DMChannel | discord.PartialDMChannel | discord.NewsChannel | discord.StageChannel | discord.TextChannel | discord.PrivateThreadChannel | discord.PublicThreadChannel<any> | discord.VoiceChannel)

export function bootBot() {
  // TOKENなかったら即死する
  if (process.env.DISCORD_BOT_SECRET_TOKEN == undefined) {
    dbgr.log("DISCORD_BOT_TOKENが設定されていません。");
    process.exit(0);
  }

  /**
   * チャンネルID全般ラッパー
   */
  const channelIds = {
    // このBOTチャンネルIDは `世界征服#匿名めたぞあ`
    anon: process.env.DISCORD_CHANNEL_ANON ?? "",
    // このBOTチャンネルIDは `世界征服#ひろゆき`
    log: process.env.DISCORD_CHANNEL_LOG ?? "",
  }

  /**
   * コマンドのキー
   */
  const commandKeys = { 
    /**
     * pingコマンド
     */
    ping: "ping",
    /**
     * 子宮なでなでコマンド
     */
    pregnant: "cervix",
    /**
     * 匿名めたぞあ発言コマンド
     */
    anon: "anon",
  }

  /*
   * コマンド登録
   * いわゆるスラッシュコマンド (/から開始するコマンド) を登録することが可能
   */

  // 匿名書き込み用コマンド
  const builder = new SlashCommandBuilder()
  const anonCommand = builder.setName(commandKeys.anon)
  .setDescription("(匿名お嬢様の代わり) あなたに代わってめたぞあがつぶやきます")
  .addStringOption(option => option.setName("message").setDescription("メッセージ").setRequired(true))


  /**
   * @type Command
   * @property name {string} コマンド名
   * @property description {string} コマンド詳細
   */
  type Command = {
    name: string,
    description: string,
  }

  /**
   * @type commands {Command[]} 受付可能コマンドリスト
   */
  const commands: Command[] = [
    {
      name: commandKeys.ping,
      description: "Replies with ( ◞‸◟ )",
    },
    {
      name: commandKeys.pregnant,
      description: "Replies with 子宮なでなでしたい",
    },
    anonCommand,
  ];

  const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_SECRET_TOKEN);

  (async () => {
    try {
      dbgr.log('Started refreshing application (/) commands.');

      // ここで実際に設定したコマンドを登録している
      await rest.put(Routes.applicationCommands(process.env.DISCORD_BOT_SECRET_CLIENT ?? ""), { body: commands });

      dbgr.log('Successfully reloaded application (/) commands.');
    } catch (error) {
      dbgr.log(error);
    }
  })();

  /*
   * BOT起動
   * BOTの起動時処理などはこっち
   */
  const client = new Client({ intents: GatewayIntentBits.Guilds });

  client.on("interactionCreate", async (interaction) => {
    // BOTがなんかしらのコマンドなどを受領したときの処理
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === commandKeys.ping) {
      await interaction.reply("( ◞‸◟ )");
    }
    if (interaction.commandName === commandKeys.pregnant) {
      await interaction.reply("子宮なでなでしたい");
    }
    if (interaction.commandName === commandKeys.anon) {
      dbgr.log("匿名お嬢様 channnelId: " + channelIds.anon)
      const ch = client.channels.cache.get(channelIds.anon)
      if (ch === undefined) {
        dbgr.log("匿名お嬢様 channnelId: " + channelIds.anon)
        await interaction.reply("壁に話しかけさせようとするな💢\nchannel-id: " + channelIds.anon);
        return;
      }
      dbgr.log("interaction.options: " + interaction.options)
      dbgr.log(interaction.options)
      //await ch.send(interaction.options.getString("message", true))
      await interaction?.channel?.send(interaction.options.getString("message", true))
    }
  });


  /*
   * BOTとの会話の定義
   * 会話の内容を入力する場合はこっち
   */
  client.on("message", (message) => {
    dbgr.log("message.author.id: " + message.author.id)
    dbgr.log("client.user.id: " + message.author.bot)
    dbgr.log("message.content: " + message.content)

    if (client.user === null || client.user === undefined) {
      sendReply(message, `お前誰だよ💢 (client.userが ${typeof client.user} )\n`);
      return;
    }

    // BOTがwatchしているチャンネルでアクションされたときの処理
    if (message.author.id == client.user.id || message.author.bot) {
      return;
    }
    if (message.isMemberMentioned(client.user)) {
      sendReply(message, "呼びましたか？");
      return;
    }
    if (message.content.match(/にゃ～ん|にゃーん/)) {
      let text = "にゃ～ん";
      sendMsg(message, text);
      return;
    }
  });

  async function sendReply(message: discord.Message, text: string) {
    await message.reply(text)
    .then(() => dbgr.log("リプライ送信: " + text))
    .catch((err: Error) => dbgr.log(err));
  }

  async function sendMsg(message: discord.Message, text: string) {
    await message.channel
    .send(text)
    .then(() => dbgr.log("メッセージ送信: " + text))
    .catch((err: Error) => dbgr.log(err));
  }


  // ログイン実施
  client.login(process.env.DISCORD_BOT_SECRET_TOKEN);

  client.on("ready", (cl: discord.Client<boolean>) => {
    // BOTの待ち受け開始
    dbgr.log("Bot準備完了～");
    cl.user?.setPresence({
      activities: [
        {
          name: "げーむ",
          state: "ぴゅっぴゅ中"
        },
      ],
    });

    // このBOTチャンネルIDは `世界征服#ひろゆき`
    client.channels
    .fetch(channelIds.log)
    .then((channel) => {
      const ch = channel as AnyChannel
      ch.send("諸説ある");
    })
  });

}

