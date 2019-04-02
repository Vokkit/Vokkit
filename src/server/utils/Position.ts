import { ChunkPosition } from './ChunkPosition'

export class PositionObject {
  x: number
  y: number
  z: number
}

export class Position {
  private x: number
  private y: number
  private z: number

  constructor (x: number, y: number, z: number) {
    this.x = x
    this.y = y
    this.z = z
  }

  getX () {
    return this.x
  }

  getY () {
    return this.y
  }

  getZ () {
    return this.z
  }

  setX (x: number) {
    this.x = x
  }

  setY (y: number) {
    this.y = y
  }

  setZ (z: number) {
    this.z = z
  }

  set (x: number, y: number, z: number) {
    this.x = x
    this.y = y
    this.z = z
  }

  toChunkPosition () {
    return new ChunkPosition(this.x, this.z)
  }

  toObject (): PositionObject {
    return {
      x: this.x,
      y: this.y,
      z: this.z
    }
  }

  static fromObject (object: PositionObject) {
    return new Position(object.x, object.y, object.z)
  }
}
