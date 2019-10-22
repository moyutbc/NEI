import { Project, Tracker } from '~/models'
import { LocalStore } from '~/utilities/local-store';

/**
 * ProjectやIssueStatusなどユーザーが定義したカスタム情報を管理するクラス
 */
export class Resource {
  /**
   * 最新の情報を取得しキャッシュする。
   */
  public static async pull() {
    const projects = await Project.all()
    const trackers = await Tracker.all()

    const now = new Date().toLocaleString()
    const resources = {
      updatedAt: now,
      projects: projects,
      trackers: trackers
    }

    LocalStore.set('resources', resources)
  }
}
