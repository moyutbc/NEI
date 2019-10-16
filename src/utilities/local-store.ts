export class LocalStore {
  private static KEY = 'momiji'

  /**
   * @param {String} keyStr 'config.issues-page.execute'
   */
  public static get(keyStr: string): void {
    const keys = keyStr.split('.')

    let tmpLocalStorage = JSON.parse(localStorage.getItem(LocalStore.KEY))
    while (keys.length > 0) {
      const key = keys.shift()
      tmpLocalStorage = tmpLocalStorage[key]
    }

    return tmpLocalStorage
  }

  /**
   * @param {String} keyString 'config.issues-page.execute'
   * @param {any} value "'console.log('hello')'"
   */
  public static set(keyStr: string, value: any): any {
    const keys = keyStr.split('.')

    const tmpLocalStorage =
      JSON.parse(localStorage.getItem(LocalStore.KEY)) || {}
    let cursor = tmpLocalStorage
    while (keys.length > 0) {
      const key = keys.shift()
      if (keys.length === 0) {
        cursor[key] = value
        break
      }
      if (!cursor[key]) {
        cursor[key] = {}
      }
      cursor = cursor[key]
    }

    localStorage.setItem(LocalStore.KEY, JSON.stringify(tmpLocalStorage))
  }
}
