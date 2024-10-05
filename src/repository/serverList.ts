import fs from "fs";

/**
 * サーバリスト
 */
type serverInfo = {
  gid: string,
  defaultChannel: string,
  anonChannel: string,
}

let servers: serverInfo[] = [];

/**
 * サーバリストを読み込む
 */
function init() {
  // 外だしした方がいい説はある
  servers = [];
}

/**
 * サーバリストを読み込む
 */
function load() {
  // 外だしした方がいい説はある
  const json = fs.readFileSync("servers.json", "utf-8");
  servers = JSON.parse(json) as serverInfo[];
}

/**
 * サーバリストを保存する
 */
function save() {
  // 外だしした方がいい説はある
  fs.writeFileSync("servers.json", JSON.stringify(servers));
}

/**
 * サーバリストに追加する
 *
 * @param gid {string} guild-id(サーバid)
 * @param defaultChannel {string} デフォルトのチャンネル
 */
function add(gid: string, defaultChannel: string) {
  if (has(gid)) {
    // すでにあるなら登録するわけないじゃん？
    return;
  }

  servers.push({
    gid: gid,
    defaultChannel: defaultChannel,
    anonChannel: "",
  });
}

/**
 * サーバリストから取得する
 *
 * @param gid {string} guild-id(サーバid)
 *
 * @returns {serverInfo|undefined} サーバ情報
 */
function get(gid: string): serverInfo | undefined {
  return servers.find(s => s.gid === gid)
}

/**
 * サーバリストに設定する
 *
 * @param gid {string} guild-id(サーバid)
 * @param defaultChannel {string} デフォルトのチャンネル
 * @param anonChannel {string} 匿名のチャンネル
 */
function set(gid: string, defaultChannel: string, anonChannel: string) {
  const index = servers.findIndex(s => s.gid === gid)
  servers[index].defaultChannel = defaultChannel;
  servers[index].anonChannel = anonChannel;
}

/**
 * guild-id(discordのサーバid)が登録されているかどうか
 *
 * @param gid {string} guild-id(サーバid)
 *
 * @returns {boolean} true: 登録されている
 */
function has(gid: string): boolean {
  return servers.some(s => s.gid === gid);
}

export { serverInfo, init, load, save, add, get, set, has };
