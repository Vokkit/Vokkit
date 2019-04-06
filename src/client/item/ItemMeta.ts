export interface ItemMetaObject {
  lore: string[]
  displayName: string
}

export class ItemMeta {
  private lore: string[]
  private displayName: string

  constructor (lore: string[] = [], displayName: string = null) {
    this.lore = lore
    this.displayName = displayName
  }

  getLore () {
    return this.lore
  }

  setLore (lore: string[]) {
    this.lore = lore
  }

  getDisplayName () {
    return this.displayName
  }

  setDisplayName (displayName: string) {
    this.displayName = displayName
  }

  equals (itemMeta: any) {
    return itemMeta instanceof ItemMeta && this.loreEquals(itemMeta.getLore()) && this.getDisplayName() === itemMeta.getDisplayName()
  }

  private loreEquals (lore: string[]) {
    if (lore.length !== this.lore.length) return false
    return !lore.some((line, index) => line !== this.lore[index])
  }

  toObject () {
    return {
      lore: this.lore,
      displayName: this.displayName
    }
  }

  static fromObject (object: ItemMetaObject) {
    return new ItemMeta(object.lore, object.displayName)
  }
}
