import { LanguageFormatter } from './language/LanguageFormatter'
import { ServerProperty } from './property/ServerProperty'
import { ServerPropertyLoader } from './property/ServerPropertyLoader'
import { PluginManager } from './plugin/PluginManager'
import { ClientBuilder } from './build/ClientBuilder'
import { Logger } from './utils/Logger'

export class Server {
  private property: ServerProperty
  private languageFormatter: LanguageFormatter
  init () {
    this.property = ServerPropertyLoader.load()
    this.languageFormatter = new LanguageFormatter(this.property.language)
    PluginManager.loadPlugins()
    PluginManager.applyServerPlugins()
    PluginManager.applyClientPlugins()
    ClientBuilder.build().catch((error) => {
      if (error) Logger.error(this.languageFormatter.format('client_build_error', { error }))
    })
  }

  getLanguageFormatter () {
    return this.languageFormatter
  }
}
