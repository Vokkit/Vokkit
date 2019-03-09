import { Player } from '../../player/Player'
import { Event } from '../Event'

export class PlayerEvent extends Event {
  protected player: Player

  constructor (player: Player) {
    super()
    this.player = player
  }

  getPlayer () {
    return this.player
  }
}
