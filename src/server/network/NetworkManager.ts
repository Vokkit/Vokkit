import { SocketHandler } from './handlers/SocketHandler'
import { Logger } from '../utils/Logger'
import { Vokkit } from '../Vokkit'

import { BlockHandler } from './handlers/BlockHandler'
import { ChatHandler } from './handlers/ChatHandler'
import { ChunkHandler } from './handlers/ChunkHandler'
import { MoveHandler } from './handlers/MoveHandler'
import { PlayerHandler } from './handlers/PlayerHandler'

import express from 'express'
import http from 'http'
import SocketIO from 'socket.io'

export class NetworkManager {
  private static app: Express.Application
  private static server: http.Server
  private static io: SocketIO.Server
  private static handlers: SocketHandler[]

  static openServer (port: number) {
    this.app = express()
    this.server = http.createServer(this.app)
    this.io = SocketIO(this.server)

    // TODO: add default handlers
    this.handlers = []
    this.addSocketHandler(new BlockHandler())
    this.addSocketHandler(new ChatHandler())
    this.addSocketHandler(new ChunkHandler())
    this.addSocketHandler(new MoveHandler())
    this.addSocketHandler(new PlayerHandler())

    this.io.on('connection', (socket) => this.onConnection(socket))

    this.server.listen(port)
  }

  static onConnection (socket: SocketIO.Socket) {
    this.handlers.forEach((handler) => {
      try {
        handler.onConnection(socket)
      } catch (error) {
        Logger.error(Vokkit.getServer().getLanguageFormatter().format('network_handler_error', { name: handler.constructor.name, error: error }))
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
    return this.io
  }
}
