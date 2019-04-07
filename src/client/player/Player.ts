import { LocationObject } from '../utils/Location'
import { Entity } from '../entity/Entity'
import { PlayerData } from './PlayerData'

export interface PlayerObject {
  id: string,
  name: string,
  location: LocationObject
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
      location: this.data.location.toObject()
    }
  }
}
