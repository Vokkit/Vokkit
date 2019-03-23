import { Vokkit } from '../Vokkit'
import { ScreenManager } from './ScreenManager'

declare global {
  interface Document {
    exitPointerLock: () => any
    pointerLockElement: HTMLElement
    mozPointerLockElement: HTMLElement
  }

  interface HTMLElement {
    requestPointerLock: () => any
  }
}

class InputManager {
  showCursor () {
    document.exitPointerLock()
  }

  dismissCursor () {
    document.body.requestPointerLock()
  }

  setInput () {
    function onMouseMove (e) {
      ScreenManager.getNowScreen().getInputBinder().mouseMoveListener(e)
    }

    function onMouseDown (e) {
      ScreenManager.getNowScreen().getInputBinder().mouseDownListener(e)
    }

    function onMouseUp (e) {
      ScreenManager.getNowScreen().getInputBinder().mouseUpListener(e)
    }

    function onMouseWheel (e) {
      ScreenManager.getNowScreen().getInputBinder().mouseWheelListener(e)
    }

    function onKeyDown (e) {
      ScreenManager.getNowScreen().getInputBinder().keyDownListener(e)
    }

    function onKeyUp (e) {
      ScreenManager.getNowScreen().getInputBinder().keyUpListener(e)
    }

    function onPointerLockChange (event) {
      if (document.pointerLockElement !== null && document.mozPointerLockElement !== null) {
        document.onmousemove = onMouseMove
        document.onmousedown = onMouseDown
        document.onmouseup = onMouseUp
        document.onwheel = onMouseWheel
        document.onkeydown = onKeyDown
        document.onkeyup = onKeyUp

        ScreenManager.getNowScreen().getInputBinder().pointerLockListener()
      } else if (ScreenManager.getNowScreen().getInputBinder().disableCursor) {
        document.onmousemove = null
        document.onmousedown = null
        document.onmouseup = null
        document.onwheel = null
        document.onkeydown = null
        document.onkeyup = null

        ScreenManager.getNowScreen().getInputBinder().pointerUnlockListener()
      }
    }

    document.addEventListener('pointerlockchange', onPointerLockChange, false)
    document.addEventListener('mozpointerlockchange', onPointerLockChange, false)

    document.addEventListener('contextmenu', (e) => {
      e.preventDefault()
    })
  }
}

module.exports = InputManager
