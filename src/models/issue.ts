import { Redmine } from '~/gateways/redmine'

export class Issue {
  private static redmine: Redmine

  public static async getChildren(parentId: number): Promise<any> {
    if (!this.redmine) {
      this.redmine = Redmine.instance
    }

    const url = `/issues.json`
    const params = {
      parent_id: parentId + ''
    }

    return (await this.redmine.get(url, params))
  }
}
