import loader from 'assemblyscript/lib/loader'

interface MesherModule extends loader.ASUtil {
  optimize: (ptr: number) => void
  getVertices: () => Uint32Array
  getFaces: () => Uint32Array
  memory: WebAssembly.Memory
  table: WebAssembly.Table
}

export class MesherBridge {
  static module: MesherModule
  static loadMesher () {
    loader.instantiateStreaming(fetch('/assemblyscript/optimized.wasm'), {
      env: {
        memory: new WebAssembly.Memory({ initial: 256 }),
        table: new WebAssembly.Table({ initial: 0, element: 'anyfunc' }),
        abort: console.log
      }
    }).then((value) => {
      this.module = value as MesherModule
    }).catch((e) => {
      console.error(e)
    })
  }

  static optimize (chunk: Uint32Array) {
    const ptr = this.module.newArray(chunk)
    this.module.optimize(ptr)
    const vertices = this.module.getVertices()
    const faces = this.module.getFaces()
    this.module.memory.reset()
    return { vertices, faces }
  }
}
