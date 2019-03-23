import { ScreenProvider } from './ScreenProvider'
import { ScreenChooser } from './ScreenChooser'

import { LoginScreen } from './screens/LoginScreen'

export class ScreenManager {
  private static screenProvider: ScreenProvider
  private static screenChooser: ScreenChooser

  static init () {
    this.screenProvider = new ScreenProvider()
    this.screenChooser = new ScreenChooser(this.screenProvider)

    // register screens
    this.screenProvider.register(new LoginScreen())
  }

  static getScreen (screenName: string) {
    return this.screenChooser.getScreen(screenName)
  }

  static getNowScreen () {
    return this.screenChooser.getNowScreen()
  }

  static addScreen (screenName: string) {
    this.screenChooser.setScreen(screenName)
  }

  static getScreenProvider () {
    return this.screenProvider
  }

  static getScreenChooser () {
    return this.screenChooser
  }
}
