import { World } from '../world/World'

export class LocationObject {
  world: string
  x: number
  y: number
  z: number
}

export class Location {
  private world: World
  private x: number
  private y: number
  private z: number

  constructor (world: World, x = 0, y = 0, z = 0) {
    this.world = world
    this.x = x
    this.y = y
    this.z = z
  }

  getWorld () {
    return this.world
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

  setWorld (world: World) {
    this.world = world
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

  clone () {
    return new Location(this.world, this.x, this.y, this.z)
  }

  copy (location: Location) {
    this.world = location.getWorld()
    this.x = location.getX()
    this.y = location.getY()
    this.z = location.getZ()
  }

  toObject (): LocationObject {
    return { world: this.world.getName(), x: this.x, y: this.y, z: this.z }
  }
}
