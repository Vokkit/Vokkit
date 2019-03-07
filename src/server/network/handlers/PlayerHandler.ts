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
        // TODO
      }
      const max = Vokkit.getServer().getServerProperties().maximum_name_length
      if (max && data.name.length > max) {
        // TODO
      }
      const isInvalidName = Vokkit.getServer().getPlayers().some((player) => {
        if (player.getName() === data.name) {
          return true
        }
      })
      if (isInvalidName) {
        // TODO
      }
      const player = new Player(socket, data.name)
      Vokkit.getServer().getPlayers().push(player)
    })
  }
}
