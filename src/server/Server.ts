import { LanguageFormatter } from './language/LanguageFormatter'
import { ServerProperties } from './property/ServerProperties'
import { ServerPropertyLoader } from './property/ServerPropertyLoader'
import { PluginManager } from './plugin/PluginManager'
import { ClientBuilder } from './build/ClientBuilder'
import { Logger } from './utils/Logger'
import { WorldLoader } from './world/WorldLoader'
import { World } from './world/World'
import { Player } from './player/Player'

export class Server {
  private properties: ServerProperties
  private languageFormatter: LanguageFormatter
  private worlds: World[]
  private players: Player[]

  init () {
    this.properties = ServerPropertyLoader.load()
    this.languageFormatter = new LanguageFormatter(this.properties.language)

    PluginManager.loadPlugins()
    PluginManager.applyServerPlugins()
    PluginManager.applyClientPlugins()
    ClientBuilder.build().catch((error) => {
      if (error) Logger.error(this.languageFormatter.format('client_build_error', { error }))
    })

    this.worlds = WorldLoader.loadAllWorlds()
    if (this.worlds.length === 0) {
      Logger.error(this.languageFormatter.format('server_no_world'))
      process.exit()
    }
    Logger.info(this.languageFormatter.format('server_world_loaded', { number: this.worlds.length.toString() }))

    this.players = []
  }

  getLanguageFormatter () {
    return this.languageFormatter
  }

  getServerProperties () {
    return this.properties
  }

  getPlayers () {
    return this.players
  }

  getWorlds () {
    return this.worlds
  }
}
