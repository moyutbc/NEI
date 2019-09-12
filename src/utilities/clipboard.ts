export class Clipboard {
  public static copy(text: string): void {
    const textArea = document.createElement('textarea')
    textArea.textContent = text
    const body = document.querySelector('body')
    body.appendChild(textArea)

    textArea.select()
    document.execCommand('copy')

    body.removeChild(textArea)
  }
}
