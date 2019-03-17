import { Chunk, ChunkPosition } from './Chunk'
import { Position } from '../utils/Position'

export interface Block {
  position: Position
  id: number
}

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

  setBlock (newBlock: Block) {
    for (const chunk of this.chunks) {
      if (chunk.checkPosition(newBlock.position)) {
        chunk.setBlock(newBlock)
      }
    }
  }

  getBlock (position: Position) {
    for (const chunk of this.chunks) {
      if (chunk.checkPosition(position)) {
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

  addChunk (chunk: Chunk) {
    this.chunks.push(chunk)
  }

  removeChunk (chunk: Chunk) {
    this.chunks.splice(this.chunks.indexOf(chunk), 1)
  }

  getChunks () {
    return this.chunks
  }
}
