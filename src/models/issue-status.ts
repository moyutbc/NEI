import { Orm } from './orm'

export class IssueStatus extends Orm {
    getResourceClass() {
        return IssueStatus
    }

    static get className(): string {
        return 'IssueStatus'
    }
}
