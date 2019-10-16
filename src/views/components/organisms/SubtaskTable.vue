<template>
  <el-table
    :border="true"
    class-name="list"
    :data="issues"
    :stripe="true"
    size="mini"
    ref="subtaskTable"
    @selection-change="selectionChangeHandler"
    @row-click="rowClickHandler"
    @row-contextmenu="goBulkEdit"
    >
    <el-table-column
      type="selection"
      :min-width="5" >
    </el-table-column>
    <el-table-column
      prop="id"
      label="Id"
      sortable
      :min-width="10" >
      <template slot-scope="scope">
        <a :href="`/issues/${scope.row.id}`">{{ scope.row.id }}</a>
      </template>
    </el-table-column>
    <el-table-column
      prop="subject"
      label="Subject"
      sortable
      :min-width="35" >
      <template slot-scope="scope">
        <a :href="`/issues/${scope.row.id}`">{{ scope.row.subject }}</a>
      </template>
    </el-table-column>
    <el-table-column
      prop="status.name"
      label="Status"
      :filters="statusFilter()"
      :filter-method="statusFilterMethod"
      sortable
      :min-width="15" >
    </el-table-column>
    <el-table-column
      prop="assigned_to.name"
      label="Assignee"
      sortable
      :min-width="15" >
    </el-table-column>
    <el-table-column
      prop="due_date"
      label="Due date"
      :filters="dueDateFilter()"
      :filter-method="dueDateFilterMethod"
      sortable
      :min-width="15" >
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Table, TableColumn } from 'element-ui';
Vue.use(Table)
Vue.use(TableColumn)

import _ from 'underscore/underscore-min.js';

import { Issue } from '~/models'

@Component
export default class SubtaskTable extends Vue {
  issues: Array<Issue> = []
  issueStatuses: Array<IssueStatus> = []
  lastSelection: Array<Issue> = []
  dialogVisible: boolean = false

  mounted() {
    // openのチケットだけ表示
    this.setFilterValues('status.name', this.openStatusValues())
  }

  /**
   * チケットのクローズ状態を表すステータスのidを返却する。
   *
   * @return {Array<number>}
   */
  private openStatusValues(): Array<number> {
    return this.issueStatuses
      .filter(status => !status.is_closed)
      .map(status => status.id)
  }

  /**
   * フィルタの値を変更する。
   *
   * @param {string} columnProp カラム名
   * @param {Array<number>} values 選択状態にする値
   */
  private setFilterValues(columnProp: string, values: Array<number>) {
    const subtaskTable = this.$refs.subtaskTable
    if (!subtaskTable) { return; }
    console.log(subtaskTable)

    const column = subtaskTable.columns.find(col => col.property === columnProp);
    if (!column) { return; }

    subtaskTable.store.commit('filterChange', {
      column: column,
      values: values,
    });

    subtaskTable.store.updateAllSelected();
  }

  private selectionChangeHandler(selection) {
    this.lastSelection = selection
  }

  private rowClickHandler(row) {
    this.$refs.subtaskTable.toggleRowSelection(row)
  }

  private goBulkEdit(row, column, event) {
    event.preventDefault()

    const ids = this.lastSelection.map(el => el.id)
    if (ids.length > 0) {
      window.location.href = Issue.bulkEditUrl(ids)
    }
  }

  private statusFilter(): Array<{text: string, value: string|number}> {
    const statuses = this.issues.map(issue => ({
      value: issue.status.id,
      text: issue.status.name
    }))

    return _.uniq(statuses, 'value')
  }

  private dueDateFilter(): Array<{text: string, value: string}> {
    const statuses = this.issues.map(issue => ({
      value: issue.due_date,
      text: issue.due_date
    }))

    return _.uniq(statuses, 'value')
  }

  private statusFilterMethod(value, row, column) {
    return value === row.status.id
  }

  private dueDateFilterMethod(value, row, column) {
    return value === row.due_date
  }
}
</script>
