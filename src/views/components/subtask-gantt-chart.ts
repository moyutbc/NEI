import { DataSet, Timeline } from 'vis-timeline'
import 'vis-timeline/dist/vis-timeline-graph2d.css'

import { Issue } from '~/models/issue'

export class SubtaskGanttChart implements HTMLComponent {
  private element: HTMLElement

   constructor(issues: Array<Issue>, id = 'timeline') {
    // 要素の作成
    const container = document.createElement('div')
    const container.id = id

    // タイムラインの作成
    const items = new DataSet()
    const groups  = new DataSet();
    issues.forEach((issue, index) => {
      groups.add({ id: index, content: issue.subject });

      items.add({
        id: issue.id,
        content: issue.subject,
        start: new Date(issue.start_date || issue.due_date),
        end: issue.due_date,
        group: index
      })
    })

    const options = {
      groupOrder: 'content',
      stack: true,
      type: 'point',
      zoomMin: 1000 * 60 * 60 * 24 // msec
    }

    const timeline = new Timeline(container);
    timeline.setOptions(options);
    timeline.setGroups(groups);
    timeline.setItems(items);

    this.element = container;
  }

  public getElement(): HTMLElement {
    return this.element;
  }
}
