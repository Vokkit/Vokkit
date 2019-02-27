import { Server } from './Server'

export class Vokkit {
  private static server: Server
  static init () {
    this.server = new Server()
    this.server.init()
  }

  static getServer () {
    return this.server
  }
}

Vokkit.init()
