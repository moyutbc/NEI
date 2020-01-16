import { Orm } from './orm'

export class User extends Orm {
  admin: boolean
  created_on: string
  firstname: string
  id: number
  last_login_on: string
  lastname: string
  login: string
  mail: string

  constructor(obj: any) {
    super()
    this.admin = obj.admin
    this.created_on = obj.created_on
    this.firstname = obj.firstname
    this.id = obj.id
    this.last_login_on = obj.last_login_on
    this.lastname = obj.lastname
    this.login = obj.login
    this.mail = obj.mail
  }

  getResourceClass() {
    return User
  }

  static get className(): string {
    return 'User'
  }
}
