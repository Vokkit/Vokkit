export class InvalidWorldFormatError extends Error {
  constructor (reason: string) {
    super(reason)
    Error.captureStackTrace(this, InvalidWorldFormatError)
  }
}
