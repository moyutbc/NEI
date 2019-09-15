export class Redmine {
  private static _instance: Redmine
  private static apiKey: string

  public static origin(): string {
    return window.location.origin
  }

  public static get instance(): Redmine {
    if (!this._instance) {
      this._instance = new Redmine()
    }

    return this._instance
  }

  private static async fetchApiKey(): Promise<string> {
    const res = await (await fetch('/my/api_key')).text()
    const parser = new DOMParser()
    const dom = parser.parseFromString(res, 'text/html')
    return dom.querySelector('#content > div.box > pre').textContent
  }

  private static async _get(
    url: string,
    params?: { [s: string]: string }
  ): Promise<string> {
    if (!this.apiKey) {
      this.apiKey = await this.fetchApiKey()
    }

    const paramsWithKey: { [s: string]: string } = params ? params : {}
    paramsWithKey.key = this.apiKey

    return await $.get(url, paramsWithKey)
  }

  public async get(
    url: string,
    params?: { [s: string]: string }
  ): Promise<string> {
    return await Redmine._get(url, params)
  }
}
