import { Redmine } from '~/gateways/redmine'

export abstract class Orm {
  private static redmine: Redmine
  private static format = 'json'

  private static pluralize(noun: string) {
    if ([/s$/, /x$/, /z$/, /sh$/, /ch$/].some((regex) => regex.test(noun))) {
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

  private static getResourcesName() {
    return this.pluralize(this.getResourceName())
  }

  private static getResourcesPath(id?: number): string {
    return id
           ? `/${this.getResourcesName()}/${id}.${this.format}`
           : `/${this.getResourcesName()}.${this.format}`
  }

  static async find(id: number, params = {}) {
    if (!this.redmine) {
      this.redmine = Redmine.instance
    }

    const url = this.getResourcesPath(id)

    const res = await this.redmine.get(url, params)

    return new this(res[this.getResourceName()])
  }
}
