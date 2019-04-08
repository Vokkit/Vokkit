import { LanguageFormatter } from './language/LanguageFormatter'
import { UserLanguageLoader } from './language/UserLanguageLoader'
import { PluginManager } from '../server/plugin/PluginManager'
import { NetworkManager } from './network/NetworkManager'
import { World } from './world/World'
import { ScreenManager } from './ui/ScreenManager'
import { Player } from './player/Player'

export class Client {
  private language: string
  private languageFormatter: LanguageFormatter
  private worlds: World[]
  private players: Player[]

  init () {
    this.language = UserLanguageLoader.load()
    this.languageFormatter = new LanguageFormatter(this.language)

    PluginManager.loadPlugins()

    NetworkManager.connectServer()

    ScreenManager.init()
    ScreenManager.addScreen('LoginScreen')
  }

  getLanguageFormatter () {
    return this.languageFormatter
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

  addWorld (world: World) {
    if (!this.worlds.includes(world)) this.worlds.push(world)
  }

  getPlayers () {
    return this.players
  }

  getPlayer (name: string) {
    for (const player of this.players) {
      if (player.getName() === name) return player
    }
  }

  getPlayerById (id: string) {
    for (const player of this.players) {
      if (player.getId() === id) return player
    }
  }

  addPlayer (player: Player) {
    this.players.push(player)
  }
}
