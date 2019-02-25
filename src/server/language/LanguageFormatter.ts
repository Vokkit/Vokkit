import { LanguageLoader } from './LanguageLoader'
import { LanguageKeyNotFoundError } from './error/LanguageKeyNotFoundError'

export class LanguageFormatter {
  private languageName: string

  constructor (languageName: string) {
    this.languageName = languageName
  }

  format (key: string, args: { [tag: string]: string }) {
    const languageData = LanguageLoader.load(this.languageName)
    if (!languageData[key]) {
      throw new LanguageKeyNotFoundError(`Cannot find language key: ${key} with language ${this.languageName}`)
    }
    let baseString = languageData[key]
    for (const tag in args) {
      baseString = baseString.replace(new RegExp(`\\{${tag}\\}`), args[tag])
    }
    return baseString
  }
}
