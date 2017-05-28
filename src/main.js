// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import BootstrapVue from 'bootstrap-vue'

import './config/axios'
import keycloak from './config/keycloak'

Vue.config.productionTip = false
Vue.use(BootstrapVue)

keycloak.init({
  onLoad: 'login-required'
}).success(authenticated => {
  if (authenticated) {
    /* eslint-disable no-new */
    new Vue({
      el: '#app',
      router,
      template: '<App/>',
      components: {App}
    })
  }
})
