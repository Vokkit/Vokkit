import { World } from '../World'

import fs from 'fs'
import path from 'path'

export class WorldReader {
  static read (worldDirectory: string): World {
    return null
  }
}

export class WorldFormatChecker {
  static check (worldDirectory: string, checkFiles = false) {
    const formatPath = path.join(worldDirectory, 'format.txt')
    if (!fs.existsSync(formatPath)) {
      // 포맷파일 없음
      return false
    }
    return true
  }
}

export class WorldWriter {
  static write (worldDirectory: string, worldData: World): void {
    return
  }
}
