import fs from 'fs'
import path from 'path'
import { LanguageNotFoundError } from './error/LanguageNotFoundError'
import { LanguageData } from './LanguageData'

export class LanguageLoader {
  private static cache: { [languageName: string]: LanguageData } = {}
  static load (languageName: string): LanguageData {
    if (!this.cache[languageName]) {
      this.cache[languageName] = JSON.parse(this.loadFile(path.join(path.resolve(''), `build/server/language/languages/${languageName}.json`)))
    }
    return this.cache[languageName]
  }

  static loadFile (filePath: string) {
    if (!fs.existsSync(filePath)) {
      throw new LanguageNotFoundError(`Cannot find language: ${filePath}`)
    }
    return fs.readFileSync(filePath).toString()
  }

  static appendLanguageData (languageName: string, additionalData: LanguageData) {
    if (!this.cache[languageName]) {
      this.cache[languageName] = JSON.parse(this.loadFile(path.join(path.resolve(''), `build/server/language/languages/${languageName}.json`)))
    }
    Object.assign(this.cache[languageName], additionalData)
  }
}
