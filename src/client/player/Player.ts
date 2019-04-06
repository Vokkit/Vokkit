import { Location, LocationObject } from '../utils/Location'
import { Entity } from '../entity/Entity'
import { Inventory } from '../inventory/Inventory'

export interface PlayerObject {
  id: string,
  name: string,
  location: LocationObject
}

export class Player extends Entity {
  protected socket: SocketIO.Socket
  protected name: string
  protected inventory: Inventory

  constructor (socket: SocketIO.Socket, name: string, location: Location, inventory: Inventory) {
    super(location)
    this.socket = socket
    this.name = name
    this.inventory = inventory
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

  getInventory () {
    return this.inventory
  }

  toObject (): PlayerObject {
    return {
      id: this.socket.id,
      name: this.name,
      location: this.location.toObject()
    }
  }
}
