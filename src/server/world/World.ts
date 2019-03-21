import { Chunk } from './Chunk'
import { Position } from '../utils/Position'
import { Block } from '../block/Block'
import { ChunkPosition } from '../utils/ChunkPosition'

export class World {
  private name: string
  private chunks: Chunk[]

  constructor (name: string, chunks: Chunk[] = []) {
    this.name = name
    this.chunks = chunks
  }

  getName () {
    return this.name
  }

  setBlock (position: Position, block: Block) {
    for (const chunk of this.chunks) {
      if (chunk.checkPosition(position.toChunkPosition())) {
        chunk.setBlock(position, block)
      }
    }
  }

  getBlock (position: Position) {
    for (const chunk of this.chunks) {
      if (chunk.checkPosition(position.toChunkPosition())) {
        return chunk.getBlock(position)
      }
    }
  }

  getChunk (position: ChunkPosition) {
    for (const chunk of this.chunks) {
      if (chunk.checkPosition(position)) {
        return chunk
      }
    }
  }

  getChunks () {
    return this.chunks
  }
}
