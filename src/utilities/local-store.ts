/**
 * LocalStrageを直接操作するクラス。
 */
export class LocalStore {
  private static KEY = 'momiji'

  /**
   * LocalStrageに保存された値のうち、キーに対応する値を返却する。
   * キーを指定しない場合はすべて返却する。
   *
   * @param {String} keyStr 'config.issues-page.execute'
   */
  public static get(keyStr?: string): void {
    let tmpLocalStorage = JSON.parse(localStorage.getItem(LocalStore.KEY)) || {}

    if (!keyStr) {
      return tmpLocalStorage
    }

    const keys = keyStr.split('.')

    while (keys.length > 0) {
      const key = keys.shift()
      if (!tmpLocalStorage[key]) {
        return null
      }
      tmpLocalStorage = tmpLocalStorage[key]
    }

    return tmpLocalStorage
  }

  /**
   * key, valueを指定してLocalStrageに保存する。
   *
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

  /**
   * LocalStrageからkeyを削除する。
   *
   * @param {String} keyString 'config.issues-page.execute'
   */
  public static unset(keyStr: string) {
    const keys = keyStr.split('.')
    const tmpLocalStorage =
      JSON.parse(localStorage.getItem(LocalStore.KEY)) || {}
    let cursor = tmpLocalStorage

    while (keys.length > 1) {
      const key = keys.shift()
      if (!cursor[key]) {
        return
      }
      cursor = cursor[key]
    }

    const key = keys.shift()
    delete cursor[key]

    localStorage.setItem(LocalStore.KEY, JSON.stringify(tmpLocalStorage))
  }
}
