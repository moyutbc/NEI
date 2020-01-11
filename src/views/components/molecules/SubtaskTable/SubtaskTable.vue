<template lang="pug">
  table.list.issues.odd-even
    tbody
      tr(
        v-for="(issue, index) in issues"
        @click="checkOrUncheck(issue)"
        :class="trClass(issue)"
        )

        td.checkbox
          input(type="checkbox")

        td.subject
          a.issue {{ `${issue.tracker.name} ${issue.id}` }}
          | {{ `: ${issue.subject}` }}
          
        td.status {{ issue.status.name }}
        td.assigned_to {{ issue.assigned_to ? issue.assigned_to.name : '' }}
        td.due_date {{ issue.due_date }}
        td.buttons
          a.icon-only.icon-actions.js-contextmenu(href="#") Actions
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import from '~/models'

@Component
export default class SubtaskTable extends Vue {
  @Prop({ type: Array, required: true })
  issues: Array<Issue>

  checked: Array<number> = []

  private trClass(issue: Issue): Object {
  
    return {
      'context-menu-selection': this.checks(issue),
      'overdue': this.overdue(issue.due_date)
    }
  }

  /**
   * 選択する。選択済みの場合は選択を解除する。
   */
  private checkOrUncheck(issue: Issue):void {
    if (this.checked.includes(issue.id)) {
      this.checked = this.checked.filter(tmp => tmp !== issue.id)
    } else {
      this.checked.push(issue.id)
    }
  }

  /**
   * 選択済みかどうか
   */
  private checks(issue: Issue): boolean {
    return this.checked.includes(issue.id);
  }

  /**
   * 現在時刻より前の日時かどうか
   */
  private overdue(date: string): boolean {
    return new Date(date) < new Date()
  }
}
</script>
