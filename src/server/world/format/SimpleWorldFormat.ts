import fs from 'fs'
import path from 'path'
import { Block, World } from '../World'
import { WorldReader, WorldWriter } from './WorldFormat'

export class SimpleWorldReader extends WorldReader {
  static read (worldDirectory: string) {
    const blockData: Block[] = []
    const buffer = fs.readFileSync(path.join(worldDirectory, 'data.spw')) // (SimPleWorld)
    for (let i = 0; i < buffer.length; i += 16) {
      blockData.push({
        x: buffer.readInt32LE(i),
        y: buffer.readInt32LE(i + 4),
        z: buffer.readInt32LE(i + 8),
        id: buffer.readUInt32LE(i + 12)
      })
    }
    const worldName = fs.readFileSync(path.join(worldDirectory, 'worldName.txt')).toString()
    return new World(worldName, blockData)
  }
}

export class SimpleWorldWriter extends WorldWriter {
  static write (worldDirectory: string, world: World) {
    const blockData = world.getBlockData()
    const buffer = Buffer.alloc(blockData.length * 16)
    blockData.forEach((block, i) => {
      buffer.writeInt32LE(block.x, i)
      buffer.writeInt32LE(block.y, i + 4)
      buffer.writeInt32LE(block.z, i + 8)
      buffer.writeUInt32LE(block.id, i + 12)
    })
    fs.writeFileSync(path.join(worldDirectory, 'data.spw'), buffer)
    fs.writeFileSync(path.join(worldDirectory, 'worldName.txt'), world.getWorldName())
    fs.writeFileSync(path.join(worldDirectory, 'format.txt'), 'SimpleWorldWriter')
  }
}
