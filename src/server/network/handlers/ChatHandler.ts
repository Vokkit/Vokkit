import { SocketHandler } from './SocketHandler'
import { Vokkit } from '../../Vokkit'
import { NetworkManager } from '../NetworkManager'
import { PluginManager } from '../../plugin/PluginManager'
import { PlayerChatEvent } from '../../event/player/PlayerChatEvent'

export interface ChatData {
  message: string
}

export class ChatHandler extends SocketHandler {
  onConnection (socket: SocketIO.Socket) {
    socket.on('chat', (data: ChatData) => this.onChat(socket, data))
  }

  onChat (socket: SocketIO.Socket, data: ChatData) {
    const player = Vokkit.getServer().getPlayerById(socket.id)
    if (!player) {
      // Error: player sent chat without login
      // Todo: check and ban ip
      socket.disconnect()
      return
    }
    const event = new PlayerChatEvent(player, data.message)
    PluginManager.callEvent(event)

    if (!event.isCancelled()) {
      NetworkManager.getSocket().emit('chat', {
        message: Vokkit.getServer().getLanguageFormatter().format('chat_format', { sender: player.getName(), message: data.message })
      })
    }
  }
}
