<template>
  <b-modal id="auth-widget" title="Sign In" hide-footer>
    <b-form @submit="logIn">
      <b-form-group
          id="adGroup"
          label="Email Address:"
          label-for="addressField">
        <b-form-input
            id="addressField"
            v-model="creds.email"
            type="email"
            placeholder="a@b.com"
            required></b-form-input>
      </b-form-group>
      <b-form-group
          id="pwdGroup"
          label="Password:"
          label-for="pwdField"
      >
        <b-form-input
            id="pwdField"
            v-model="creds.pwd"
            type="password"
            required></b-form-input>
      </b-form-group>
      <p class="serverResponse" v-show="responseMsg"
         :class="responseIsGood ? 'bg-success' : 'bg-warning'">{{ responseMsg }}
      </p>
      <b-button type="submit" variant="primary" :disabled=this.busy>
        Log In&nbsp;<b-spinner small v-show="busy" class="loadingSpinner"></b-spinner>
        <span class="sr-only">Loading...</span>
      </b-button>
    </b-form>
  </b-modal>
</template>

<script>
import {BSpinner} from 'bootstrap-vue'

export default {
  name: 'AuthWidget',
  data() {
    return {
      creds: {
        email: '',
        pwd: ''
      },
      busy: false,
      responseMsg: "",
      responseIsGood: false
    }
  },
  methods: {
    logIn(e) {
      e.preventDefault();
      this.busy = true
      alert(JSON.stringify(this.creds))
      this.responseMsg = "wtf?"
      this.responseIsGood = true
    }
  },
  components: {
    BSpinner
  }
}
</script>

<style scoped>
.loadingSpinner {
  margin-left: 0.25rem;
}
</style>
