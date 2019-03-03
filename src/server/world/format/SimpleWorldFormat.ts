import fs from 'fs'
import path from 'path'
import { BlockData } from '../World'
import { WorldReader, WorldWriter } from './WorldFormat'

export class SimpleWorldReader extends WorldReader {
  static read (worldDirectory: string) {
    const worldData: BlockData[] = []
    const buffer = fs.readFileSync(path.join(worldDirectory, 'data.spw')) // (SimPleWorld)
    for (let i = 0; i < buffer.length; i += 16) {
      worldData.push({
        x: buffer.readInt32LE(i),
        y: buffer.readInt32LE(i + 4),
        z: buffer.readInt32LE(i + 8),
        id: buffer.readUInt32LE(i + 12)
      })
    }
    return worldData
  }
}

export class SimpleWorldWriter extends WorldWriter {
  static write (worldDirectory: string, worldData: BlockData[]) {
    const buffer = Buffer.alloc(worldData.length * 16)
    worldData.forEach((block, i) => {
      buffer.writeInt32LE(block.x, i)
      buffer.writeInt32LE(block.y, i + 4)
      buffer.writeInt32LE(block.z, i + 8)
      buffer.writeUInt32LE(block.id, i + 12)
    })
    fs.writeFileSync(path.join(worldDirectory, 'data.spw'), buffer)
  }
}
