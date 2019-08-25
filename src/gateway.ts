import $ = require('jquery');

export class Gateway {
  private static _instance: Gateway
  private static apiKey: string

  private constructor() {}

  public static get instance(): Gateway {
    if (!this._instance) {
      this._instance = new Gateway();
    }

    return this._instance;
  }

  private static async fetchApiKey(): Promise<any> {
    var res = await $.get('/my/api_key')
    return $('#content > div.box > pre', $(res)).first().text();
  }

  private static async _get(url: string, params?: { [s: string]: string }): Promise<any> {
    if (!this.apiKey) {
      this.apiKey = await this.fetchApiKey()
    }

    const paramsWithKey: { [s: string]: string } = params ? params : {}
    paramsWithKey.key = this.apiKey

    return (await $.get(url, paramsWithKey))
  }

  public async get(url: string, params?: { [s: string]: string }): Promise<any> {
    return (await Gateway._get(url, params))
  }
}
