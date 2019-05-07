import 'allocator/arena'
// @ts-ignore
export { memory }

let chunk: Uint32Array = new Uint32Array(65536)
let vertices: Uint32Array = new Uint32Array(65536 * 12)
let faces: Uint32Array = new Uint32Array(65536 * 6)
let verticeIndex: i32
let faceIndex: i32

function getBlock (x: u32, y: u32, z: u32): u32 {
  return chunk[(x << 12) + (z << 8) + y]
}

export function mergeFace (faceData: Uint32Array, width: u32, height: u32, rotType: u8, depth: u32): void {
  let startX: u32 = 0
  let startY: u32 = 0
  let searchX: u32 = 0
  let searchY: u32 = 0
  let id: u32 = 0
  let exist = false
  let xRot = rotType >> 2 & 1
  let yRot = rotType >> 1 & 1
  let zRot = rotType >> 0 & 1
  while (true) {
    exist = false
    for (let i: i32 = startX + startY * width; i < faceData.length; i++) {
      if (faceData[i] !== 0) {
        id = faceData[i]
        startY = i / width | 0 // Force Integer
        startX = i - startY * width
        exist = true
        break
      }
    }
    if (!exist) break
    let nowHeight = startY * width
    for (searchX = startX; searchX < width; searchX++) {
      if (faceData[nowHeight + searchX] !== id) break
    }
    searchX--
    let found = false
    for (searchY = startY; searchY < height; searchY++) {
      for (let x: u32 = startX; x <= searchX; x++) {
        if (faceData[searchY * width + x] !== id) {
          found = true
          break
        }
      }
      if (found) break
    }
    searchY--
    if (xRot === 1) {
      vertices[verticeIndex] = startX
      vertices[verticeIndex + 3] = searchX
      vertices[verticeIndex + 6] = searchX
      vertices[verticeIndex + 9] = startX
    } else {
      vertices[verticeIndex] = depth
      vertices[verticeIndex + 3] = depth
      vertices[verticeIndex + 6] = depth
      vertices[verticeIndex + 9] = depth
    }
    if (yRot === 1) {
      if (xRot === 0) {
        vertices[verticeIndex + 1] = startX
        vertices[verticeIndex + 4] = searchX
        vertices[verticeIndex + 7] = searchX
        vertices[verticeIndex + 10] = startX
      } else {
        vertices[verticeIndex + 1] = startY
        vertices[verticeIndex + 4] = startY
        vertices[verticeIndex + 7] = searchY
        vertices[verticeIndex + 10] = searchY
      }
    } else {
      vertices[verticeIndex + 1] = depth
      vertices[verticeIndex + 4] = depth
      vertices[verticeIndex + 7] = depth
      vertices[verticeIndex + 10] = depth
    }
    if (zRot === 1) {
      vertices[verticeIndex + 2] = startY
      vertices[verticeIndex + 5] = startY
      vertices[verticeIndex + 8] = searchY
      vertices[verticeIndex + 11] = searchY
    } else {
      vertices[verticeIndex + 2] = depth
      vertices[verticeIndex + 5] = depth
      vertices[verticeIndex + 8] = depth
      vertices[verticeIndex + 11] = depth
    }

    let faceVerticeIndex = verticeIndex / 3
    faces[faceIndex] = faceVerticeIndex
    faces[faceIndex + 1] = faceVerticeIndex + 1
    faces[faceIndex + 2] = faceVerticeIndex + 2
    faces[faceIndex + 3] = faceVerticeIndex
    faces[faceIndex + 4] = faceVerticeIndex + 2
    faces[faceIndex + 5] = faceVerticeIndex + 3
    for (let x: u32 = startX; x <= searchX; x++) {
      for (let y: u32 = startY; y <= searchY; y++) {
        faceData[y * width + x] = 0
      }
    }
    verticeIndex += 12
    faceIndex += 6
  }
}

export function optimize (data: Uint32Array): void {
  chunk = data
  vertices.fill(0)
  faces.fill(0)
  verticeIndex = 0
  faceIndex = 0
  for (let x: u32 = 0; x <= 15; x++) {
    let frontFace = new Uint32Array(4096)
    let backFace = new Uint32Array(4096)
    for (let y: u32 = 0; y <= 255; y++) {
      for (let z: u32 = 0; z <= 15; z++) {
        let block = getBlock(x, y, z)
        let frontBlock = x === 15 ? 0 : getBlock(x + 1, y, z)
        if (frontBlock === 0) {
          frontFace[(z << 8) + y] = block
        }
        let backBlock = x === 0 ? 0 : getBlock(x - 1, y, z)
        if (backBlock === 0) {
          backFace[(z << 8) + y] = block
        }
      }
    }
    mergeFace(frontFace, 256, 16, 0b011, x)
    mergeFace(backFace, 256, 16, 0b011, x)
  }
  for (let y: u32 = 0; y <= 255; y++) {
    let frontFace = new Uint32Array(256)
    let backFace = new Uint32Array(256)
    for (let z: u32 = 0; z <= 15; z++) {
      for (let x: u32 = 0; x <= 15; x++) {
        let block = getBlock(x, y, z)
        let frontBlock = y === 255 ? 0 : getBlock(x, y + 1, z)
        if (frontBlock === 0) {
          frontFace[(x << 4) + z] = block
        }
        let backBlock = y === 0 ? 0 : getBlock(x, y - 1, z)
        if (backBlock === 0) {
          backFace[(x << 4) + z] = block
        }
      }
    }
    mergeFace(frontFace, 16, 16, 0b101, y)
    mergeFace(backFace, 16, 16, 0b101, y)
  }
  for (let z: u32 = 0; z <= 15; z++) {
    let frontFace = new Uint32Array(4096)
    let backFace = new Uint32Array(4096)
    for (let y: u32 = 0; y <= 255; y++) {
      for (let x: u32 = 0; x <= 15; x++) {
        let block = getBlock(x, y, z)
        let frontBlock = z === 15 ? 0 : getBlock(x, y, z + 1)
        if (frontBlock === 0) {
          frontFace[(x << 8) + y] = block
        }
        let backBlock = z === 0 ? 0 : getBlock(x, y, z - 1)
        if (backBlock === 0) {
          backFace[(x << 8) + y] = block
        }
      }
    }
    mergeFace(frontFace, 16, 256, 0b110, z)
    mergeFace(backFace, 16, 256, 0b110, z)
  }
}

export function getVertices (): Uint32Array {
  return vertices.subarray(0, verticeIndex)
}

export function getFaces (): Uint32Array {
  return faces.subarray(0, faceIndex)
}
