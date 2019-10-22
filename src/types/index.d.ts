export interface Status {
  id: number
  name: string
}

export interface Page {
  create(): void
}

export interface HTMLComponent {
  private element: HTMLElement
  public getElement(): HTMLElement
}

export interface FavItem {
  public favItemize(): { resource: string; href: string; innerText: string }
}
