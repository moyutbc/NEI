import { Page } from '~/types/index'
import { Issue, IssueStatus } from '~/models'

import { SubtaskGanttChart } from '~/views/components/subtask-gantt-chart'
import { SimpleSubtaskTable } from '~/views/components/simple-subtask-table'

import SubtaskTableCollapsable from '~/views/components/molecules/SubtaskTable/SubtaskTableCollapsable'

import ExecuteForm from '~/views/components/organisms/ExecuteForm'
import IssuePageDrawer from '~/views/components/organisms/IssuePageDrawer'
import IssueSubjectLabel from '~/views/components/organisms/IssueSubjectLabel'
import IssueForm from '~/views/components/organisms/IssueForm'
import IssueCopyButton from '~/views/components/organisms/issueCopyButton'

export class IssuePage implements Page {
  private issue: Issue
  private subtasks: Array<Issue>

  constructor(issueId: number | string) {
    this.issue = new Issue({
      id: Number(issueId),
      subject: document.querySelector('#content .subject h3').innerText
    })

    // execute-buttons
    const div = document.createElement('div')
    div.id = 'execute-buttons'
    document.querySelector('#sidebar').insertAdjacentElement('beforeend', div)

    // drawer
    const drawer = document.createElement('div')
    drawer.id = 'drawer'
    document.querySelector('#top-menu > ul').insertAdjacentElement('afterBegin', drawer)

    // issue-form
    const issueForm = document.createElement('div')
    IssueForm.id = 'issue-form'
    // document.querySelector('#content > div.contextual').insertAdjacentElement('afterBegin', issueForm)
    document.querySelector('#watchers').insertAdjacentElement('afterBegin', issueForm)

    // issue-copy-button
    const issueCopyButton = document.createElement('div')
    issueCopyButton.id = 'issue-copy-button'
    document.querySelector('#content > .contextual').insertAdjacentElement('afterBegin', issueCopyButton)
  }

  public async create(): void {
    const this.subtasks = await this.issue.getChildren()
    const issueStatuses = await IssueStatus.all()

    if (this.subtasks.length > 0) {
      const tmp = document.createElement('div')
      tmp.id = 'new-table'
      document.querySelector('#issue_tree').insertAdjacentElement('beforeend', tmp)

      new SubtaskTableCollapsable({
        el: '#new-table',
        propsData: {
          issues: this.subtasks
        }
      })
    }

    new IssueCopyButton({
      el: '#issue-copy-button',
      propsData: { issue: this.issue }
    })

    new ExecuteForm({
      el: '#execute-buttons'
    })

    new IssuePageDrawer({
      el: '#drawer',
      data: {
        issue: this.issue
      }
    })
  }
}
