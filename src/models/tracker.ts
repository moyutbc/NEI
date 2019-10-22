import { Dayjs } from 'dayjs'
import { Orm } from '~/models/orm'

export class Tracker extends Orm {
  id: number
  name: string
  default_status: Status

  constructor(obj: any) {
    super()
    this.id = obj.id
    this.name = obj.name
    this.default_status = obj.default_status
  }
}
