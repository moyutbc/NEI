import { DataSet, Timeline } from 'vis-timeline'
import 'vis-timeline/dist/vis-timeline-graph2d.css'
import Hogan from 'hogan.js/dist/hogan-3.0.2.min.js'

import { Page } from '~/types/index'
import { Issue, IssueStatus } from '~/models'

import { SubtaskGanttChart } from '~/views/components/subtask-gantt-chart'
import { SimpleSubtaskTable  } from '~/views/components/simple-subtask-table'

import SubtaskTable from '~/views/components/organisms/SubtaskTable'
import ExecuteForm from '~/views/components/organisms/ExecuteForm'
import IssuePageDrawer from '~/views/components/organisms/IssuePageDrawer'
import IssueSubjectLabel from '~/views/components/organisms/IssueSubjectLabel'
import IssueForm from '~/views/components/organisms/IssueForm'

export class IssuePage implements Page {
  private issue: Issue
  private subtasks: Array<Issue>
  private container: any
  private items: DataSet
  private options: any = {}

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
  }
  
  public async create(): void {
    const this.subtasks = await this.issue.getChildren()
    const issueStatuses = await IssueStatus.all()

    if (this.subtasks.length > 0) {
      // this.createTimeline()
      // this.destroySubtasksTable()
      // this.createSubtasksTable()

      const subtaskTable = new SubtaskTable({
        el: '#issue_tree > form > table',
        data: {
          issues: this.subtasks,
          issueStatuses: issueStatuses
        }
      })
    }

    const executeForm = new ExecuteForm({
      el: '#execute-buttons'
    })

    const issuePageDrawer = new IssuePageDrawer({
      el: '#drawer',
      data: {
        issue: this.issue
      }
    })

    const issueSubjectLabel = new IssueSubjectLabel({
      el: '#content div.subject h3',
      data: {
        subject: this.issue.subject
      }
    })

    // new IssueForm({
    //   el: '.wiki',
    //   data: {
    //     issue: this.issue
    //   }
    // })
  }
  
  private createTimeline(): void {
    const gantt = new SubtaskGanttChart(this.subtasks).getElement()

    const issueTree = document.querySelector('#issue_tree')
    const issues = issueTree.querySelector('#issue_tree > form > table')
    issues.insertAdjacentElement('beforebegin', gantt)
  }

  private createSubtasksTable(): void {
    const table = new SimpleSubtaskTable(this.subtasks).getElement()

    const form = document.querySelector('#issue_tree > form')
    form.insertAdjacentElement('beforeend', table)
  }

  private destroySubtasksTable(): void {
    document.querySelector('#issue_tree > form > table.list.issues.odd-even').remove()
  }
}
