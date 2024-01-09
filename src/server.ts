import CreateDebugger from '@src/util/debug';
import dotenv from 'dotenv'
import { bootBot } from '@src/bot'

dotenv.config();

const isDebug = true;
const dbg = CreateDebugger(isDebug);

// TOKENなかったら即死する
if (process.env.DISCORD_BOT_SECRET_TOKEN == undefined) {
  dbg.log("process.env.DISCORD_BOT_SECRET_TOKEN:")
  dbg.log(process.env.DISCORD_BOT_SECRET_TOKEN)

  console.log("DISCORD_BOT_TOKENが設定されていません。");
  process.exit(0);
} else {
  bootBot();
}

