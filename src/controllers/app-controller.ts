import { IssuePage } from '~/views/pages/issue-page'

export class AppController {
  public static dispatch(url: string): void {
    let page;

    var arr = /issues\/(\d+)/.exec(url) 
    if (arr !== null) {
      page = new IssuePage(arr[1])
    }

    if (page) {
      page.create()
    }
  }
}
