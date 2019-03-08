export interface Block {
  x: number,
  y: number,
  z: number,
  id: number
}

export class World {
  private name: string
  private blockData: Block[]

  constructor (name: string, blockData: Block[] = []) {
    this.name = name
    this.blockData = blockData
  }

  getName () {
    return this.name
  }

  setBlock (newBlock: Block) {
    const changed = this.blockData.some((block) => {
      if (block.x === newBlock.x && block.y === newBlock.y && block.z === newBlock.z) {
        block.id = newBlock.id
        return true
      }
    })
    if (!changed) {
      this.blockData.push(newBlock)
    }
  }

  getBlockData () {
    return this.blockData
  }

  setBlockData (blockData: Block[]) {
    this.blockData = blockData
  }
}
