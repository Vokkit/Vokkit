import { Location } from '../utils/Location'

export class Player {
  private socket: SocketIO.Socket
  private name: string
  private location: Location

  constructor (socket: SocketIO.Socket, name: string, location: Location) {
    this.socket = socket
    this.name = name
    this.location = location
  }

  getName () {
    return this.name
  }

  getSocket () {
    return this.socket
  }

  getLocation () {
    return this.location.clone() // readonly
  }

  teleport () {
    // todo
  }
}
