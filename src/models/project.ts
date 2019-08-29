import { Dayjs } from 'dayjs';
import { Orm } from '~/models/orm'

export class Project extends Orm {
  id: number
  name: string
  identifier: string
  description: string
  created_on: Dayjs
  updated_on: Dayjs
  is_public: boolean

  constructor(obj: any) {
    this.id          = obj.id
    this.name        = obj.name
    this.identifier  = obj.identifier
    this.description = obj.description
    this.created_on  = obj.created_on
    this.updated_on  = obj.updated_on
    this.is_public   = obj.is_public
  }
}
