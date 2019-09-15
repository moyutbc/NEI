import $ from 'jquery'
import { DataSet, Timeline } from 'vis-timeline'
import 'vis-timeline/dist/vis-timeline-graph2d.css'
import Hogan from 'hogan.js/dist/hogan-3.0.2.min.js'

import { Page } from '~/types/index'
import { Issue } from '~/models/issue'

import { FavButton } from '~/views/components/fav-button'
import { FavMenu } from '~/views/components/fav-menu'

import { Subject } from '~/views/components/Subject'
import { SubtaskGanttChart } from '~/views/components/subtask-gantt-chart'

export class IssuePage implements Page {
  private issue: Issue
  private subtasks: Array<Issue>
  private container: any
  private items: DataSet
  private options: any = {}

  private static RIGHT_BUTTON = 2

  constructor(issueId: number | string) {
    this.issue = new Issue({
      id: Number(issueId),
      subject: document.querySelector('#content .subject h3').innerText
    })
  }
  
  public async create(): void {
    const this.subtasks = await this.issue.getChildren()

    if (this.subtasks.length > 0) {
      this.createTimeline()
      this.destroySubtasksTable()
      this.createSubtasksTable()
    }

    Subject.setup()

    // お気に入りボタン
    const favButton = (new FavButton(this.issue)).getElement()
    const contextualMenu = document.querySelector('#content .contextual')
    contextualMenu.appendChild(favButton)

    // お気に入りメニュー
    const favMenu = new FavMenu().getElement()
    const li = document.createElement("li");
    li.appendChild(favMenu);
    const topMenu = document.querySelector("#top-menu > ul");
    topMenu.appendChild(li);
  }
  
  public createTimeline(): void {
    // div#timeline の作成
    const issueTree = $('#issue_tree')[0]
    const issues = issueTree.querySelector('#issue_tree > form > table')

    const gantt = SubtaskGanttChart.create(this.subtasks)

    issues.insertAdjacentElement('beforebegin', gantt)
  }

  private createSubtasksTable(): void {
    const template = Hogan.compile(`
      <table class="rmgw">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Status</th>
            <th>Assignee</th>
            <th>Due date</th>
          </tr>
        </thead>
        <tbody>
        {{#subtasks}}
          <tr>
            <td class="checkbox">
              <input type="checkbox" value="{{ id }}"></input>
            </td>
            <td class="subject">
              <a href="/issues/{{ id }}">#{{ id }}</a>
              {{ subject }}
            </td>
            <td class="status">{{ status.name }}</td>
            <td class="assign_to">{{ assigned_to.name }}</td>
            <td class="due_date">{{ due_date }}</td>
          </tr>
        {{/subtasks}}
        </tbody>
      </table>
    `)

    const html = template.render({ subtasks: this.subtasks })

    const form = document.querySelector('#issue_tree > form')
    form.insertAdjacentHTML('beforeend', html)

    document.querySelectorAll('table.rmgw tr').forEach((tr) => {
      tr.onclick = () => {
        const checkbox = tr.querySelector('input[type=checkbox]')
        if (checkbox.checked) {
          tr.classList.remove('context-menu-selection')
        } else {
          tr.classList.add('context-menu-selection')
        }
        checkbox.checked = !checkbox.checked
      }
    })

    document.querySelector('table.rmgw').addEventListener('contextmenu', (e) => {
    console.log(e)
      if (e.button !== IssuePage.RIGHT_BUTTON) { return; }
      e.preventDefault()

      const ids = Array.from(document.querySelectorAll('.context-menu-selection')).filter(tr => {
        return tr.querySelector('input[type=checkbox]').checked
      }).map(tr => {
        return tr.querySelector('input[type=checkbox]').value
      })

      if (ids.length > 0) {
        window.location.href = Issue.bulkEditUrl(ids)
      }
    })
  }

  private destroySubtasksTable(): void {
    document.querySelector('#issue_tree > form > table.list.issues.odd-even').remove()
  }
}
