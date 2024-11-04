# コマンドの登録 - src / command / body

## つかいかた - How to use

### コマンドソースの追加 - Add command source

次のコードをサンプルとして `src/command/body` にコマンドソースを追加します。

> `YOUR_AWESOME_COMMAND_NAME` は実際のコマンド名に置き換えてください

    ```typescript
import { Command } from '@src/command/body/commandBase';

const YOUR_AWESOME_COMMAND_NAME: Command = {
  meta: {
    name: "YOUR_AWESOME_COMMAND_NAME",
    description: "ここにコマンドの説明を書く",
  },
  handler: async (interaction) => {
    // やりたい操作は以下のドキュメントの `Methods` 欄を参照してください
    // https://discord.js.org/docs/packages/discord.js/14.14.1/ChatInputCommandInteraction:Class
    await interaction.reply("やりたい操作を書く");
  },
};

export default YOUR_AWESOME_COMMAND_NAME;
```

### コマンドソースの読み込み - register command to index.ts

`src/command/body/index.ts` に次のようにコードを追加して、コマンドソースを読み込みます。

> `YOUR_AWESOME_COMMAND_NAME` は実際のコマンド名に置き換えてください

    ```diff.typescript
  import ping from "./ping";
  import cervix from "./cervix";
  import anon from "./anon";
+ import YOUR_AWESOME_COMMAND_NAME from "@src/command/body/anon";

  // :
  // 中略
  // :
  
  const commandList: Command[] = [
    ping,
    cervix,
    anon,
+   YOUR_AWESOME_COMMAND_NAME,
  ];
```
