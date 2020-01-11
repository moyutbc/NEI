import { HomePage, IssuePage, MyPage } from '~/views/pages'

export class AppController {
  public static dispatch(url: string): void {
    const schemeFQDN = /https?:\/\/[^/]*/.exec(url)[0] + '/'
    if (schemeFQDN === url) {
      new HomePage().create()
    }

    const arr = /issues\/(\d+)/.exec(url)
    if (arr !== null) {
      new IssuePage(arr[1]).create()
    }

    if (/my\/page/.test(url)) {
      new MyPage().create()
    }
  }
}
