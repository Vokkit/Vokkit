import { WorldReader } from './format/WorldFormat'
import { World } from './World'

import fs from 'fs'
import path from 'path'
import { SimpleWorldReader, SimpleWorldFormatChecker, SimpleWorldWriter } from './format/SimpleWorldFormat'
import { InvalidWorldError } from './error/InvalidWorldError'
import { Vokkit } from '../Vokkit'
import { InvalidWorldFormatError } from './error/InvalidWorldFormatError'
import { Logger } from '../utils/Logger'

export class WorldLoader {
  static worldDirectory = path.resolve('worlds')

  static loadAllWorlds () {
    const worlds: World[] = []
    const worldPathList = fs.readdirSync(this.worldDirectory)
    worldPathList.forEach((worldPath) => {
      try {
        Logger.info(Vokkit.getServer().getLanguageFormatter().format('world_loading_started', { worldPath }))
        worlds.push(this.load(path.join(this.worldDirectory, worldPath)))
        Logger.info(Vokkit.getServer().getLanguageFormatter().format('world_loaded', { worldPath }))
      } catch (error) {
        Logger.error(Vokkit.getServer().getLanguageFormatter().format('world_error_while_loading', { error }))
      }
    })
    return worlds
  }

  static load (worldDirectory: string) {
    const formatPath = path.join(worldDirectory, 'format.txt')
    if (!fs.existsSync(formatPath)) {
      throw new InvalidWorldError(Vokkit.getServer().getLanguageFormatter().format('world_format_file_not_exist'))
    }
    const { reader } = this.getFormatFromName(fs.readFileSync(formatPath).toString())
    return reader.read(worldDirectory)
  }

  static getFormatFromName (format: string) {
    switch (format) {
      case 'SimpleWorldFormat': {
        return {
          reader: SimpleWorldReader,
          formatChecker: SimpleWorldFormatChecker,
          writer: SimpleWorldWriter
        }
      }
      default: {
        throw new InvalidWorldFormatError(Vokkit.getServer().getLanguageFormatter().format('world_unknown_format_name', { format }))
      }
    }
  }
}
