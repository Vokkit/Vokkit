import { SocketHandler } from './SocketHandler'
import { Player } from '../../player/Player'
import { Vokkit } from '../../Vokkit'
import { Location } from '../../utils/Location'
import { PlayerQuitEvent } from '../../event/player/PlayerQuitEvent'
import { Logger } from '../../utils/Logger'
import { NetworkManager } from '../NetworkManager'
import { Server } from '../../Server'
import { PluginManager } from '../../plugin/PluginManager'
import { PlayerJoinEvent } from '../../event/player/PlayerJoinEvent'
import { Inventory } from '../../inventory/Inventory'

export interface PlayerLoginData {
  name: string
}

export class PlayerHandler extends SocketHandler {
  onConnection (socket: SocketIO.Socket) {
    socket.on('login', (data: PlayerLoginData) => this.onLogin(socket, data))
    socket.on('disconnect', () => this.onDisconnect(socket))
  }

  private onLogin (socket: SocketIO.Socket, data: PlayerLoginData) {
    if (data.name.length === 0) {
      socket.emit('login_result', { success: false, reason: 'empty_name' })
      return
    }
    const max = Vokkit.getServer().getServerProperties().maximum_name_length
    if (max && data.name.length > max) {
      socket.emit('login_result', { success: false, reason: 'long_name' })
      return
    }
    const isInvalidName = Vokkit.getServer().getPlayers().some((player) => {
      if (player.getName() === data.name) {
        return true
      }
    })
    if (isInvalidName) {
      socket.emit('login_result', { success: false, reason: 'name_already_exist' })
      return
    }

    const player = new Player(socket, data.name, new Location(Vokkit.getServer().getWorlds()[0]), new Inventory(45)) // todo: spawn location
    Vokkit.getServer().getPlayers().push(player)

    Logger.info(Vokkit.getServer().getLanguageFormatter().format('player_join_message', { name: player.getName() }))
    Logger.setTitle(Vokkit.getServer().getLanguageFormatter().format('server_title', { version: Server.version, onlineUsers: Vokkit.getServer().getPlayers().length.toString() }))

    const event = new PlayerJoinEvent(player)
    PluginManager.callEvent(event)

    socket.emit('login_result', { success: true })
    NetworkManager.getSocket().emit('player_join', { player: player.toObject(), silent: event.isSilent() })
  }

  private onDisconnect (socket: SocketIO.Socket) {
    const player = Vokkit.getServer().getPlayerById(socket.id)
    if (player != null) {
      const event = new PlayerQuitEvent(player)
      PluginManager.callEvent(event)

      Vokkit.getServer().removePlayer(player)

      Logger.info(Vokkit.getServer().getLanguageFormatter().format('player_quit_message', { name: player.getName() }))
      Logger.setTitle(Vokkit.getServer().getLanguageFormatter().format('server_title', { version: Server.version, onlineUsers: Vokkit.getServer().getPlayers().length.toString() }))

      NetworkManager.getSocket().emit('player_quit', { name: player.getName(), silent: event.isSilent() })
    }
  }
}
