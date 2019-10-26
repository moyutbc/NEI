<template>
  <el-popover
    trigger="click">
    <!-- context menu -->
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item name="1">
        <template slot="title">
          <el-link type="primary" :underline="false" href="/">Edit</el-link>
        </template>
      </el-collapse-item>

      <el-collapse-item title="Status" name="2">
        <el-row v-for="status in statuses">
          <el-button @click="update({status_id: status.id})" class="w-100">{{ status.name }}</el-button>
        </el-row>
        <el-button type="text" @click="refreshResources">need refresh?</el-button>
      </el-collapse-item>

      <el-collapse-item title="Assignee" name="3">
        Not implement yet.
      </el-collapse-item>

      <el-collapse-item title="DueDate" name="4">
        Not implement yet.
      </el-collapse-item>
    </el-collapse>

    <!-- activator -->
    <el-button
      slot="reference"
      plain
      round
      @click.stop
      icon="el-icon-edit"
      size="mini">
    </el-button>
  </el-popover>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Row, Col, Button, Collapse, CollapseItem, Form, FormItem, Popover } from 'element-ui';
Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Popover)

import _ from 'underscore/underscore-min.js';

import { Issue } from '~/models'
import { Resource } from '~/services/resource'

@Component
export default class SubtaskTableContextMenu extends Vue {
  activeName = ''
  form = {
  }

  statuses = []

  @Prop()
  public propIssues: Array<Issue>

  mounted() {
    this.statuses = Resource.get('IssueStatus')
  }

  private async update(params) {
    const promises = this.propIssues.map(async issue => { issue.update(params) })
    await Promise.all(promises)
    this.$emit('change')
  }

  private async refreshResources() {
    await Resource.pull()
    this.statuses = Resource.get('IssueStatus')
  }
}
</script>

<style>
.w-100 {
  width: 100%;
}
</style>
