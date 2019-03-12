import { LanguageNotFoundError } from './error/LanguageNotFoundError'
import { LanguageData } from './LanguageData'

import ko from './languages/ko.json'
import en from './languages/en.json'

export class LanguageLoader {
  private static cache: { [languageName: string]: LanguageData } = { ko, en }

  static load (languageName: string): LanguageData {
    if (!this.cache[languageName]) {
      throw new LanguageNotFoundError(`Cannot find language: ${languageName}`)
    }
    return this.cache[languageName]
  }

  static appendLanguageData (languageName: string, additionalData: LanguageData) {
    if (!this.cache[languageName]) {
      throw new LanguageNotFoundError(`Cannot find language: ${languageName}`)
    }
    Object.assign(this.cache[languageName], additionalData)
  }
}
