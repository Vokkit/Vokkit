import { LocationObject } from '../utils/Location'
import { Entity } from '../entity/Entity'
import { PlayerData } from './PlayerData'
import { InventoryObject } from '../inventory/Inventory'

export interface PlayerObject {
  id: string,
  name: string,
  location: LocationObject,
  inventory: InventoryObject
}

export class Player extends Entity {
  protected data: PlayerData

  constructor (data: PlayerData) {
    super(data)
  }

  getName () {
    return this.data.name
  }

  getSocket () {
    return this.data.socket
  }

  getId () {
    return this.data.socket.id
  }

  getInventory () {
    return this.data.inventory
  }

  toObject (): PlayerObject {
    return {
      id: this.data.socket.id,
      name: this.data.name,
      location: this.data.location.toObject(),
      inventory: this.data.inventory.toObject()
    }
  }
}
