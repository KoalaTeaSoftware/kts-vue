<template>
  <div id="app">
    <!--div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
    </div-->
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="/">Koala Tea Software</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item
              v-for="link in links"
              :key="link.id"
              :to="link.path"
          >{{ link.name }}
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'Navbar',
  data() {
    return {
      links: [
        {
          id: 0,
          name: 'Home',
          path: '/',
        },
        {
          id: 1,
          name: 'About',
          path: '/about',
        }
      ]
    }
  }
}

</script>

<style lang="scss">
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
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
