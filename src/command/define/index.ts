import { ChatInputCommandInteraction, CacheType } from 'discord.js'

/**
 * @type CommandOption
 * @property name {string} オプション名
 * @property description {string} オプション詳細
 * @property type {string} オプションの型
 * @property required {boolean} オプションが必須かどうか
 */
export type CommandOption = {
  name: string,
  description: string,
  type: string,
  required: boolean,
}

/**
 * @type CommandMeta
 * @property name {string} コマンド名
 * @property description {string} コマンド詳細
 * @property optionList? {CommandOption[]} コマンドのオプションリスト
 */
export type CommandMeta = {
  name: string,
  description: string,
  optionList?: CommandOption[]
}

/**
 * @type Command
 * @property meta {CommandMeta} メタデータ
 * @property handler {(interaction: ChatInputCommandInteraction<CacheType>) => Promise<void>} 実行するコマンドのプログラム実態
 */
export type Command = {
  meta: CommandMeta,
  handler: (interaction: ChatInputCommandInteraction<CacheType>) => Promise<void>
}

