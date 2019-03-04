import { LanguageFormatter } from './language/LanguageFormatter'
import { ServerProperty } from './property/ServerProperty'
import { ServerPropertyLoader } from './property/ServerPropertyLoader'
import { PluginManager } from './plugin/PluginManager'
import { ClientBuilder } from './build/ClientBuilder'
import { Logger } from './utils/Logger'
import { WorldLoader } from './world/WorldLoader'
import { World } from './world/World'

export class Server {
  private property: ServerProperty
  private languageFormatter: LanguageFormatter
  private worlds: World[]

  init () {
    this.property = ServerPropertyLoader.load()
    this.languageFormatter = new LanguageFormatter(this.property.language)
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
  }

  getLanguageFormatter () {
    return this.languageFormatter
  }
}
