export class ChunkPositionObject {
  x: number
  z: number
}

export class ChunkPosition {
  private x: number
  private z: number

  constructor (x: number, z: number) {
    this.x = x
    this.z = z
  }

  getX () {
    return this.x
  }

  getZ () {
    return this.z
  }

  setX (x: number) {
    this.x = x
  }

  setZ (z: number) {
    this.z = z
  }

  set (x: number, z: number) {
    this.x = x
    this.z = z
  }

  toObject (): ChunkPositionObject {
    return { x: this.x, z: this.z }
  }

  static fromObject (object: ChunkPositionObject) {
    return new ChunkPosition(object.x, object.z)
  }
}
