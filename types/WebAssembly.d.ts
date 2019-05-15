declare namespace WebAssembly {
  class Memory {
    constructor (memoryDescriptor: {initial: number, maximum?: number})
    buffer: ArrayBuffer
    grow(): void
  }

  class Table {
    constructor (memoryDescriptor: {element: "anyfunc", initial: number, maximum?: number})
    length: number
    grow(): void
    get(index: number): any
    set(index: number, element: any): void
  }
}