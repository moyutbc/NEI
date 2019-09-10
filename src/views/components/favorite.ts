import $ from 'jquery'
window.jQuery = $
import 'jquery-ui-dist/jquery-ui'

import { Issue } from '~/models/issue'

export class Favorite {
  static favorites: Array<Issue>

  /**
   * お気に入りボタンを追加する。
   */
  public static createAddToFavorite(selector = '#content > .contextual'): void {
    const a = document.createElement('a')
    a.href = "javascript:void(0);"
    a.onclick = this.addToFavorites
    a.innerText = 'Fav'

    const contentOps = document.querySelector(selector)
    contentOps.appendChild(a)
  }

  private static addToFavorites(): void {
    console.log('addToFavorites')
  }

  public static createFavorites(selector: string): void {
    // dialog
    const dialog = `
      <div id="fav-dialog" title="基本的なダイアログ">
        <p>
            ダイアログで情報を表示する際に便利です。
            ダイアログウインドウは移動とリサイズが可能で、また'x'アイコンで閉じることも出来ます。
        </p>
      </div>
    `
    document.body.insertAdjacentHTML('beforeend', dialog)
    $('#fav-dialog').dialog({ autoOpen: false });

    // opener
    const a = document.createElement('a')
    a.href = "javascript:void(0);"
    a.onclick = () => { $('#fav-dialog').dialog('open') }
    a.innerText = 'Favos'

    const li = document.createElement('li')
    li.appendChild(a)

    const topMenu = document.querySelector('#top-menu > ul')
    topMenu.appendChild(li)
  }
}
