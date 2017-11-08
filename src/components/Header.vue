<template>
  <div class="bg-primary">
    <b-navbar toggleable="md" type="dark" variant="primary" class="container">
      <b-navbar-brand to="/">Inbox</b-navbar-brand>

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav class="ml-auto">
          <b-nav-item @click="logout">Log out</b-nav-item>
        </b-navbar-nav>
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
