import Keycloak from 'keycloak-js'

const keycloak = Keycloak({
  url: 'https://sec.elarvee.xyz/auth',
  realm: 'master',
  clientId: 'mailgun-client-web'
})

export default keycloak
