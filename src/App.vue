<template>
  <div id="app">
    <app-header></app-header>

    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import AppHeader from './components/Header'
  export default {
    name: 'app',
    components: {
      AppHeader
    }
  }
</script>

<style lang="scss">
  @import "./assets/bootstrap-custom";
  @import "~bootstrap/scss/bootstrap";
  @import "~bootstrap-vue/dist/bootstrap-vue";
</style>
