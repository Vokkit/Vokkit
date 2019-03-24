import { Position } from '../utils/Position'
import { Block } from './World'
import { ChunkPosition } from '../utils/ChunkPosition'

export class Chunk {
  private position: ChunkPosition
  private blockData: Buffer
  private dirty = false

  static maxSize = 262144

  constructor (position: ChunkPosition, blockData = Buffer.alloc(Chunk.maxSize)) {
    this.position = position
    this.blockData = blockData
  }

  getBlock (position: Position, checkPosition = true) {
    if (!checkPosition || position instanceof Position) {
      return this.blockData.readUInt32LE((position.getX() * 4096 + position.getZ() * 256 + position.getY()) * 6)
    }
  }

  setBlock (newBlock: Block, checkPosition = true) {
    if (!checkPosition || newBlock.position instanceof Position) {
      this.blockData.writeUInt32LE((newBlock.position.getX() * 4096 + newBlock.position.getZ() * 256 + newBlock.position.getY()) * 6, newBlock.id)
      this.dirty = true
    }
  }

  getBlockData () {
    return this.blockData
  }

  getPosition () {
    return this.position
  }

  isDirty () {
    return this.dirty
  }

  setDirty (dirty: boolean) {
    this.dirty = dirty
  }

  checkPosition (position: ChunkPosition | Position) {
    return position.getX() >= this.position.getX() && position.getX() < this.position.getX()+ 16 && position.getZ() >= this.position.getZ() && position.getZ() < this.position.getZ() + 16
  }

  getBlockAmount () {
    let amount = 0
    for (const id of this.blockData) if (id !== 0) amount++
    return amount
  }
}
