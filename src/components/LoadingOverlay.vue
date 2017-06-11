<template>
  <div class="blanket" v-show="loading">
    <dot-loader class="spinner" :loading="loading" color="#90a959"></dot-loader>
  </div>
</template>

<script>
  import bus from '@/event-bus'
  import DotLoader from './DotLoader'

  export default {
    components: {
      DotLoader
    },
    data: () => ({
      loading: false
    }),
    created () {
      bus.$on('loading', loading => { this.loading = loading })
    }
  }
</script>

<style scoped lang="scss">
  .blanket {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    z-index: 1;
  }

  .spinner {
    position: absolute;
    left: 50%;
    top: calc(50% - 66px);
    transform: translateX(-50%) translateY(-50%);
  }
</style>
