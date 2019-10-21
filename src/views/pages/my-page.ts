import { Issue } from '~/models'
import MyPageBox from '~/views/components/molecules/MyPageBox'

export class MyPage implements Page {
  constructor() {
    // 今週期日のチケット
    const ticketsDueThisWeek = document.createElement('div')
    ticketsDueThisWeek.id = 'tickets-due-this-week'
    document.querySelector('#list-top').insertAdjacentElement('afterbegin', ticketsDueThisWeek)

    // 今日期日のチケット
    const ticketsDueToday = document.createElement('div')
    ticketsDueToday.id = 'tickets-due-today'
    document.querySelector('#list-top').insertAdjacentElement('afterbegin', ticketsDueToday)
  }

  public async create(): void {
    // 今日期日のチケット
    const ticketsDueToday = await Issue.where({
      assigned_to_id: 'me',
      due_date: `=${this.getToday()}`,
      status_id: '*'
    })

    new MyPageBox({
      el: '#tickets-due-today',
      data: {
        title: '今日期日のチケット',
        titleLink: `/issues?assigned_to_id=me&due_date=${this.getToday()}`,
        issues: ticketsDueToday
      }
    })

    // 今週期日のチケット
    const ticketsDueThisWeek = await Issue.where({
      assigned_to_id: 'me',
      due_date: `><${this.getPrevSunday()}|${this.getNextSunday()}`,
      status_id: '*'
    })

    new MyPageBox({
      el: '#tickets-due-this-week',
      data: {
        title: '今週期限のチケット',
        titleLink: `/issues?assigned_to_id=me&due_date==${this.getNextSunday()}`,
        issues: ticketsDueThisWeek
      }
    })

  }

  private getToday(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();

    return `${year}-${month}-${day}`
  }

  private getPrevSunday(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const weekday = today.getDay();

    const diff = weekday; // 0: 日曜日 ~ 6: 土曜日
    today.setDate(day - diff);
    const sundayYear = today.getFullYear();
    const sundayMonth = today.getMonth() + 1;
    const sundayDay = today.getDate();

    return `${sundayYear}-${sundayMonth}-${sundayDay}`
  }

  private getNextSunday(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const weekday = today.getDay();

    const diff = 7 - weekday; // 0: 日曜日 ~ 6: 土曜日
    today.setDate(day + diff);
    const sundayYear = today.getFullYear();
    const sundayMonth = today.getMonth() + 1;
    const sundayDay = today.getDate();

    return `${sundayYear}-${sundayMonth}-${sundayDay}`
  }
}
