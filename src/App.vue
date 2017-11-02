<template>
  <div id="app">
    <app-header></app-header>

    <div class="container">
      <router-view></router-view>
      <loading-overlay></loading-overlay>
    </div>

    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
  import axios from 'axios'
  import AppHeader from './components/Header'
  import LoadingOverlay from './components/LoadingOverlay'

  export default {
    name: 'app',
    components: {
      AppHeader,
      LoadingOverlay
    },
    created () {
      axios.interceptors.request.use(config => {
        this.$Progress.start(4500)
        return config
      }, error => {
        this.$Progress.fail()
        return Promise.reject(error)
      })

      axios.interceptors.response.use(response => {
        this.$Progress.finish()
        return response
      }, error => {
        this.$Progress.fail()
        return Promise.reject(error)
      })
    }
  }
</script>

<style lang="scss">
  @import "./assets/bootstrap-custom";
  @import "~bootstrap/scss/bootstrap";
  @import "~bootstrap-vue/dist/bootstrap-vue";
</style>

<style scoped lang="scss">
  .container {
    min-height: calc(100vh - 56px);
  }
</style>
