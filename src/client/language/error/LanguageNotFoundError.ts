export class LanguageNotFoundError extends Error {
  constructor (reason: string) {
    super(reason)
    Error.captureStackTrace(this, LanguageNotFoundError)
  }
}
