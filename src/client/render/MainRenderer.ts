import { World } from '../world/World'
import { MesherBridge } from './MesherBridge'

import THREE from 'three'

export class MainRenderer {
  private static scene: THREE.Scene
  private static camera: THREE.PerspectiveCamera
  private static renderer: THREE.WebGLRenderer

  private static world: World

  static init () {
    this.scene = new THREE.Scene()

    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1)

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    })
  }

  static render () {
    const chunks = this.world.getChunks()
    for (let i = 0; i < chunks.length; i++) {
      if (chunks[i].isDirty()) {
        this.scene.remove(chunks[i].getMesh())
        this.scene.add(chunks[i].toMesh())
      }
    }
    this.renderer.setAnimationLoop(this.render)
  }

  static getScene () {
    return this.scene
  }

  static clearScene () {
    this.scene.children.forEach((object: THREE.Mesh) => {
      if (Array.isArray(object.material)) {
        object.material.forEach((material) => material.dispose())
      } else {
        object.material.dispose()
      }
      object.geometry.dispose()
      this.scene.remove(object)
    })
  }

  static getCamera () {
    return this.camera
  }

  static getRenderer () {
    return this.renderer
  }

  static getWorld () {
    return this.world
  }

  static setWorld (world: World) {
    this.world = world

    this.clearScene()
    const chunks = this.world.getChunks()
    for (let i = 0; i < chunks.length; i++) {
      chunks[i].setDirty(true)
    }
  }
}
