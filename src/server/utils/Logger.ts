import { ConsoleColor } from './ConsoleColor'

import readline from 'readline'

export class Logger {
  private static clear () {
    readline.clearLine(process.stdout, 0)
    readline.cursorTo(process.stdout, 0)
  }

  private static getTimeString () {
    return `${ConsoleColor.Bright}${ConsoleColor.FgCyan}${new Date().toISOString()}`
  }

  private static log (message: any, color: string, prefix: string) {
    process.stdout.write(`${this.getTimeString()}${color} [${prefix}] ${message}\x1b[0m\n> `)
  }

  static info (message: any) {
    this.clear()
    this.log(message, ConsoleColor.FgWhite, 'INFO')
  }

  static warn (message: any) {
    this.clear()
    this.log(message, ConsoleColor.FgYellow, 'WARN')
  }

  static error (message: any) {
    this.clear()
    this.log(message, ConsoleColor.FgRed, 'ERROR')
  }
}
