import { Screen } from './Screen'
import { ScreenProvider } from './ScreenProvider'

export class ScreenChooser {
  private screenProvider: ScreenProvider
  private now: Screen
  private lastScreens: Screen[]

  constructor (screenProvider: ScreenProvider) {
    this.now = null
    this.lastScreens = []

    this.screenProvider = screenProvider
  }

  setScreen (screen) {
    screen = this.getScreen(screen)
    screen.show()

    if (this.now !== null && this.now.getType() !== 'base') {
      this.now.dismiss()
    }

    this.lastScreens.push(this.now)
    this.now = screen

    // todo Vokkit.getClient().getInputManager().setInput()
  }

  getScreen (name) {
    for (let screen of this.screenProvider.getAllScreens()) {
      if (screen.getName() === name) {
        return screen
      }
    }

    return null
  }

  popScreen () {
    if (this.now.getType() !== 'base') { this.now.dismiss() }

    this.now = this.lastScreens.pop()
    this.now.show()

    // todo Vokkit.getClient().getInputManager().setInput()
  }

  getNowScreen () {
    return this.now
  }
}
