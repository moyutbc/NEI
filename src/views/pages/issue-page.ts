import { DataSet, Timeline } from 'vis-timeline'
import 'vis-timeline/dist/vis-timeline-graph2d.css'
import Hogan from 'hogan.js/dist/hogan-3.0.2.min.js'

import { Page } from '~/types/index'
import { Issue } from '~/models/issue'

import { FavButton } from '~/views/components/fav-button'
import { FavMenu } from '~/views/components/fav-menu'

import { Subject } from '~/views/components/Subject'
import { SubtaskGanttChart } from '~/views/components/subtask-gantt-chart'
// import { SubtaskTable } from '~/views/components/subtask-table'

import SubtaskTable from '~/views/components/organisms/SubtaskTable'

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
  }
  
  public async create(): void {
    const this.subtasks = await this.issue.getChildren()

    if (this.subtasks.length > 0) {
      // this.createTimeline()
      // this.destroySubtasksTable()
      // this.createSubtasksTable()

      const subtaskTable = new SubtaskTable({
        el: '#relations',
        data: {
          issues: this.subtasks
        }
      })
    }

    Subject.setup()

    this.createFavMenu()
    this.createFavButton()
  }
  
  private createTimeline(): void {
    const gantt = new SubtaskGanttChart(this.subtasks).getElement()

    const issueTree = document.querySelector('#issue_tree')
    const issues = issueTree.querySelector('#issue_tree > form > table')
    issues.insertAdjacentElement('beforebegin', gantt)
  }

  private createSubtasksTable(): void {
    // const table = new SubtaskTable(this.subtasks).getElement()

    const form = document.querySelector('#issue_tree > form')
    form.insertAdjacentElement('beforeend', table)
  }

  private destroySubtasksTable(): void {
    document.querySelector('#issue_tree > form > table.list.issues.odd-even').remove()
  }

  private createFavButton(): void {
    const favButton = (new FavButton(this.issue)).getElement()
    const contextualMenu = document.querySelector('#content .contextual')
    contextualMenu.appendChild(favButton)
  }

  private createFavMenu(): void {
    const favMenu = new FavMenu().getElement()
    const li = document.createElement("li");
    li.appendChild(favMenu);
    const topMenu = document.querySelector("#top-menu > ul");
    topMenu.appendChild(li);
  }
}
