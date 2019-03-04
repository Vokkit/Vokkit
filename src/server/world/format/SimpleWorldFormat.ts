import { Block, World } from '../World'
import { WorldReader, WorldWriter, WorldFormatChecker } from './WorldFormat'

import fs from 'fs'
import path from 'path'

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

export class SimpleWorldFormatChecker extends WorldFormatChecker {
  static check (worldDirectory: string, checkFiles = false) {
    if (!super.check(worldDirectory, checkFiles)) {
      return false
    }
    if (fs.readFileSync(path.join(worldDirectory, 'format.txt')).toString() === 'SimpleWorldFormat') { // Format Name Check
      if (checkFiles) {
        const dataPath = path.join(worldDirectory, 'data.spw')
        if (!fs.existsSync(dataPath)) { // No Data File
          return false
        }
        const buffer = fs.readFileSync(path.join(worldDirectory, 'data.spw'))
        if (buffer.length % 16 !== 0) { // Check Data (x, y, z, id -> 4 * 4Byte = 16 Byte = 1 Block)
          return false
        }
      }
      return true
    }
    return false
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
    fs.writeFileSync(path.join(worldDirectory, 'format.txt'), 'SimpleWorldFormat')
  }
}
