import { Location } from '../utils/Location'
import { EntityData } from './EntityData'

export class Entity {
  protected data: EntityData

  constructor (data: EntityData) {
    this.data = data
  }

  getLocation () {
    return this.data.location.clone()
  }

  teleport (location: Location) {
    this.data.location.copy(location)
  }
}
