<template>
  <div id="app">
    <b-navbar id="nav" toggleable="md" type="dark" variant="dark">
      <b-navbar-brand>
        <b-button v-b-modal.auth-widget>Koala Tea Software</b-button>
      </b-navbar-brand>

      <b-navbar-toggle target="collapsibleNav"></b-navbar-toggle>

      <b-collapse id="collapsibleNav" is-nav>
        <b-navbar-nav>
          <b-nav-item
              v-for="link in routes"
              :key="link.id"
              :to="link.path">
            {{ link.name }}
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
    <AuthWidget></AuthWidget>
  </div>
</template>

<script>
// suck in the list of routes to be added to the nav bar
import {routes} from '@/router/routes'
import AuthWidget from "@/components/AuthWidget";

export default {
  data: function () {
    return {routes}
  },
  components: {
    AuthWidget
  }
}
</script>

<style lang="scss">
$nav-link-color: gainsboro;
$nav-link-active-color: white;

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $nav-link-color;

    &.router-link-exact-active {
      color: $nav-link-active-color;
    }
  }

  .navbar-brand {
    button {
      color: $nav-link-active-color;
      background-color: inherit;
      border-color: transparent;
      cursor: default;
    }
  }
}
</style>
