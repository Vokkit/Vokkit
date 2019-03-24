import { Vokkit } from '../../Vokkit'
import { Screen } from '../Screen'
import { MainRenderer } from '../../render/MainRenderer'

export class LoginScreen extends Screen {
  constructor () {
    super('MainScreen', 'base', null)

    this.init()
  }

  init () {
    MainRenderer.init()

    this.dom = MainRenderer.getRenderer().domElement
  }
}
