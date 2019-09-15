import tippy from "tippy.js";
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

    const menu = Hogan.compile(`
      <div>
        Issues
        <ul>
          {{#issues}}
          <li>
            <a href="{{ href }}">{{ innerText }}</a>
          </li>
          {{/issues}}
        </ul>
      </div>
    `).render({
      issues: favs
    })

    instance.setContent(menu)
  }
}
