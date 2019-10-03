import { IssuePage } from '~/views/pages/issue-page'
import { HomePage } from '~/views/pages/home-page'

export class AppController {
  public static dispatch(url: string): void {
    let page

    const schemeFQDN = /https?:\/\/[^/]*/.exec(url)[0] + '/'
    if (schemeFQDN === url) {
      page = new HomePage()
    }

    const arr = /issues\/(\d+)/.exec(url)
    if (arr !== null) {
      page = new IssuePage(arr[1])
    }

    if (page) {
      page.create()
    }
  }
}
