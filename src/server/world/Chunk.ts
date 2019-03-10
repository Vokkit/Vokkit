import { Position } from '../utils/Position'
import { Block } from './World'

export interface ChunkPosition {
  x: number,
  z: number
}

export class Chunk {
  private position: ChunkPosition
  private blockData: Buffer

  static maxSize = 262144

  constructor (position: ChunkPosition, blockData = Buffer.alloc(Chunk.maxSize)) {
    this.position = position
    this.blockData = blockData
  }

  getBlock (position: Position, checkPosition = true) {
    if (!checkPosition || this.isPosition(position)) {
      return this.blockData.readUInt32LE((position.x * 4096 + position.z * 256 + position.y) * 6)
    }
  }

  setBlock (newBlock: Block, checkPosition = true) {
    if (!checkPosition || this.isPosition(newBlock.position)) {
      this.blockData.writeUInt32LE((newBlock.position.x * 4096 + newBlock.position.z * 256 + newBlock.position.y) * 6, newBlock.id)
    }
  }

  getBlockData () {
    return this.blockData
  }

  getPosition () {
    return this.position
  }

  private isPosition (position: any): position is Position {
    if (typeof position.x === 'number' && typeof position.y === 'number' && typeof position.z === 'number') {
      if (position.x >= 0 && position.x < 16 && position.y >= 0 && position.y < 256 && position.z >= 0 && position.z < 16) {
        return true
      }
    }
    return false
  }

  checkPosition (position: Position) {
    return position.x >= this.position.x && position.x < this.position.x + 16 && position.z >= this.position.z && position.z < this.position.z + 16
  }

  getBlockAmount () {
    let amount = 0
    for (const id of this.blockData) if (id !== 0) amount++
    return amount
  }
}
