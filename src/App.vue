The App comprises two parts:
1. The nav bar
2. The view that has been dragged-up using the router

In the nav-bar, the toggleable="md" makes the hamburger appear on screens smaller than medium-sized

The  v-b-modal.auth-widget enables the clicking on the button to invoke the auth widget
<b-button v-b-modal.auth-widget></b-button>
But it not used now

<template>
  <div id="app">
    <b-navbar id="nav" toggleable="md" type="dark" variant="dark">
      <b-navbar-brand>Koala Tea Software
        <AuthWidget></AuthWidget>
      </b-navbar-brand>

      <b-navbar-toggle target="collapsibleNav"></b-navbar-toggle>

      <b-collapse id="collapsibleNav" is-nav>
        <b-navbar-nav>
          <b-nav-item
              v-for="link in routeList"
              :key="link.id"
              :to="link.path">
            {{ link.name }}
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <router-view/>
  </div>
</template>

<script>
// suck in the list of routes to be added to the nav bar
import {routes} from '@/router/routes'
import AuthWidget from "@/components/AuthWidget";

export default {
  data: function () {
    return {routeList: routes}
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
