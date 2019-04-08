import { LocationObject, Location } from '../utils/Location'
import { Entity } from '../entity/Entity'
import { PlayerData } from './PlayerData'
import { Inventory, InventoryObject } from '../inventory/Inventory'

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

  getId () {
    return this.data.id
  }

  getInventory () {
    return this.data.inventory
  }

  toObject (): PlayerObject {
    return {
      id: this.data.id,
      name: this.data.name,
      location: this.data.location.toObject(),
      inventory: this.data.inventory.toObject()
    }
  }

  static fromObject (object: PlayerObject) {
    return new Player({
      id: object.id,
      name: object.name,
      location: Location.fromObject(object.location),
      inventory: Inventory.fromObject(object.inventory)
    })
  }
}
