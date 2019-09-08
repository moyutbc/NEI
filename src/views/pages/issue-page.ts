import $ from 'jquery'
import { DataSet, Timeline } from 'vis-timeline'
import 'vis-timeline/dist/vis-timeline-graph2d.css'

import { Page } from '~/types/index'
import { Issue } from '~/models/issue'

export class IssuePage implements Page {
  private issue: Issue
  private container: any
  private items: DataSet
  private options: any = {}

  constructor(issueId: number | string) {
    this.issue = new Issue({ id: Number(issueId) })

    // div#timeline の作成
    const issueTree = $('#issue_tree')[0]
    const issues = issueTree.querySelector('#issue_tree > form > table')
    this.container = document.createElement('div')
    this.container.id = 'timeline'
    issues.insertAdjacentElement('beforebegin', this.container)
  }

  public async create(): void {
    const children = await this.issue.getChildren()

    const data = children.map((child) => {
      return {
        id: child.id,
        content: child.subject,
        start: new Date(child.start_date),
        end: child.due_date
      }
    })

    this.items = new DataSet(data)

    this.options = {
      stack: true,
      type: 'box',
      zoomMin: 1000 * 60 * 60 * 24 // msec
    }

    const timeline = new Timeline(this.container, this.items, this.options);
  }

  public async update(): void {
  }
}
