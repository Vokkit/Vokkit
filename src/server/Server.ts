import { LanguageFormatter } from './language/LanguageFormatter'
import { ServerProperty } from './property/ServerProperty'
import { ServerPropertyLoader } from './property/ServerPropertyLoader'

export class Server {
  private property: ServerProperty
  private languageFormatter: LanguageFormatter
  init () {
    this.property = ServerPropertyLoader.load()
    this.languageFormatter = new LanguageFormatter(this.property.language)
  }
}
