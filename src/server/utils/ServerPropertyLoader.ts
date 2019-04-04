import fs from 'fs'
import path from 'path'
import { ServerProperties } from './ServerProperties'

export class ServerPropertyLoader {
  private static filePath = path.join(path.resolve(''), 'server.properties.json')
  private static defaultProperty: ServerProperties = {
    language: 'en',
    maximum_name_length: 0,
    port: 3000
  }

  static load (): ServerProperties {
    if (!fs.existsSync(this.filePath)) {
      fs.writeFileSync(this.filePath, JSON.stringify(this.defaultProperty))
      return this.defaultProperty
    }
    const properties: ServerProperties = JSON.parse(fs.readFileSync(this.filePath).toString())
    if (!properties.maximum_name_length) properties.maximum_name_length = 0
    if (!properties.port) properties.port = 3000
    return properties
  }
}
