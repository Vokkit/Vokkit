export class InvalidWorldError extends Error {
  constructor (reason: string) {
    super(reason)
    Error.captureStackTrace(this, InvalidWorldError)
  }
}
