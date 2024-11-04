import { Client, TextChannel, GatewayIntentBits, Message } from "discord.js";

import commandRouting from '@src/command/route';

import CreateDebugger from '@src/util/debug';
import channelIdList from "@src/channelIdList";

var client: Client | null = null;

const dbgr = CreateDebugger();

/**
 * クライアントインスタンスを取得する
 *
 * @returns {Client} クライアントインスタンス
 */
function getClientInstance(): Client {
  if (client) {
    return client
  }

  client = new Client({ intents: GatewayIntentBits.Guilds });

  // コマンドのルーティング
  client.on("interactionCreate", commandRouting);

  // botとの会話
  client.on("message", onGetMessage);

  // bot準備完了時処理
  client.on("ready", onReady);

  return client;
}

function onReady(client: Client<boolean>) {
  // BOTの待ち受け開始
  dbgr.log("Bot準備完了～");
  client.user?.setPresence({
    activities: [
      {
        name: "げーむ",
        state: "ぴゅっぴゅ中"
      },
    ],
  });

  // このBOTチャンネルIDは `世界征服#ひろゆき`
  client.channels
    .fetch(channelIdList.log)
    .then((channel) => {
      const ch = channel as TextChannel
      ch.send("諸説ある");
    })
}

/*
 * BOTとの会話の定義
 * 会話の内容を入力する場合はこっち
 */
function onGetMessage(message: Message) {
  if (!client) {
    return;
  }

  const dbgr = CreateDebugger();
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

  // TODO: ここなんか違う気がする
  // もともとは
  // if (message.isMemberMentioned(client.user)) {
  // であった
  if (message.inGuild()) {
    sendReply(message, "呼びましたか？");
    return;
  }

  //if (message.content.match(/にゃ～ん|にゃーん/)) {
  //  let text = "にゃ～ん";
  //  sendMsg(message, text);
  //  return;
  //}
}

async function sendReply(message: Message, text: string) {
  await message.reply(text)
    .then(() => dbgr.log("リプライ送信: " + text))
    .catch((err: Error) => dbgr.log(err));
}

//async function sendMsg(message: Message, text: string) {
//  await message.channel.send(text)
//    .then(() => dbgr.log("メッセージ送信: " + text))
//    .catch((err: Error) => dbgr.log(err));
//}

export default getClientInstance;
