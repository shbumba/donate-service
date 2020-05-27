<template>
  <div id="app">
    <Donate />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Donate from './views/donate/index.vue';

@Component({
  components: {
    Donate,
  },
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  display: flex;

  * {
    box-sizing: border-box;
  }
}
</style>
