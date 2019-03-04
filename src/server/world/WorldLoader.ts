import { WorldReader } from './format/WorldFormat'
import { World } from './World'

export class WorldLoader {
  static load (worldDirectory: string, reader: typeof WorldReader) {
    return reader.read(worldDirectory)
  }
}
