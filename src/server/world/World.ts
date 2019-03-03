export interface BlockData {
  x: number,
  y: number,
  z: number,
  id: number
}

export class World {
  private blockData: BlockData[]
  constructor () {
    this.blockData = []
  }

  setBlock (newBlock: BlockData) {
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

  setBlockData (blockData: BlockData[]) {
    this.blockData = blockData
  }
}
