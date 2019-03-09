import { PlayerEvent } from './PlayerEvent'
import { Player } from '../../player/Player'

export class PlayerJoinEvent extends PlayerEvent {
  protected eventName = 'PlayerJoinEvent'
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
