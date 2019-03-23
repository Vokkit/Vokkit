import { Screen } from './Screen'

export class ScreenProvider {
  private screens: Screen[]
  constructor () {
    this.screens = []
  }

  register (screen: Screen) {
    this.screens.push(screen)
  }

  unregister (screen: Screen) {
    for (let i = 0; i < this.screens.length; i++) {
      if (this.screens[i].getName() === screen.getName()) {
        this.screens.splice(i, 1)

        return
      }
    }
  }

  getAllScreens () {
    return this.screens
  }
}
