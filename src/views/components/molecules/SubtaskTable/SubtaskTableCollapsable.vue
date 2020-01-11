<template lang="pug">
  div
    button.activator(@click="show = !show")
      | {{ show ? 'hide' : 'show' }}

    transition(name="fade")
      subtask-table(
        v-if="show"
        :issues="issues"
      )

</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import from '~/models'
import SubtaskTable  from './SubtaskTable'

@Component({
  components: { SubtaskTable }
})
export default class SubtaskTableCollapsable extends Vue {
  @Prop({ type: Array, required: true })
  issues: Array<Issue>

  show: boolean = false

}
</script>

<style>
.activator {
  margin-bottom: 4px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
