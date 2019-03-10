import { Position } from '../utils/Position'
import { Block } from './World'

export interface ChunkPosition {
  x: number,
  z: number
}

export class Chunk {
  private position: ChunkPosition
  private blockData: Buffer

  constructor (position: ChunkPosition, blockData = Buffer.alloc(393216)) {
    this.position = position
    this.blockData = blockData // x 4bit, z 4bit, y 8bit, id 32bit 순서로 한 블럭당 6Byte 사용
  }

  getBlock (position: Position, checkPosition = true) {
    if (!checkPosition || this.isPosition(position)) {
      const index = (position.x * 4096 + position.z * 256 + position.y) * 6
      return this.blockData.readUInt32LE(index + 2)
    }
  }

  setBlock (newBlock: Block, checkPosition = true) {
    if (!checkPosition || this.isPosition(newBlock.position)) {
      const index = (newBlock.position.x * 4096 + newBlock.position.z * 256 + newBlock.position.y) * 6
      this.blockData.writeUInt8(index, newBlock.position.x * 16 + newBlock.position.z)
      this.blockData.writeUInt8(index + 1, newBlock.position.y)
      this.blockData.writeUInt32LE(index + 2, newBlock.id)
    }
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
}
