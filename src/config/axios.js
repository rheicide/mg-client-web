import 'es6-promise/auto'
import promiseFinally from 'promise.prototype.finally'
import axios from 'axios'
import keycloak from './keycloak'
import router from '../router'

promiseFinally.shim()

axios.defaults.baseURL = 'https://mg-client-api.elarvee.xyz'

axios.interceptors.request.use(async config => {
  await new Promise((resolve, reject) => {
    keycloak.updateToken()
      .success(() => {
        config.headers.common['Authorization'] = 'Bearer ' + keycloak.token
        resolve()
      })
      .error(() => {
        keycloak.logout({
          redirectUri: `${location.protocol}//${location.host}`
        })
        reject(new axios.Cancel('Could not refresh token'))
      })
  })

  return config
})

axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status === 403) {
    console.log('Received 403 from server, redirecting to /')
    router.push('/')
  }

  return Promise.reject(error)
})
