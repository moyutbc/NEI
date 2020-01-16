import { Orm } from './orm'
import { Status } from '../types'

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

  getResourceClass() {
    throw new Error("Method not implemented.")
  }
  static getResourceClass() {
    return Tracker
  }

  static get className(): string {
    return 'Tracker'
  }
}
