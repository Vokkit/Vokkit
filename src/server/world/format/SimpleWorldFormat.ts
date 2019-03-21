import { World } from '../World'
import { WorldReader, WorldWriter, WorldFormatChecker } from './WorldFormat'
import { Chunk } from '../Chunk'
import { Position } from '../../utils/Position'
import { ChunkPosition } from '../../utils/ChunkPosition'
import { Block } from '../../block/Block'

import fs from 'fs'
import path from 'path'

export class SimpleWorldReader extends WorldReader {
  static read (worldDirectory: string) {
    const chunks: Chunk[] = []
    const buffer = fs.readFileSync(path.join(worldDirectory, 'data.spw')) // (SimPleWorld)
    let index = 0
    while (true) {
      const chunkSize = buffer.readUInt32LE(index) * 6
      const chunkPosition = new ChunkPosition(buffer.readInt32LE(index + 4) * 16, buffer.readInt32LE(index + 8) * 16)
      const chunk = new Chunk(chunkPosition)
      for (let i = 0; i < chunkSize; i += 6) {
        const xz = buffer.readUInt8(index + i + 12)
        chunk.setBlock(new Position(xz >> 4, buffer.readUInt8(index + i + 13), xz % 16), new Block(buffer.readUInt32LE(index + i + 14)), false)
      }
      chunks.push(chunk)
      index += chunkSize + 12
      if (index >= buffer.length) break
    }
    const worldName = fs.readFileSync(path.join(worldDirectory, 'worldName.txt')).toString()
    return new World(worldName, chunks)
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
        // todo
      }
      return true
    }
    return false
  }
}

export class SimpleWorldWriter extends WorldWriter {
  static write (worldDirectory: string, world: World) {
    const chunks = world.getChunks()

    let size = 0
    chunks.forEach((chunk) => size += chunk.getBlockAmount() * 6 + 12)
    const buffer = Buffer.alloc(size)

    let index = 0
    chunks.forEach((chunk) => {
      const chunkSize = chunk.getBlockAmount()
      buffer.writeUInt32LE(index, chunkSize)
      buffer.writeInt32LE(index + 4, chunk.getPosition().getX() / 16)
      buffer.writeInt32LE(index + 8, chunk.getPosition().getZ() / 16)
      const blockData = chunk.getBlockData()
      for (let i = 0; i < blockData.length; i += 6) {
        const xz = i >> 8
        const y = i % 256
        buffer.writeUInt8(index + i + 12, xz)
        buffer.writeUInt8(index + i + 13, y)
        buffer.writeUInt32LE(index + i + 14, blockData.readUInt8(i))
      }
      index += chunkSize + 12
    })

    fs.writeFileSync(path.join(worldDirectory, 'data.spw'), buffer)
    fs.writeFileSync(path.join(worldDirectory, 'worldName.txt'), world.getName())
    fs.writeFileSync(path.join(worldDirectory, 'format.txt'), 'SimpleWorldFormat')
  }
}
