import {
  TextChannel,
  VoiceChannel,
  ChatInputCommandInteraction,
  CacheType,
  MessagePayload,
  MessageCreateOptions,
} from 'discord.js'

export type MessageOption = string | MessagePayload | MessageCreateOptions

const sendWrapper = async (interaction: ChatInputCommandInteraction<CacheType>, messageOption: MessageOption) => {
  const channel = interaction?.channel
  if (!channel) {
    return
  }
  const sendChannel = channel as TextChannel | VoiceChannel

  sendChannel.send(messageOption)
}

export default sendWrapper
export { sendWrapper }
