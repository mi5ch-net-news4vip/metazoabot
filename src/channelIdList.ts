/**
 * チャンネルID全般ラッパー
 */
const channelIdList = {
  // このBOTチャンネルIDは `世界征服#匿名めたぞあ`
  anon: process?.env?.DISCORD_CHANNEL_ANON ?? "",
  // このBOTチャンネルIDは `世界征服#ひろゆき`
  log: process?.env?.DISCORD_CHANNEL_LOG ?? "",
}

export default channelIdList;
