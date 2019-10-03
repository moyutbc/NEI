import { Dayjs } from 'dayjs'
import { Project } from '~/models/project'
import { Orm } from '~/models/orm'

export class Issue extends Orm implements FavItem {
  id: number
  project: Project
  tracker: any
  status: any
  priority: any
  author: any
  category: any
  subject: string
  description: string
  start_date: Dayjs
  due_date: Dayjs
  done_ratio: number
  estimated_hours: number
  custom_fields: array<any>
  created_on: Dayjs
  updated_on: Dayjs
  private static redmine: Redmine

  constructor(obj: any) {
    super()
    this.id = obj.id
    this.project = obj.project
    this.tracker = obj.tracker
    this.status = obj.status
    this.priority = obj.priority
    this.author = obj.author
    this.assigned_to = obj.assigned_to || obj.author
    this.category = obj.category
    this.subject = obj.subject
    this.description = obj.description
    this.start_date = obj.start_date
    this.due_date = obj.due_date
    this.done_ratio = obj.done_ratio
    this.estimated_hours = obj.estimated_hours
    this.custom_fields = obj.custom_fields
    this.created_on = obj.created_on
    this.updated_on = obj.updated_on
  }

  public static async where(conditions = {}): Promise<any> {
    // issues must be ordered by id.
    return (await super.where(conditions)).sort((a, b) => a.id - b.id)
  }

  public static async getChildren(parentId: number): Promise<any> {
    return await this.where({ parent_id: parentId, status_id: '*' })
  }

  public async getChildren(): Promise<Array<this>> {
    return await Issue.getChildren(this.id)
  }

  public static bulkEditUrl(ids: Array<number | string>): string {
    const resources = Issue.getResourcesName()
    const params = ids.map(id => `ids[]=${id}`).join('&')
    const uri = `/${resources}/bulk_edit?${params}`
    return encodeURI(uri)
  }

  public favItemize(): { resource: string; href: string; innerText: string } {
    return {
      resource: Issue.name,
      href: Issue.getUrl(this.id),
      innerText: `#${this.id} ${this.subject}`
    }
  }
}
