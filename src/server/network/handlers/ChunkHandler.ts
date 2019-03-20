import { SocketHandler } from './SocketHandler'
import { Vokkit } from '../../Vokkit'
import { ChunkPosition } from '../../world/Chunk'

export interface ChunkData {
  worldName: string,
  position: ChunkPosition
}

export class ChunkHandler extends SocketHandler {
  onConnection (socket: SocketIO.Socket) {
    socket.on('chunk', (data: ChunkData) => this.onChunkLoad(socket, data))
  }

  onChunkLoad (socket: SocketIO.Socket, data: ChunkData) {
    const player = Vokkit.getServer().getPlayerById(socket.id)
    if (!player) {
      // Todo: check and ban ip
      socket.disconnect()
      return
    }
    const world = Vokkit.getServer().getWorld(data.worldName)
    if (!world) {
      socket.emit('chunk', { success: false, reason: 'world_name_not_exist' })
      return
    }
    if (player.getLocation().getWorld() !== world) {
      socket.emit('chunk', { success: false, reason: 'invalid_chunk_request' })
      return
    }
    const chunk = world.getChunk(data.position)
    socket.emit('chunk', { success: true, chunk: chunk.toJSON(), worldName: data.worldName })
  }
}
