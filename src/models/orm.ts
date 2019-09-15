import { Redmine } from '~/gateways/redmine'

export abstract class Orm {
  private static redmine: Redmine
  private static format = 'json'

  private static pluralize(noun: string) {
    if ([/s$/, /x$/, /z$/, /sh$/, /ch$/].some(regex => regex.test(noun))) {
      return `${noun}es`
    }
    if (/[^aiueo]y$/.test(noun)) {
      return `${noun.slice(0, -1)}ies`
    }
    return `${noun}s`
  }

  private static getResourceName() {
    return this.name.toLowerCase()
  }

  public static getResourcesName() {
    return this.pluralize(this.getResourceName())
  }

  private static getResourcesPath(id?: number): string {
    return id
      ? `/${this.getResourcesName()}/${id}.${this.format}`
      : `/${this.getResourcesName()}.${this.format}`
  }

  public static getUrl(id?: number | string): string {
    let url = '/' + this.getResourcesName()
    if (id) {
      url += '/' + id
    }
    return url
  }

  static async get(url: string, params = {}) {
    if (!this.redmine) {
      this.redmine = Redmine.instance
    }
    return await this.redmine.get(url, params)
  }

  static async all(params = {}): Promise<Array<this>> {
    return await this.where(params)
  }

  static async find(id: number, params = {}): Promise<this> {
    const url = this.getResourcesPath(id)
    const res = await this.get(url, params)
    return new this(res[this.getResourceName()])
  }

  static async where(conditions = {}): Promise<Array<this>> {
    const tmpConditions = { limit: 1, offset: 0 }
    Object.keys(conditions).forEach(
      key => (tmpConditions[key] = conditions[key])
    )
    const url = this.getResourcesPath()
    const results = []

    // 1ページ目を取得
    const res = await this.get(url, tmpConditions)
    const tmp = res[this.getResourcesName()].map(elem => new this(elem))
    results.push(...tmp)

    // 2ページ目以降を取得
    const pageCount = Math.ceil(res.total_count / res.limit)
    const pageIndices = Array.from(new Array(pageCount))
      .map((_, i) => i)
      .splice(1)
    const promises = pageIndices.map(i => {
      tmpConditions.offset = i * res.limit
      return this.get(url, tmpConditions)
    })
    const responses = await Promise.all(promises)

    return responses.reduce((arr, res) => {
      const tmp = res[this.getResourcesName()].map(elem => new this(elem))
      return arr.concat(tmp)
    }, results)
  }
}
