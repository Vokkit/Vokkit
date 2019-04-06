import { ItemStack, ItemStackObject } from '../item/ItemStack'

export interface InventoryObject {
  size: number
  contents: ItemStackObject[]
}

export class Inventory {
  private size: number
  private contents: ItemStack[]

  constructor (size: number, contents: ItemStack[] = []) {
    this.size = size
    this.contents = contents
  }

  getContents () {
    return this.contents
  }

  getItem (position: number) {
    return this.contents[position]
  }

  setItem (position: number, item: ItemStack) {
    this.contents[position] = item
  }

  addItem (items: ItemStack) {
    if (items instanceof Array) {
      for (const i in items) {
        if (!this.addItem(items[i])) return false
      }
      return true
    }

    for (const i in this.contents) {
      if (!this.contents[i]) {
        this.contents[i] = items
        return true
      }
    }

    return false
  }

  removeItem (items: ItemStack) {
    if (items instanceof Array) {
      for (const i in items) {
        this.removeItem(items[i])
      }
      return
    }

    for (const i in this.contents) {
      if (this.contents[i].equals(items)) {
        if (this.contents[i].getAmount() < items.getAmount()) {
          items.setAmount(items.getAmount() - this.contents[i].getAmount())
          this.contents[i] = undefined
        } else if (this.contents[i].getAmount() === items.getAmount()) {
          this.contents[i] = undefined
          return
        } else if (this.contents[i].getAmount() > items.getAmount()) {
          this.contents[i].setAmount(this.contents[i].getAmount() - items.getAmount())
          return
        }
      }
    }
  }

  toObject (): InventoryObject {
    const contents = []
    for (let i = 0; i < this.size; i++) {
      if (!this.contents[i]) continue
      else contents[i] = this.contents[i].toObject()
    }
    return {
      size: this.size,
      contents: contents
    }
  }

  static fromObject (object: InventoryObject) {
    const contents = []
    for (let i = 0; i < object.size; i++) {
      if (object.contents[i]) contents[i] = ItemStack.fromObject(object.contents[i])
    }
    return new Inventory(object.size, contents)
  }
}
