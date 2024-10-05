# src/README.md

## コマンドの追加方法

1. `src/commands/body` ディレクトリに新しいコマンドファイルを作成します。
    - e.g. `src/commands/body/newCommand.ts`
2. 作成したファイルに以下のようにコマンドを追加します。
  ```typescript
  import { Command } from '../commandBase';

  const newCommand: Command = {
    meta: {
      name: "newCommand",
      description: "Replies with 子宮なでなでしたい",
    },
    handler: async (interaction) => {
      await interaction.reply("子宮なでなでしたい");
    },
  };

  export default newCommand;
  ```
3. `route.ts` に以下のように追加します。
  ```typescript
  import newCommand from './commands/body/newCommand';
  // :
  // : (中略)
  // :
  switch (interaction.commandName) {
    // :
    // : (中略)
    // :
    case newCommand.meta.name:
      await newCommand.handler(interaction);
      break;
  // :
  // : (中略)
  // :
  }
  ```
