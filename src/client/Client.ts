import { LanguageFormatter } from './language/LanguageFormatter'
import { UserLanguageLoader } from './language/UserLanguageLoader'
import { PluginManager } from '../server/plugin/PluginManager'
import { NetworkManager } from './network/NetworkManager'
import { World } from './world/World'

export class Client {
  private language: string
  private languageFormatter: LanguageFormatter
  private worlds: World[]

  init () {
    this.language = UserLanguageLoader.load()
    this.languageFormatter = new LanguageFormatter(this.language)

    PluginManager.loadPlugins()

    NetworkManager.connectServer()
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
}
