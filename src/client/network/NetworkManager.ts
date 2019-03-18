import { SocketHandler } from './handlers/SocketHandler'

import io from 'socket.io-client'
import { Vokkit } from '../Vokkit'
import { PlayerLoginHandler } from './handlers/PlayerLoginHandler'
import { ChunkHandler } from './handlers/ChunkHandler'
import { WorldHandler } from './handlers/WorldHandler'

export class NetworkManager {
  private static socket: SocketIOClient.Socket
  private static handlers: SocketHandler[]

  static connectServer () {
    this.socket = io()
    this.socket.on('connect', () => this.onConnect())

    // TODO: add default handlers
    this.handlers = []
    this.addSocketHandler(new PlayerLoginHandler())
    this.addSocketHandler(new ChunkHandler())
    this.addSocketHandler(new WorldHandler())
  }

  static onConnect () {
    this.handlers.forEach((handler) => {
      try {
        handler.onConnect(this.socket)
      } catch (error) {
        console.error(Vokkit.getClient().getLanguageFormatter().format('network_handler_error', { name: handler.constructor.name, error: error }))
      }
    })
  }

  static addSocketHandler (handler: SocketHandler) {
    if (this.handlers.includes(handler)) return -1
    this.handlers.push(handler)
    return this.handlers.length - 1
  }

  static removeSocketHandler (handler: SocketHandler | number) {
    this.handlers.splice(typeof handler === 'number' ? handler : this.handlers.indexOf(handler), 1)
  }

  static getSocket () {
    return this.socket
  }
}
