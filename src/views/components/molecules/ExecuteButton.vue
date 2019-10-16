<template>
  <el-button @click="execute">{{ getLabel() }}</el-button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Button } from 'element-ui';
Vue.use(Button)

@Component
export default class ExecuteButton extends Vue {
  @Prop({ default: '' })
  propLabel!: string;

  @Prop({ default: () => { return; } })
  propCallback!: () => void;

  label: string = 'Default'
  callback: () => void = () => {}

  private getLabel(): string {
    return this.propLabel || this.label;
  }

  private execute() {
    if (this.propCallback) {
      this.propCallback()
    }

    if (this.callback) {
      this.callback()
    }
  }
}
</script>
