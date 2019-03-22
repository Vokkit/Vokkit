import { PlayerEvent } from './PlayerEvent'
import { Player } from '../../player/Player'

export class PlayerChatEvent extends PlayerEvent {
  protected eventName = 'PlayerChatEvent'
  protected player: Player
  protected cancelled: boolean
  protected message: string

  constructor (player: Player, message: string) {
    super(player)
    this.message = message
  }

  isCancelled () {
    return this.cancelled
  }

  getMessage () {
    return this.message
  }

  setCancelled (cancelled: boolean) {
    this.cancelled = cancelled
  }
}
