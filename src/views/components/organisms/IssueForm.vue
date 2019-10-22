<template>
  <el-dialog :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="subejct">
        <el-input v-model="form.subject" autocomplete="off"></el-input>
      </el-form-item> 
    </el-form>

    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">Cancel</el-button>
      <el-button type="primary" @click="confirm">Confirm</el-button>
    </span>
  </el-dialog>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Button, Dialog, Form, FormItem } from 'element-ui';
Vue.use(Button)
Vue.use(Dialog)
Vue.use(Form)
Vue.use(FormItem)

import { Issue } from '~/models';

@Component
export default class IssueForm extends Vue {
  dialogFormVisible: boolean = true
  form: { [s: string]: string } = {
    subject: ''
  }
  issue: Issue = null

  private created() {
    if (!this.issue) {
      return;
    }

    Object.keys(this.issue).forEach(key => {
      this.form[key] = this.issue[key]
    })
  }

  private confirm() {
    this.submit()
    this.dialogFormVisible = false
  }

  private submit() {
    console.log(this.form)
  }

  // MEMO: 必須項目を取得する。
  // resp = await fetch('http://127.0.0.1:3000/projects/nocchi/issues/new')
  // text = await resp.text()
  // div = document.createElement('div')
  // div.innerHTML = text
  // attrs = div.querySelector('#all_attributes')
  // requireds = Array.from(attrs.querySelectorAll('p')).filter(p => p.querySelector('.required'))
  // requireds.map(el => el.querySelector('label').innerText.replace(/ \*$/, ''))
  // #=> ["Tracker", "Subject", "Status", "Priority"]
}
</script>
