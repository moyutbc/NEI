<template>
  <el-form :model="form">
    <el-input
      type="textarea"
      placeholder="任意のJavaScriptを実行"
      v-model="form.contents">
    </el-input>
    <el-row>
      <el-col :span="8"><el-button style="width: 100%;" type="primary" @click="execute">Execute</el-button></el-col>
      <el-col :span="8"><el-button style="width: 100%;" @click="load">Load</el-button></el-col>
      <el-col :span="8"><el-button style="width: 100%;" @click="save">Save</el-button></el-col>
    </el-row>
  </el-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Button, Col, Form, Input, Row } from 'element-ui';
Vue.use(Button)
Vue.use(Col)
Vue.use(Form)
Vue.use(Input)
Vue.use(Row)

import { LocalStore } from '~/utilities/local-store';

@Component
export default class ExecuteForm extends Vue {
  form = {
    contents: ''
  }

  mounted() {
    this.load();
  }

  private getCallback() {
    return () => { eval(this.form.contents) }
  }

  private load(): void {
    const contents = LocalStore.get('issue-page.execute')
    this.form.contents = contents
  }

  private save(): void {
    LocalStore.set('issue-page.execute', this.form.contents)
  }

  private execute(): void {
    eval(this.form.contents)
  }
}
</script>
