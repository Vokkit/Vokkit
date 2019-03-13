import { Client } from './Client'

export class Vokkit {
  static client: Client
  static init () {
    this.client = new Client()
    this.client.init()
  }

  static getClient () {
    return this.client
  }
}

Vokkit.init()
