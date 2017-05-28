<template>
  <div class="bg-primary">
    <b-navbar toggleable type="inverse" variant="primary" class="container">
      <b-nav-toggle target="nav_collapse"></b-nav-toggle>

      <b-link class="navbar-brand" to="/">
        <span>Inbox</span>
      </b-link>

      <b-collapse is-nav id="nav_collapse">
        <b-nav is-nav-bar class="ml-auto">
          <b-nav-item @click="logout">Log out</b-nav-item>
        </b-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
  import keycloak from '@/config/keycloak'

  export default {
    methods: {
      logout () {
        keycloak.logout({
          redirectUri: `${location.protocol}//${location.host}`
        })
      }
    }
  }
</script>
