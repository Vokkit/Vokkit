import { SocketHandler } from './SocketHandler'
import { Player } from '../../player/Player';
import { Vokkit } from '../../Vokkit';

export interface PlayerLoginData {
  name: string
}

export class PlayerHandler extends SocketHandler {
  onConnection (socket: SocketIO.Socket) {
    socket.on('login', (data: PlayerLoginData) => {
      if (data.name.length === 0) {
        socket.emit('login_result', { success: false, reason: 'empty_name' })
        return
      }
      const max = Vokkit.getServer().getServerProperties().maximum_name_length
      if (max && data.name.length > max) {
        socket.emit('login_result', { success: false, reason: 'long_name' })
        return
      }
      const isInvalidName = Vokkit.getServer().getPlayers().some((player) => {
        if (player.getName() === data.name) {
          return true
        }
      })
      if (isInvalidName) {
        socket.emit('login_result', { success: false, reason: 'name_already_exist' })
        return
      }
      const player = new Player(socket, data.name)
      Vokkit.getServer().getPlayers().push(player)
      socket.emit('login_result', { success: true })
    })
  }
}
