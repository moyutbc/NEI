import Hogan from 'hogan.js/dist/hogan-3.0.2.min.js'
import tippy from "tippy.js";
import _ from 'underscore/underscore-min.js';

import { ClickEventButton } from
import { Issue } from '~/models/issue'

export class SimpleSubtaskTable implements HTMLComponent {
  private element: HTMLElement

  constructor(issues: Array<Issue>, id = 'timeline') {
    const html = Hogan.compile(`
      <table class="momiji list">
        <thead>
          <tr>
            <th>Subject</th>
            <th id="th-status">Status</th>
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
            <td class="status" data-status-id="{{ status.id }}">{{ status.name }}</td>
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
        if (!checkbox) {
          return;
        }

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

    // ステータスのフィルター
    this.setupStatusMenu(issues, this.element)
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  private setupStatusMenu(issues: Array<Issue>, table: HTMLElement): void {
    let statuses = issues.map(i => i.status)
    statuses = _.uniq(statuses, 'id');

    // ポップアップメニュー
    const statusMenu = Hogan.compile( `
      <div id="status-menu">
        <div style="text-align:left;">
          {{#statuses}}
          <div>
            <input type="checkbox" id="status-{{ id }}" name="status" value="{{ name }}" data-status-id="{{id }}" checked>
            <label for="status-{{ id }}">{{ name }}</label>
          </div>
          {{/statuses}}
        </div>
        <input type="button" value="Apply" >
      </div>
    `).render({ statuses: statuses })

    const parser = new DOMParser();
    const menu = parser.parseFromString(statusMenu, 'text/html').querySelector('#status-menu')

    // 適用ボタン
    const apply = menu.querySelector('#status-menu input[type="button"]')
    apply.onclick = () => {
      // 表示するstatusを取得する。
      const inputs = Array.from(menu.querySelectorAll('#status-menu input[type="checkbox"]:checked'))
      const displayStatusIds = inputs.map(el => el.getAttribute('data-status-id'))

      // 全部非表示
      const trs = Array.from(table.querySelectorAll('table.momiji tbody tr'))
      trs.forEach(el => el.style.display = 'none')

      // 選択された項目のみを表示
      trs.filter(tr => {
        const statusTd = tr.querySelector('.status')
        const statusId = statusTd.getAttribute('data-status-id')
        return displayStatusIds.includes(statusId)
      }).forEach(el => el.style.display = '')
    }

    const thStatus = table.querySelector('#th-status')
    tippy(thStatus, {
      interactive: true,
      trigger: 'click',
      content: menu,
    });

  }
}
