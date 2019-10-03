import { h, app } from 'hyperapp'

export class HomePage implements Page {
  public async create(): void {
    app({
      node: document.getElementById("content"),
      view: () => h(
        "h1", {}, [
          "Thanks for using rmgw!😄",
        ]
      )
    })
    
  }
}
