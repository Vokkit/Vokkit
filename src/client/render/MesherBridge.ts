import loader from 'assemblyscript/lib/loader'
import THREE from 'three'

interface MesherModule extends loader.ASUtil {
  optimize: (ptr: number) => void
  getVertices: () => Uint32Array
  getFaces: () => Uint32Array
  memory: any
  table: any
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

  static readonly uvs: THREE.Vector2[][] = [
    [new THREE.Vector2(1, 0), new THREE.Vector2(1, 1), new THREE.Vector2(0, 1)],
    [new THREE.Vector2(1, 0), new THREE.Vector2(0, 1), new THREE.Vector2(0, 0)]
  ]

  static toMesh (chunk: Buffer) {
    const { vertices, faces } = MesherBridge.optimize(new Uint32Array(chunk))
    const geometry = new THREE.Geometry()
    for (let i = 0; i < vertices.length; i += 3) {
      geometry.vertices.push(new THREE.Vector3(vertices[i], vertices[i + 1], vertices[i + 2]))
    }
    for (let i = 0; i < faces.length; i += 5) {
      const face1 = new THREE.Face3(faces[i], faces[i + 1], faces[i + 2])
      const face2 = new THREE.Face3(faces[i], faces[i + 2], faces[i + 3])
      const id = faces[i + 4]
      const normal = face1.normal
      normal.x = Math.round(normal.x)
      normal.y = Math.round(normal.y)
      normal.z = Math.round(normal.z)
      if (normal.x === 1) {
        face1.materialIndex = id * 6
        face2.materialIndex = id * 6
      } else if (normal.x === -1) {
        face1.materialIndex = id * 6 + 1
        face2.materialIndex = id * 6 + 1
      } else if (normal.y === 1) {
        face1.materialIndex = id * 6 + 2
        face2.materialIndex = id * 6 + 2
      } else if (normal.y === -1) {
        face1.materialIndex = id * 6 + 3
        face2.materialIndex = id * 6 + 3
      } else if (normal.z === 1) {
        face1.materialIndex = id * 6 + 4
        face2.materialIndex = id * 6 + 4
      } else if (normal.z === -1) {
        face1.materialIndex = id * 6 + 5
        face2.materialIndex = id * 6 + 5
      }
      geometry.faces.push(face1, face2)
      geometry.faceVertexUvs[0].push(...this.uvs)
    }

    // TODO: material

    const chunkMesh = new THREE.Mesh(geometry)

    return chunkMesh
  }
}
