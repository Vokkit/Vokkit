// navigator.userLanguage를 강제로 사용하기 위함
declare global {
  interface Navigator {
    userLanguage: string
  }
}

export class UserLanguageLoader {
  static load () {
    const rawLanguage = navigator.language || navigator.userLanguage
    if (rawLanguage.includes('-')) return rawLanguage.split('-')[0]
    else return rawLanguage
  }
}
