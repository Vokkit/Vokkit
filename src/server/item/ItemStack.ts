import { ItemMeta, ItemMetaObject } from './ItemMeta'

export interface ItemStackObject {
  id: number
  amount: number
  itemMeta: ItemMetaObject
}

export class ItemStack {
  private id: number
  private amount: number
  private itemMeta: ItemMeta

  constructor (id: number, amount: number = 1, itemMeta: ItemMeta = new ItemMeta()) {
    this.id = id
    this.amount = amount
    this.itemMeta = itemMeta
  }

  getId () {
    return this.id
  }

  setId (id: number) {
    this.id = id
  }

  getAmount () {
    return this.amount
  }

  setAmount (amount: number) {
    this.amount = amount
  }

  getItemMeta () {
    return this.itemMeta
  }

  setItemMeta (itemMeta) {
    this.itemMeta = itemMeta
  }

  equals (item: any) {
    return item instanceof ItemStack && item.getAmount() === this.amount && item.getId() === this.id && item.getItemMeta().equals(this.itemMeta)
  }

  toObject (): ItemStackObject {
    return {
      id: this.id,
      amount: this.amount,
      itemMeta: this.itemMeta.toObject()
    }
  }

  static fromObject (object: ItemStackObject) {
    return new ItemStack(object.id, object.amount, ItemMeta.fromObject(object.itemMeta))
  }
}
