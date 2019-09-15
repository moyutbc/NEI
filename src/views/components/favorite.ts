import { FavItem } from "~/types/index";

// rmgw = { favs: [] }
export class Favorite {
  private static KEY = "rmgw"

  public static add(item: FavItem): void {
    const favItemized = item.favItemize()

    const tmpLocalStorage = JSON.parse(localStorage.getItem(Favorite.KEY));
    if (!tmpLocalStorage) tmpLocalStorage = {};
    if (!tmpLocalStorage.favs) tmpLocalStorage.favs = [];

    tmpLocalStorage.favs.push(favItemized);

    localStorage.setItem(Favorite.KEY, JSON.stringify(tmpLocalStorage));
  }

  public static remove(item: FavItem): void {
    const tmpLocalStorage = JSON.parse(localStorage.getItem(Favorite.KEY));
    if (!tmpLocalStorage) return;
    if (!tmpLocalStorage.favs) return;

    tmpLocalStorage.favs = tmpLocalStorage.favs.filter(fav => {
      return fav.href !== item.href;
    })

    localStorage.setItem(Favorite.KEY, JSON.stringify(tmpLocalStorage));
  }

  public static list(): any {
    const tmpLocalStorage = JSON.parse(localStorage.getItem(Favorite.KEY));
    return tmpLocalStorage && tmpLocalStorage.favs ? tmpLocalStorage.favs : []
  }
}
