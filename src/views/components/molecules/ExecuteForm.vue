<template>
  <el-form :model="form">
    <el-input type="textarea" v-model="form.contents"></el-input>
    <execute-button propLabel="実行" :propCallback="getCallback()"></execute-button>
  </el-form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Button, Form, Input } from 'element-ui';
Vue.use(Button)
Vue.use(Form)
Vue.use(Input)

import ExecuteButton from './ExecuteButton';

@Component({
  components: {
    ExecuteButton
  }
})
export default class ExecuteForm extends Vue {
  form = {
    contents: ''
  }

  private getCallback() {
    return () => { eval(this.form.contents) }
  }
}
</script>
