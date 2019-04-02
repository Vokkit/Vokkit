import { Location, LocationObject } from '../utils/Location'
import { Entity } from '../entity/Entity'

export interface PlayerObject {
  id: string,
  name: string,
  location: LocationObject
}

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

  getId () {
    return this.socket.id
  }

  toObject (): PlayerObject {
    return {
      id: this.socket.id,
      name: this.name,
      location: this.location.toObject()
    }
  }
}
