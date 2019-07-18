import { Position } from '../utils/Position'
import { ChunkPosition } from '../utils/ChunkPosition'
import { Block } from '../block/Block'
import { MesherBridge } from '../render/MesherBridge'

export class Chunk {
  private position: ChunkPosition
  private blockData: Buffer
  private dirty = false
  private chunkMesh: THREE.Mesh

  static maxSize = 262144

  constructor (position: ChunkPosition, blockData = Buffer.alloc(Chunk.maxSize)) {
    this.position = position
    this.blockData = blockData
    this.chunkMesh = null
  }

  getBlock (position: Position, checkPosition = true) {
    if (!checkPosition || position instanceof Position) {
      return this.blockData.readUInt32LE((position.getX() * 4096 + position.getZ() * 256 + position.getY()) * 6)
    }
  }

  setBlock (position: Position, newBlock: Block, checkPosition = true) {
    if (!checkPosition || position instanceof Position) {
      this.blockData.writeUInt32LE((position.getX() * 4096 + position.getZ() * 256 + position.getY()) * 6, newBlock.getId())
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
    return position.getX() >= this.position.getX() && position.getX() < this.position.getX() + 16 && position.getZ() >= this.position.getZ() && position.getZ() < this.position.getZ() + 16
  }

  getBlockAmount () {
    let amount = 0
    for (const id of this.blockData) if (id !== 0) amount++
    return amount
  }

  toMesh () {
    this.chunkMesh = MesherBridge.toMesh(this.blockData)
    return this.chunkMesh
  }

  getMesh () {
    return this.chunkMesh
  }
}
