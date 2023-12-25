const discord = require("discord.js");

const REST = discord.REST;
const Routes = discord.Routes;
const Client = discord.Client;
const GatewayIntentBits = discord.GatewayIntentBits;

const isDebug = true;
function loggingForDebug(msg)
{
  if (isDebug) {
    console.log(msg)
  }
}

// TOKENなかったら即死する
if (process.env.DISCORD_BOT_TOKEN == undefined) {
  console.log("DISCORD_BOT_TOKENが設定されていません。");
  process.exit(0);
}

/*
 * コマンド登録
 * いわゆるスラッシュコマンド (/から開始するコマンド) を登録することが可能
 */

/**
 * @typedef Command
 * @property name {string} コマンド名
 * @property description {string} コマンド詳細
 */

/**
 * @type commands {Command[]} 受付可能コマンドリスト
 */
const commands = [
  {
    name: "ping",
    description: "Replies with ( ◞‸◟ )",
  },
  {
    name: "pregnant",
    description: "Replies with 子宮なでなでしたい",
  },
];

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_BOT_TOKEN);

(async () => {
  try {
    console.log('Started refreshing application (/) commands.');

    // ここで実際に設定したコマンドを登録している
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
  } catch (error) {
    console.error(error);
  }
})();

/*
 * BOT起動
 * BOTの起動時処理などはこっち
 */
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("interactionCreate", async (interaction) => {
  // BOTがなんかしらのコマンドなどを受領したときの処理
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "ping") {
    await interaction.reply("( ◞‸◟ )");
  }
  if (interaction.commandName === "pregnant") {
    await interaction.reply("子宮なでなでしたい");
  }
});


/*
 * BOTとの会話の定義
 * 会話の内容を入力する場合はこっち
 */
client.on("message", (message) => {
  loggingForDebug("message.author.id: " + message.author.id)
  loggingForDebug("client.user.id: " + message.author.bot)
  loggingForDebug("message.content: " + message.content)
  
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
    sendMsg(message.channel.id, text);
    return;
  }
});

function sendReply(message, text) {
  message
    .reply(text)
    .then(console.log("リプライ送信: " + text))
    .catch(console.error);
}

function sendMsg(channelId, text, option = {}) {
  client.channels
    .cache
    .get(channelId)
    .send(text, option)
    .then(console.log("メッセージ送信: " + text + JSON.stringify(option)))
    .catch(console.error);
}


// ログイン実施
client.login(process.env.DISCORD_BOT_TOKEN);

client.on("ready", (message) => {
  // BOTの待ち受け開始
  console.log("Bot準備完了～");
  client.user.setPresence({ activity: { name: "げーむ" } });
  
  // このBOTチャンネルIDは `世界征服#ひろゆき`
  const botChannelId = "1167436853549477948"
  sendMsg(botChannelId, "諸説ある")
});