import { Dayjs } from 'dayjs';
import { Project } from '~/models/project'
import { Orm } from '~/models/orm'

export class Issue extends Orm {
  id: number
  project: project
  tracker: any
  status: any
  priority: any
  author: any
  category: any
  subject: string
  description: string
  start_date: dayjs
  due_date: dayjs
  done_ratio: number
  estimated_hours: number
  custom_fields: array<any>
  created_on: dayjs
  updated_on: dayjs
  private static redmine: Redmine

  constructor(obj: any) {
    this.id              = obj.id
    this.project         = obj.project
    this.tracker         = obj.tracker
    this.status          = obj.status
    this.priority        = obj.priority
    this.author          = obj.author
    this.category        = obj.category
    this.subject         = obj.subject
    this.description     = obj.description
    this.start_date      = obj.start_date
    this.due_date        = obj.due_date
    this.done_ratio      = obj.done_ratio
    this.estimated_hours = obj.estimated_hours
    this.custom_fields   = obj.custom_fields
    this.created_on      = obj.created_on
    this.updated_on      = obj.updated_on
  }


  public static async getChildren(parentId: number): Promise<any> {
    return await this.where({parent_id: parentId})
  }
}
