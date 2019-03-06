import express from 'express'
import http from 'http'
import SocketIO from 'socket.io'
import { SocketHandler } from './handlers/SocketHandler'
import { Logger } from '../utils/Logger';
import { Vokkit } from '../Vokkit';

export class NetworkManager {
  private static app: Express.Application
  private static server: http.Server
  private static io: SocketIO.Server
  private static handlers: SocketHandler[]

  static openServer () {
    this.app = express()
    this.server = http.createServer(this.app)
    this.io = SocketIO(this.server)

    // TODO: add default handlers

    this.io.on('connection', (socket) => this.onConnection(socket))
  }

  static onConnection (socket: SocketIO.Socket) {
    this.handlers.forEach((handler) => {
      try {
        handler.onConnection(socket)
      } catch (error) {
        Logger.error(Vokkit.getServer().getLanguageFormatter().format('network_error_handler', { name: handler.constructor.name, error: error }))
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
}
