import fs from 'fs'
import path from 'path'

export class ServerPropertyLoader {
  private static filePath = path.join(path.resolve(''), 'server.properties.json')
  private static defaultProperty = {
    language: 'en'
  }

  static load () {
    console.log(__dirname, this.filePath)
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify(this.defaultProperty))
      return this.defaultProperty
    }
    return JSON.parse(fs.readFileSync(this.filePath).toString())
  }
}
