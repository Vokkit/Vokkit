import { WorldReader } from './format/WorldFormat'
import { World } from './World'

export class WorldLoader {
  static load (worldDirectory: string, reader: typeof WorldReader) {
    const worldData = reader.read(worldDirectory)
    const world = new World()
    world.setBlockData(worldData)
    return world
  }
}
