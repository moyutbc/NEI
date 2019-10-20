<template>
  <div class="mypage-box">
    <h3>
      <a :href="titleLink">{{ title }}</a> ({{ issues.length }})
    </h3>
    <issue-list-table :prop-issues="issues"></issue-list-table>
  </div>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

import { Issue } from '~/models'
import IssueListTable from '~/views/components/atoms/IssueListTable'

@Component({
  components: { IssueListTable }
})
export default class MyPageBox extends Vue {
  title: string = ''
  titleLink: string = ''
  issues: Array<Issue> = []
}
</script>
