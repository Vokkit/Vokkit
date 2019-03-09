import { PlayerEvent } from './PlayerEvent'
import { Player } from '../../player/Player'

export class PlayerQuitEvent extends PlayerEvent {
  protected eventName = 'PlayerQuitEvent'
  protected player: Player
  protected silent: boolean

  constructor (player: Player, silent = false) {
    super(player)
    this.silent = silent
  }

  isSilent () {
    return this.silent
  }

  setSilent (silent: boolean) {
    this.silent = silent
  }
}
