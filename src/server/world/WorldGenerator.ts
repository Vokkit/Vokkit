import { World } from './World'

export class WorldGenerator {
  width: number
  height: number

  constructor (width = 50, height = 50) {
    this.width = width
    this.height = height
  }

  generate () {
    const promise = new Promise((resolve, reject) => {
      const world = new World('world')
      const time = new Date().getTime()
      const seed = time / (Math.floor(Math.log10(time)) * 10)
      const r1 = Math.random() * 0.5 + 0.75
      const r2 = Math.random() * 0.5 + 0.75

      for (let x = 0; x < this.width; x++) {
        for (let z = 0; z < this.height; z++) {
          let y = Math.floor(this.noise2d(seed * r1 + x, seed * r2 + z) + 50)

          world.setBlock({ position: { x: x, y: y, z: z }, id: 2 })
          world.setBlock({ position: { x: x, y: y - 1, z: z }, id: 3 })
          world.setBlock({ position: { x: x, y: y - 2, z: z }, id: 1 })
          world.setBlock({ position: { x: x, y: y - 3, z: z }, id: 1 })
          world.setBlock({ position: { x: x, y: y - 4, z: z }, id: 1 })
        }
      }

      resolve(world)
    })

    return promise
  }

  n (n: number, f: number, a: number) {
    return Math.sin(n * f) * a
  }

  noise1d (seed: number) {
    let v = 0
    for (let i = 0, j = 0.3; i < 4; i++, j *= 1.7) {
      v += this.n(seed + j, 0.18 * j, 6 / j)
    }

    return v
  }

  noise2d (seed1: number, seed2: number) {
    return (this.noise1d(seed1) + this.noise1d(seed2)) / 2
  }
}
