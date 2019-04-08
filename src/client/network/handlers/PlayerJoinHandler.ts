import { SocketHandler } from './SocketHandler'
import { Vokkit } from '../../Vokkit'
import { PlayerObject, Player } from '../../player/Player'

export interface PlayerJoinData {
  player: PlayerObject
  silent: boolean
}

export class PlayerJoinHandler extends SocketHandler {
  private socket: SocketIOClient.Socket

  onConnect (socket: SocketIOClient.Socket) {
    this.socket = socket
  }

  onPlayerJoin (data: PlayerJoinData) {
    Vokkit.getClient().addPlayer(Player.fromObject(data.player))
    if (!data.silent) {
      // TODO: Send a chat.
    }
  }
}
