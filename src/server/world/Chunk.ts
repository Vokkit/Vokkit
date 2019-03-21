import { Position } from '../utils/Position'
import { Block } from '../block/Block'
import { ChunkPosition } from '../utils/ChunkPosition'

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
      return this.blockData.readUInt32LE((position.getX() * 4096 + position.getZ() * 256 + position.getY()) * 6)
    }
  }

  setBlock (position: Position, block: Block, checkPosition = true) {
    if (!checkPosition || this.isPosition(position)) {
      this.blockData.writeUInt32LE((position.getX() * 4096 + position.getZ() * 256 + position.getY()) * 6, block.getId())
    }
  }

  getBlockData () {
    return this.blockData
  }

  getPosition () {
    return this.position
  }

  private isPosition (position: any): position is Position {
    if (typeof position.getX() === 'number' && typeof position.getY() === 'number' && typeof position.getZ() === 'number') {
      if (position.getX() >= 0 && position.getX() < 16 && position.getY() >= 0 && position.getY() < 256 && position.getZ() >= 0 && position.getZ() < 16) {
        return true
      }
    }
    return false
  }

  checkPosition (position: ChunkPosition) {
    return position.getX() >= this.position.getX() && position.getX() < this.position.getX() + 16 && position.getZ() >= this.position.getZ() && position.getZ() < this.position.getZ() + 16
  }

  getBlockAmount () {
    let amount = 0
    for (const id of this.blockData) if (id !== 0) amount++
    return amount
  }

  toJSON () {
    return {
      position: this.position,
      blockData: this.blockData.toJSON()
    }
  }
}
