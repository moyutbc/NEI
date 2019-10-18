<template>
  <h3 @click="copy">
    {{ subject }}
  </h3>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Message } from 'element-ui';
Vue.prototype.$message = Message;

import { Clipboard } from "~/utilities/clipboard";

@Component
export default class IssueSubjectLabel extends Vue {
  subject: string = ''

  private copy() {
    const href = window.location.href;
    const content = ["```", this.subject, href, "```"].join("\n");
    Clipboard.copy(content);

    this.$message({ message: 'copied!', type: 'success' });
  }
}
</script>
