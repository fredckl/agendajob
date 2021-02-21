<template>
  <div id="app" class="mb-5">
    <header-top/>
    <navigation/>
    <div class="mt-4">
      <transition name="show">
        <router-view></router-view>
      </transition>
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
.show-leave-enter {
  opacity: 0;
}
.show-enter-active,
.show-leave-enter {
    transform: translateX(0);
    transition: all .3s ease-out;
    
}
.show-enter,
.show-leave-to {
    transform: translateX(10%);
    opacity: 1;
}
</style>
