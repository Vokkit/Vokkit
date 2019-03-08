import { SocketHandler } from './SocketHandler'
import { Vokkit } from '../../Vokkit'
import { NetworkManager } from '../NetworkManager'

export interface ChatData {
  message: string
}

export class ChatHandler extends SocketHandler {
  onConnection (socket: SocketIO.Socket) {
    socket.on('chat', (data: ChatData) => this.onChat(socket, data))
  }

  onChat (socket: SocketIO.Socket, data: ChatData) {
    const player = Vokkit.getServer().getPlayerBySocket(socket)
    if (!player) {
      // Error: player sent chat without login
      // Todo: check and ban ip
      return
    }
    NetworkManager.getSocket().emit('chat', {
      message: Vokkit.getServer().getLanguageFormatter().format('chat_format', { sender: player.getName(), message: data.message })
    })
  }
}
