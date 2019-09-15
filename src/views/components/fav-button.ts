import { HTMLComponent } from '~/types/index.d';
import { Favorite } from '~/views/components/favorite';

export class FavButton implements HTMLComponent {
  private item: FavItem
  private element: HTMLElement

  constructor(item: FavItem, id = 'fav-button', innerText = 'Fav') {
    this.item = item

    const a = document.createElement("a");
    a.id = id
    a.href = "javascript:void(0);";
    a.innerText = innerText
    a.className = 'icon icon-fav'
    a.onclick = () => { this.onclick() };
    this.element = a;
  }

  public getElement(): HTMLElement {
    return this.element;
  }

  private onclick(): void {
    Favorite.add(this.item)
  }
}
