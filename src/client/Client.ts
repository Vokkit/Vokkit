import { LanguageFormatter } from './language/LanguageFormatter'
import { UserLanguageLoader } from './language/UserLanguageLoader'
import { PluginManager } from '../server/plugin/PluginManager'

export class Client {
  private language: string
  private languageFormatter: LanguageFormatter

  init () {
    this.language = UserLanguageLoader.load()
    this.languageFormatter = new LanguageFormatter(this.language)

    PluginManager.loadPlugins()
  }

  getLanguageFormatter () {
    return this.languageFormatter
  }
}
