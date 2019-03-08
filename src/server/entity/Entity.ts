import { Location } from '../utils/Location'

// 8 + 10 + 2 + 5 + 3 + 2 = 30 -> 420점.
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
