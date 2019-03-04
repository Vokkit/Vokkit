import { WorldReader } from './format/WorldFormat'

export class WorldLoader {
  static load (worldDirectory: string, reader: typeof WorldReader) {
    return reader.read(worldDirectory)
  }
}
