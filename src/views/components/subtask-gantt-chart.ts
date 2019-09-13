import { DataSet, Timeline } from 'vis-timeline'
import 'vis-timeline/dist/vis-timeline-graph2d.css'

import { Issue } from '~/models/issue'

export class SubtaskGanttChart {
  public static create(issues: Array<Issue>, id = 'timeline'): any {
    // 要素の作成
    const container = document.createElement('div')
    const container.id = id

    // タイムラインの作成
    const data = issues.map(child => {
      return {
        id: child.id,
        content: child.subject,
        start: new Date(child.start_date || child.due_date),
        end: child.due_date
      }
    })
    const items = new DataSet(data)
    const options = {
      stack: true,
      type: 'box',
      zoomMin: 1000 * 60 * 60 * 24 // msec
    }

    const timeline = new Timeline(container, items, options);

    return container;
  }
}
