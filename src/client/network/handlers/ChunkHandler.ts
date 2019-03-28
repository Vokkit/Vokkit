import { SocketHandler } from './SocketHandler'
import { Chunk } from '../../world/Chunk'
import { Vokkit } from '../../Vokkit'
import { ChunkPosition } from '../../utils/ChunkPosition'

export interface ChunkJSONData {
  position: ChunkPosition
  worldName: string
  blockData: { type: 'Buffer', data: number[] }
}

export class ChunkHandler extends SocketHandler {
  onConnect (socket: SocketIOClient.Socket) {
    socket.on('chunk', (data: ChunkJSONData) => {
      const buffer = Buffer.from(data.blockData.data)
      const receivedChunk = new Chunk(data.position, buffer)
      Vokkit.getClient().getWorld(data.worldName).addChunk(receivedChunk)
    })
  }
}
