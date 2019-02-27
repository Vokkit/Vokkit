import { LanguageFormatter } from './language/LanguageFormatter'
import { ServerProperty } from './property/ServerProperty'
import { ServerPropertyLoader } from './property/ServerPropertyLoader'
import { PluginManager } from './plugin/PluginManager'

export class Server {
  private property: ServerProperty
  private languageFormatter: LanguageFormatter
  init () {
    this.property = ServerPropertyLoader.load()
    this.languageFormatter = new LanguageFormatter(this.property.language)
    PluginManager.loadPlugins()
    PluginManager.applyServerPlugin(PluginManager.pluginList[0])
  }

  getLanguageFormatter () {
    return this.languageFormatter
  }
}
