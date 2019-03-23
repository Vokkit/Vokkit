import { Vokkit } from '../../Vokkit'
import { Screen } from '../Screen'
import { InputBinder } from '../InputBinder'

export class LoginScreen extends Screen {
  constructor () {
    super('LoginScreen', 'stack', new InputBinder())

    this.init()
    this.initInput()
  }

  init () {
    this.dom.innerHTML = (
      '<div id="load" class="background">' +
        '<div id="login" style="position: fixed;">' +
          '<input id="idText" type="text" style="position: absolute; width: 80vw; left: 10vw; top: 2vw; height: 4vw"></input>' +
          '<button id="loginButton" type="button" style="position: absolute; width: 80vw; left: 10vw; top: 8vw; height: 4vw">' + Vokkit.getClient().getLanguageFormatter().format('login_title') + '</button>' +
        '</div>' +
      '</div>'
    )
  }

  initInput () {
    (this.dom.children[0].children[0].children[1] as HTMLButtonElement).addEventListener('click', event => {
      // todo: Vokkit.getClient().getLoginManager().requestLogin(this.dom.children[0].children[0].children[0].value)
    })
  }
}
