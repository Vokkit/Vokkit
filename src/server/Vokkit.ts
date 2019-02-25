import { Server } from './Server'

export class Vokkit {
  static server: Server
  static init () {
    this.server = new Server()
    this.server.init()
  }
}

Vokkit.init()
