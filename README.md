# metazoabot

## About me

> これはなに？

めたぞあさんっぽく振舞ったりふるまわなかったりする `discord` 向け `bot` プログラムです

## How to contribution

> 開発のしかた

> 注意: ある程度ターミナル ( `/bin/bash` や `pwsh.exe` など ) の知識が要求されます

### exec on local

> ローカルの実行方法

1. `node.js` を用意します
    1. debian系linux: `sudo apt install -y nodejs`
    2. RHEL系linux: `sudo yum install -y nodejs`
2. このリポジトリを `git clone` でローカルに持ってきます
3. ローカルに `clone` してきたら、このディレクトリの中に入ります
    1. `cd metazoabot`
4. `npm install` をします
    1. `npm i`
5. `.env` を作成し、次のような内容を入力します
    ```.env
    DISCORD_BOT_TOKEN = XXXXXXXXXXXXXXXXXXX
    CLIENT_ID = XXXXXXXXXXXXXXXXXXX
    ```
    > 入力する内容はそれぞれ、 `discord developer portal` より取得できます
5. botを起動させます
    1. `npm run start`

### deploy

github actionにて自動デプロイを作成していますので、そこから実行してください

デプロイ先は `@cocoalix` が管理していますので、何かがあればそちらまでお願いします

### reference for develop/contribution

> 開発のしかたの参考資料

- [documentation - discord.js](https://discord.js.org/docs/packages/discord.js/14.14.1)
- [【基本】discord.js v14 でボット作成 #1 ～ボットの作成と初起動～ - Qiita](https://qiita.com/hitori_yuu/items/619de9786ffc9288c1d6#%E3%83%9C%E3%83%83%E3%83%88%E3%81%AE%E3%82%A2%E3%82%AB%E3%82%A6%E3%83%B3%E3%83%88%E4%BD%9C%E6%88%90)
