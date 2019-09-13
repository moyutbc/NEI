import tippy from "tippy.js";

import { Clipboard } from "~/utilities/clipboard";

export class Subject {
  public static setup() {
    const a = document.createElement('a')
    a.onclick = () => { this.copy(); }
    a.className = 'icon icon-copy'
    a.href = 'javascript:void(0);'
    tippy(a, {
      content: "クリップボードにコピー"
    });

    const subject = document.querySelector(".subject")
    subject.style.display = 'flex'
    subject.appendChild(a)
  }

  private static copy(): void {
    const subject = document.querySelector("#content h3").innerText;
    const href = window.location.href;
    const content = ["```", subject, href, "```"].join("\n");

    Clipboard.copy(content);
  }
}
