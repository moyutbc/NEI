import { Gateway } from './gateway'

export class Issue {
  private static gateway: Gateway

  public static async getChildren(parentId: number): Promise<any> {
    if (!this.gateway) {
      this.gateway = Gateway.instance
    }

    const url = `/issues.json`
    const params = {
      parent_id: parentId + ''
    }

    return (await this.gateway.get(url, params))
  }
}
