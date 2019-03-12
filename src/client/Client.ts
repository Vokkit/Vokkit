import { LanguageFormatter } from './language/LanguageFormatter'
import { UserLanguageLoader } from './language/UserLanguageLoader'

export class Client {
  private language: string
  private languageFormatter: LanguageFormatter

  init () {
    this.language = UserLanguageLoader.load()
    this.languageFormatter = new LanguageFormatter(this.language)
  }

  getLanguageFormatter () {
    return this.languageFormatter
  }
}
