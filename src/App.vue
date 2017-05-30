<template>
  <div id="app">
    <app-header></app-header>

    <div class="container">
      <router-view></router-view>
    </div>

    <vue-progress-bar></vue-progress-bar>
  </div>
</template>

<script>
  import axios from 'axios'
  import AppHeader from './components/Header'

  export default {
    name: 'app',
    components: {
      AppHeader
    },
    created () {
      axios.interceptors.request.use(config => {
        this.$Progress.start(1000 * 10)
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
