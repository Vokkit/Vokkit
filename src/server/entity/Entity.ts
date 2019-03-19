import { Location } from '../utils/Location'

export class Entity {
  protected location: Location

  constructor (location: Location) {
    this.location = location
  }

  getLocation () {
    return this.location.clone()
  }

  teleport (location: Location) {
    this.location.copy(location)
  }
}
