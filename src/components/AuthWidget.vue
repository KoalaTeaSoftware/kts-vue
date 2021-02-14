This widget comprises:
1. an indication whether the user is logged-in, or not
- this will always generate something to suit one of the two options
2. Forms to allow the user to log in / out
- The appropriate form is shown according to whether the user is logged-in or not
- if login fails for some reason, the user gets some sort of response
<template>
  <div class="auth-widget">
    <span v-if="currentUserAddress"
          @click="$bvModal.show('auth-widget')">{{ currentUserAddress }}</span>
    <img v-else src="@/assets/personWhite.svg"
         @dblclick="$bvModal.show('auth-widget')"
         alt="Anonymous user icon">

    <b-modal id="auth-widget" title="User Authentication" hide-footer>

      <b-form v-if=this.currentUser id="log-out" @submit="logOut">
        <b-button type="submit" variant="primary" :disabled=this.busy>
          Log Out&nbsp;<b-spinner small v-show="busy" class="loadingSpinner"></b-spinner>
          <span class="sr-only">Loading...</span>
        </b-button>
      </b-form>

      <b-form v-else id="login-form" @submit="logIn">
        <b-form-group label="Email Address:" label-for="addressField">
          <b-form-input
              id="addressField"
              v-model="creds.email"
              type="email"
              placeholder="a@b.com"
              required></b-form-input>
        </b-form-group>
        <b-form-group label="Password:" label-for="pwdField">
          <b-form-input
              id="pwdField"
              v-model="creds.pwd"
              type="password"
              required></b-form-input>
        </b-form-group>
        <p v-show="responseMsg" :class="responseIsGood ? 'bg-success' : 'bg-warning'">{{ responseMsg }}</p>
        <b-button type="submit" variant="primary" :disabled=this.busy>
          Log In&nbsp;<b-spinner small v-show="busy" class="loadingSpinner"></b-spinner>
          <span class="sr-only">Loading...</span>
        </b-button>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import {BSpinner} from 'bootstrap-vue'
import firebase from "firebase";

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
      responseIsGood: false,
      currentUser: null,
      currentUserAddress: ""
    }
  },
  methods: {
    logOut(e) {
      e.preventDefault();
      this.creds.email = ""
      this.creds.pwd = ""
      firebase.auth().signOut()
          .then((success) => {
            console.log("Log Out: Appears to have done it >" + success + "<");
            this.responseIsGood = true
            this.responseMsg = "Logged Out"
          })
          .catch(reason => {
            console.log("Log Out: Crashed logging user out >" + reason.code + "< >" + reason.message + "<");
          })
      this.currentUser = null
    },
    logIn(e) {
      e.preventDefault();
      if (document.getElementById('login-form').reportValidity()) {
        this.busy = true
        //https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signinwithemailandpassword
        firebase.auth().signInWithEmailAndPassword(this.creds.email, this.creds.pwd)
            .then(() => {
              this.currentUser = firebase.auth().currentUser
              this.busy = false
              this.responseIsGood = true
              this.responseMsg = "Logged in"
              this.$bvModal.hide('auth-widget')
              console.log(`logged in the current user ${this.currentUser.email}`)
            })
            .catch(reason => {
              this.currentUser = null
              this.busy = false
              this.responseIsGood = false
              switch (reason.code) {
                case 'auth/expired-action-code': //Thrown if the action code has expired.
                case 'auth/invalid-action-code': //Thrown if the action code is invalid. This can happen if the code is malformed or has already been used.
                  this.responseMsg = 'Unable to log in. Please try again later.'
                  break;
                case 'auth/user-disabled':       //Thrown if the user corresponding to the given action code has been disabled.
                case 'auth/user-not-found':
                case "auth/wrong-password":
                  this.responseMsg = 'Unable to log in using those credentials.';
                  break;
                default:
                  console.log("login: Crashed logging user in >" + reason.code + "< >" + reason.message + "<");
                  this.responseMsg = 'Unable to log in. Something went wrong';
              }
            })
      }
    }
  },
  components: {
    BSpinner
  },
  created: function () {
    firebase.auth().onAuthStateChanged(user => {
      console.log("Auth state has changed")
      this.currentUser = firebase.auth().currentUser
      if (this.currentUser) {
        console.log(`Current user is now ${this.currentUser.email}`)
        this.currentUserAddress = this.currentUser.email
      } else {
        console.log("Current user is undefined")
        this.currentUserAddress = ""
      }
    })
  }
}
</script>

<style scoped>
div {
  display: inline-block;
  font-size: x-small;
  font-style: italic;
}

.loadingSpinner {
  margin-left: 0.25rem;
}
</style>
