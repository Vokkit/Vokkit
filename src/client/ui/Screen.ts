import { InputBinder } from './InputBinder'

export class Screen {
  protected name: string
  protected type: 'stack' | 'base'
  protected inputBinder: InputBinder
  protected dom: HTMLElement

  constructor (name: string, type: 'stack' | 'base', inputBinder: InputBinder) {
    this.name = name
    this.type = type // base, stack
    this.inputBinder = inputBinder
    this.dom = document.createElement('div')
    this.dom.setAttribute('style', 'position: fixed; top: 0px; left: 0px;')
  }

  getName () {
    return this.name
  }

  getType () {
    return this.type
  }

  getInputBinder () {
    return this.inputBinder
  }

  show () {
    document.body.appendChild(this.dom)
  }

  dismiss () {
    document.body.removeChild(this.dom)
  }
}
