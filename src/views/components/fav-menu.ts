import tippy from "tippy.js";
import 'tippy.js/themes/light-border'
import Hogan from 'hogan.js/dist/hogan-3.0.2.min.js'

import { Favorite } from '~/views/components/favorite';

export class FavMenu implements HTMLComponent {
  private element: any

  constructor(id = 'fav-menu', innerText = 'Fav') {
    const a = document.createElement("a");
    a.id = id
    a.href = "javascript:void(0);";
    a.innerText = innerText
    this.element = a;

    const instance = tippy(a, {
      arrow: true,
      interactive: true,
      theme: 'light-border',
      trigger: 'click'
    })

    instance.set({
      onShow: () => { this.showHook(instance) }
    })
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  private showHook(instance): void {
    const favs = Favorite.list()

    favs.forEach(fav => fav.stringify = JSON.stringify(fav))

    let menu = Hogan.compile(`
      <div>
        Issues
        <ul>
          {{#issues}}
          <li>
            <a href="{{ href }}">{{ innerText }}</a>
            <a hraf="javascript:void(0);" class="icon icon-del" data-stringify="{{ stringify }}"></a>
          </li>
          {{/issues}}
        </ul>
      </div>
    `).render({
      issues: favs
    })

    menu = new DOMParser().parseFromString(menu, 'text/html').querySelector('div')

    menu.querySelectorAll('a.icon.icon-del').forEach(el => {
      el.onclick = () => {
        const favItem = JSON.parse(el.getAttribute('data-stringify'))
        Favorite.remove(favItem)
        this.showHook(instance)
      }
    })

    instance.setContent(menu)
  }
}
