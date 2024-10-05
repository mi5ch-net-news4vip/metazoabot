import { ChatInputCommandInteraction, CacheType } from 'discord.js'

/**
 * @type CommandMeta
 * @property name {string} コマンド名
 * @property description {string} コマンド詳細
 */
export type CommandMeta = {
  name: string,
  description: string,
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

