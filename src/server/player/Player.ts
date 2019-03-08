import { Location } from '../utils/Location'
import { Entity } from '../entity/Entity'

export class Player extends Entity {
  protected socket: SocketIO.Socket
  protected name: string

  constructor (socket: SocketIO.Socket, name: string, location: Location) {
    super(location)
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
