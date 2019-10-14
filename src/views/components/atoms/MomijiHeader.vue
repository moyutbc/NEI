<template>
  <h2 @click="thanks">Momiji Home</h2>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";

@Component
export default class MomijiHeader extends Vue {

  public thanks() {
    alert('Thank you for using momiji!🍁');
  }
}
</script>
