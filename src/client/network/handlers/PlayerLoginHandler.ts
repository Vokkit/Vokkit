import { SocketHandler } from './SocketHandler'
import { Vokkit } from '../../Vokkit'

export interface PlayerLoginRequestData {
  name: string
}

export interface PlayerLoginResponseData {
  success: boolean
  reason?: string
}

export class PlayerLoginHandler extends SocketHandler {
  private socket: SocketIOClient.Socket

  onConnect (socket: SocketIOClient.Socket) {
    this.socket = socket
  }

  login (loginData: PlayerLoginRequestData) {
    if (!this.socket) return
    this.socket.emit('login', loginData, (res: PlayerLoginResponseData) => {
      if (res.success) {
        // todo
      } else {
        console.error(Vokkit.getClient().getLanguageFormatter().format(res.reason))
      }
    })
  }
}
