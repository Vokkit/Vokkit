import { LanguageFormatter } from './language/LanguageFormatter'
import { ServerProperties } from './property/ServerProperties'
import { ServerPropertyLoader } from './property/ServerPropertyLoader'
import { PluginManager } from './plugin/PluginManager'
import { ClientBuilder } from './build/ClientBuilder'
import { Logger } from './utils/Logger'
import { WorldLoader } from './world/WorldLoader'
import { World } from './world/World'
import { Player } from './player/Player'
import { NetworkManager } from './network/NetworkManager'

export class Server {
  private properties: ServerProperties
  private languageFormatter: LanguageFormatter
  private worlds: World[]
  private players: Player[]

  public static version = '1.0.0'

  init () {
    this.properties = ServerPropertyLoader.load()
    this.languageFormatter = new LanguageFormatter(this.properties.language)

    PluginManager.loadPlugins()
    PluginManager.applyServerPlugins()
    PluginManager.applyClientPlugins()
    ClientBuilder.build().then(() => {
      Logger.info(this.languageFormatter.format('client_build_success'))
    }).catch((error) => {
      if (error) Logger.error(this.languageFormatter.format('client_build_error', { error }))
    })

    this.worlds = WorldLoader.loadAllWorlds()
    if (this.worlds.length === 0) {
      Logger.error(this.languageFormatter.format('server_no_world'))
      process.exit()
    }
    Logger.info(this.languageFormatter.format('server_world_loaded', { number: this.worlds.length.toString() }))

    Logger.info(this.languageFormatter.format('server_opening'))
    NetworkManager.openServer(this.properties.port)
    Logger.info(this.languageFormatter.format('server_opened', { port: this.properties.port.toString() }))

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

  getPlayer (name: string) {
    for (const player of this.players) {
      if (player.getName() === name) {
        return player
      }
    }
  }

  getPlayerById (id: string) {
    for (const player of this.players) {
      if (player.getSocket().id === id) {
        return player
      }
    }
  }

  removePlayer (player: Player) {
    this.players.splice(this.players.indexOf(player), 1)
  }

  getWorlds () {
    return this.worlds
  }

  getWorld (name: string) {
    for (const world of this.worlds) {
      if (world.getName() === name) {
        return world
      }
    }
  }

  broadcast (message: string) {
    NetworkManager.getSocket().emit('message', { message })
  }
}
