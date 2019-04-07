import { EntityData } from '../entity/EntityData'
import { Location } from '../utils/Location'
import { Inventory } from '../inventory/Inventory'

export interface PlayerData extends EntityData {
  location: Location
  name: string
  socket: SocketIO.Socket
  inventory: Inventory
}
