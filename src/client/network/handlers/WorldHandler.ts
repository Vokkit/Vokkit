import { SocketHandler } from './SocketHandler'
import { Vokkit } from '../../Vokkit'
import { World } from '../../world/World'

export interface WorldListJSONData {
  worldList: string[]
}

export class WorldHandler extends SocketHandler {
  onConnect (socket: SocketIOClient.Socket) {
    socket.on('world_list', (data: WorldListJSONData) => {
      data.worldList.forEach((worldName) => {
        Vokkit.getClient().addWorld(new World(worldName))
      })
    })
  }
}
