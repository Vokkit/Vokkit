export class InputBinder {
  keyDownListener: (event: KeyboardEvent) => any
  keyUpListener: (event: KeyboardEvent) => any

  mouseDownListener: (event: MouseEvent) => any
  mouseUpListener: (event: MouseEvent) => any
  mouseMoveListener: (event: MouseEvent) => any
  mouseWheelListener: (event: MouseEvent) => any

  pointerLockListener: () => any
  pointerUnlockListener: () => any

  disableCursor: boolean

  constructor () {
    this.keyDownListener = event => {}
    this.keyUpListener = event => {}

    this.mouseDownListener = event => {}
    this.mouseUpListener = event => {}
    this.mouseMoveListener = event => {}
    this.mouseWheelListener = event => {}

    this.pointerLockListener = () => {}
    this.pointerUnlockListener = () => {}

    this.disableCursor = false
  }

  setKeyDownListener (listener: (event: KeyboardEvent) => any) {
    this.keyDownListener = listener
  }

  setkeyUpListener (listener: (event: KeyboardEvent) => any) {
    this.keyUpListener = listener
  }

  setMouseDownListener (listener: (event: MouseEvent) => any) {
    this.mouseDownListener = listener
  }

  setMouseMoveListener (listener: (event: MouseEvent) => any) {
    this.mouseMoveListener = listener
  }

  setMouseUpListener (listener: (event: MouseEvent) => any) {
    this.mouseUpListener = listener
  }

  setMouseWheelListener (listener: (event: MouseEvent) => any) {
    this.mouseWheelListener = listener
  }

  setPointerLockListener (listener: () => any) {
    this.pointerLockListener = listener
  }

  setPointerUnlockListener (listener: () => any) {
    this.pointerUnlockListener = listener
  }
}
