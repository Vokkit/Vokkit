import { SocketHandler } from './SocketHandler'
import { Vokkit } from '../../Vokkit'
import { NetworkManager } from '../NetworkManager'
import { PositionObject, Position } from '../../utils/Position'

export interface MoveData {
  position: PositionObject
}

export interface PlayerMoveData {
  player: string,
  position: PositionObject
}

export class MoveHandler extends SocketHandler {
  onConnection (socket: SocketIO.Socket) {
    socket.on('move', (data: MoveData) => this.onMove(socket, data))
  }

  onMove (socket: SocketIO.Socket, data: MoveData) {
    const player = Vokkit.getServer().getPlayerById(socket.id)
    if (!player) {
      // Error: player sent chat without login
      // Todo: check and ban ip
      socket.disconnect()
      return
    }
    const position = Position.fromObject(data.position)
    // todo: speed check
    player.getLocation().setPosition(position)
    NetworkManager.getSocket().emit('move', {
      player: player.getId(),
      position: data.position
    })
  }
}
