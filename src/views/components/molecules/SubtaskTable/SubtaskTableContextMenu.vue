<template lang="pug">
  div.subtask-table-context-menu(:style="propStyle")
    | Sorry, not impletemted yet.
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

import from '~/models'

@Component
export default class SubtaskTableContextMenu extends Vue {
  @Prop({ type: Object, required: false})
  propStyle
}
</script>

<style>
.subtask-table-context-menu {
  position: absolute;
  z-index: 40;
  font-size: 0.9em;
  background-color: white;
  padding: 8px;
  border-style: ridge;
}
</style>
