<template>
  <div id="app">
    <header-top/>
    <navigation/>
    <div class="mt-4">
      <router-view></router-view>

    </div>
  </div>
</template>

<script>
import { Header, Navigation } from './components'

export default {
  components: {
    'header-top': Header,
    Navigation
  }
}
</script>

<style>
  #app {
    margin-top: 100px;
  }
</style>
