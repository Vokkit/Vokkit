import { SocketHandler } from './SocketHandler'
import { Vokkit } from '../../Vokkit'
import { NetworkManager } from '../NetworkManager'
import { LocationObject, Location } from '../../utils/Location'

export interface BlockPlaceData {
  location: LocationObject
  id: number
}

export class BlockHandler extends SocketHandler {
  onConnection (socket: SocketIO.Socket) {
    socket.on('block_place', (data: BlockPlaceData) => this.onBlockPlace(socket, data))
  }

  onBlockPlace (socket: SocketIO.Socket, data: BlockPlaceData) {
    const player = Vokkit.getServer().getPlayerById(socket.id)
    if (!player) {
      // Error: player sent chat without login
      // Todo: check and ban ip
      socket.disconnect()
      return
    }
    // todo: hand range check
    const location = Location.fromObject(data.location)
    if (location.getWorld().getBlock(location.getPosition()) !== 0) {
      // 공기가 아닌 부분에 설치했음
      return
    }
    location.getWorld().setBlock({ position: location.getPosition(), id: data.id })
    NetworkManager.getSocket().emit('set_block', data)
  }
}
