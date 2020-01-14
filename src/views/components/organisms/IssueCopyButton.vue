<template lang="pug">
  a.icon.icon-issue(@click="copy")
    | Clipboard
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Message } from "element-ui";
Vue.prototype.$message = Message;

import { Clipboard } from "~/utilities/clipboard";
import { Issue } from "~/models";

@Component
export default class SubtaskTable extends Vue {
  @Prop()
  issue: Issue;

  private copy(): void {
    const href = window.location.href;
    const content = ["```", this.issue.subject, href, "```"].join("\n");
    Clipboard.copy(content);

    this.$message({ message: "copied!", type: "success" });
  }
}
</script>
