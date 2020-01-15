<template lang="pug">
  div.subtask-table-filter(
    :class="{'d-none': !visible}"
    :style="propStyle"
    @click.stop=""
    )
    slot
      | filter
      button(@click="hide()")
        | Apply
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class SubtaskTableFilter extends Vue {
  @Prop({ type: Object, required: false })
  propStyle: Object;

  visible: boolean = false;

  public show(): void {
    this.visible = true;
    window.addEventListener("click", evt => {
      this.hide();
    });
  }

  public hide(): void {
    this.visible = false;
  }
}
</script>

<style>
.d-none {
  display: none;
}

.subtask-table-filter {
  position: absolute;
  z-index: 40;
  background: white;
}
</style>
