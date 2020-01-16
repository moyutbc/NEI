<template lang="pug">
  span(@click="onClick")
    img(
      v-if="isDown"
      :src="'/images/arrow_down.png'"
      alt="↓"
      )
    img(
      v-else=""
      :src="'/images/arrow_up.png'"
      alt="↑"
      )
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SubtaskTableContextMenu extends Vue {
  isDown: boolean = true;

  private onClick(): void {
    if (this.isDown) {
      this.$emit("up");
    } else {
      this.$emit("down");
    }
    this.isDown = !this.isDown;
  }
}
</script>
