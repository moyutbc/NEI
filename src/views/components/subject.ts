import tippy from "tippy.js";

import { Clipboard } from "~/utilities/clipboard";

export class Subject {
  public static setup() {
    const subject = document.querySelector("#content h3");
    if (!subject) {
      return;
    }
    subject.onclick = () => {
      this.copy();
    };
    tippy("#content h3", {
      followCursor: true,
      content: "クリップボードにコピー"
    });
  }

  private static copy(): void {
    const subject = document.querySelector("#content h3").innerText;
    const href = window.location.href;
    const content = ["```", subject, href, "```"].join("\n");

    Clipboard.copy(content);
  }
}
