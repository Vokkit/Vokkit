import 'allocator/tlsf'
// @ts-ignore
export { memory }

let chunk: Uint32Array

function getBlock (x: u8, y: u8, z: u8): u32 {
  return chunk[x * 4096 + z * 256 + y]
}

function blockToFace (blockData: Uint32Array) {

}

export function optimize (data: Uint32Array) {
  chunk = data
  const vertices = new Int32Array(data.length * 4)
  const faces = new Int32Array(data.length)
  // x축방향 Face 최적화
  for (let x: u8 = 0; x < 16; x++) {
    const blockDataFront = new Uint32Array(4096) // 앞면 (x+방향)
    const blockDataBack = new Uint32Array(4096) // 뒷면 (x-방향)
    for (let z: u8 = 0; z < 16; z++) {
      for (let y: u8 = 0; y < 256; y++) {
        const now = getBlock(x, y, z)
        const front = getBlock(x + 1, y, z)
        const back = getBlock(x + 1, y, z)
        if (x === 15 || (front !== 0 && front !== now)) { // 안보이는 면 지움.
          blockDataFront[z * 256 + y] = 0
        } else {
          blockDataFront[z * 256 + y] = now
        }
        if (x === 0 || (back !== 0 && back !== now)) { // 안보이는 면 지움.
          blockDataBack[z * 256 + y] = 0
        } else {
          blockDataBack[z * 256 + y] = now
        }
      }
    }
    // 한 층 한 층 나눠서 돌리고 저장
    const faceDataFront = blockToFace(blockDataFront)
    const faceDataBack = blockToFace(blockDataBack)
    // TODO: blockToFace 함수 작성, FaceToData 함수 작성 및 적용
  }
  // y축방향 Face 최적화
  for (let y: u8 = 0; y < 256; y++) {
    const blockDataFront = new Uint32Array(256) // 앞면 (y+방향)
    const blockDataBack = new Uint32Array(256) // 뒷면 (y-방향)
    for (let z: u8 = 0; z < 16; z++) {
      for (let x: u8 = 0; x < 16; x++) {
        const now = getBlock(x, y, z)
        const front = getBlock(x + 1, y, z)
        const back = getBlock(x + 1, y, z)
        if (x === 15 || (front !== 0 && front !== now)) { // 안보이는 면 지움.
          blockDataFront[x * 16 + z] = 0
        } else {
          blockDataFront[x * 16 + z] = now
        }
        if (x === 0 || (back !== 0 && back !== now)) { // 안보이는 면 지움.
          blockDataBack[x * 16 + z] = 0
        } else {
          blockDataBack[x * 16 + z] = now
        }
      }
    }
    // 한 층 한 층 나눠서 돌리고 저장
    const faceDataFront = blockToFace(blockDataFront)
    const faceDataBack = blockToFace(blockDataBack)
    // TODO: blockToFace 함수 작성, FaceToData 함수 작성 및 적용
  }
  // z축방향 Face 최적화
  for (let z: u8 = 0; z < 16; z++) {
    const blockDataFront = new Uint32Array(4096) // 앞면 (z+방향)
    const blockDataBack = new Uint32Array(4096) // 뒷면 (z-방향)
    for (let y: u8 = 0; y < 256; y++) {
      for (let x: u8 = 0; x < 16; x++) {
        const now = getBlock(x, y, z)
        const front = getBlock(x + 1, y, z)
        const back = getBlock(x + 1, y, z)
        if (x === 15 || (front !== 0 && front !== now)) { // 안보이는 면 지움.
          blockDataFront[x * 256 + y] = 0
        } else {
          blockDataFront[x * 256 + y] = now
        }
        if (x === 0 || (back !== 0 && back !== now)) { // 안보이는 면 지움.
          blockDataBack[x * 256 + y] = 0
        } else {
          blockDataBack[x * 256 + y] = now
        }
      }
    }
    // 한 층 한 층 나눠서 돌리고 저장
    const faceDataFront = blockToFace(blockDataFront)
    const faceDataBack = blockToFace(blockDataBack)
    // TODO: blockToFace 함수 작성, FaceToData 함수 작성 및 적용
  }
}
