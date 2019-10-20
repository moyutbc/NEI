<template>
  <table
    class="list issues odd-even">
    <thead>
      <tr>
        <th>#</th>
        <th>Project</th>
        <th>Tracker</th>
        <th>Status</th>
        <th>Subject</th>
        <th>Due Date</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="(issue, index) in getIssues()"
        :key="index"
        :class="{odd: index % 2 === 1, even: index % 2 === 0}">
        <td><a :href="`/issues/${issue.id}`">{{ issue.id }}</a></td>
        <td><a :href="`/projects/${issue.project.name.toLowerCase()}`">{{ issue.project.name }}</a></td>
        <td>{{ issue.tracker.name }}</td>
        <td>{{ issue.status.name }}</td>
        <td><a :href="`/issues/${issue.id}`">{{ issue.subject }}</a></td>
        <td>{{ issue.due_date }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

import { Issue } from '~/models'

@Component
export default class IssueListTable extends Vue {
  issues: Array<Issue> = []

  @Prop()
  public propIssues: Array<Issue>

  private getIssues(): Array<Issue> {
    return [].concat(this.issues).concat(this.propIssues)
  }
}
</script>
