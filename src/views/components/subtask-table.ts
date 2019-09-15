import Hogan from 'hogan.js/dist/hogan-3.0.2.min.js'

import { ClickEventButton } from
import { Issue } from '~/models/issue'

export class SubtaskTable implements HTMLComponent {
  private element: HTMLElement

  constructor(issues: Array<Issue>, id = 'timeline') {
    const html = Hogan.compile(`
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
    `).render({ subtasks: issues })

    const parser = new DOMParser();
    const dom = parser.parseFromString(html, 'text/html')

    this.element = dom.querySelector('table')

    // クリックで選択
    this.element.querySelectorAll('tr').forEach((tr) => {
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

    // 右クリックで一括編集
    this.element.addEventListener('contextmenu', (e) => {
      if (e.button !== /* RIGHT_BUTTON */2) { return; }
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

  public getElement(): HTMLElement {
    return this.element;
  }
}
