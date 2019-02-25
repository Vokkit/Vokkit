import { Client } from './Client'

export class Vokkit {
  static client: Client
  static init () {
    this.client = new Client()
    this.client.init()
  }
}

Vokkit.init()
