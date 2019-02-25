export class LanguageKeyNotFoundError extends Error {
  constructor (reason: string) {
    super(reason)
    Error.captureStackTrace(this, LanguageKeyNotFoundError)
  }
}
