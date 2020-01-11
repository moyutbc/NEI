import { IssueStatus, Project, Tracker, User } from '~/models'
import { LocalStore } from '~/utilities/local-store'

/**
 * ProjectやIssueStatusなどユーザーが定義したカスタム情報を管理するクラス
 */
export class Resource {
  public static get(resourceName: string): Array<any> {
    const resources = LocalStore.get('resources')
    return resources && resources[resourceName] ? resources[resourceName] : []
  }

  /**
   * 最新の情報を取得しキャッシュする。
   */
  public static async pull() {
    const issueStatuses = await IssueStatus.all()
    const projects = await Project.all()
    const trackers = await Tracker.all()
    const users = await User.all()

    const now = new Date().toLocaleString()
    const resources = {
      updatedAt: now,
      Project: projects,
      Tracker: trackers,
      IssueStatus: issueStatuses,
      User: users
    }

    LocalStore.set('resources', resources)
  }
}
