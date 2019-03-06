export class Player {
  private socket: SocketIO.Socket
  private name: string

  constructor (socket: SocketIO.Socket, name: string) {
    this.socket = socket
    this.name = name
  }

  getName () {
    return this.name
  }

  getSocket () {
    return this.socket
  }
}
