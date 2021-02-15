This component uses a name property that gives the div that wraps it an ID attribute. This could be used by CSS.

The VueShowdown component is detailed in various places
* https://github.com/showdownjs/showdown/wiki/Showdown's-Markdown-syntax
* https://vue-showdown.js.org/

NOTE: Anyone that is logged-in will be able to edit, therefore use the Firebase console to ensure that only editors
have credentials that allow them log in

<template>
  <div :id="this.identity"
       :class="{'isEditable': this.currentUser}"
       @dblclick="editMe"
  >
    <b-spinner small v-show="busy" class="loadingSpinner"></b-spinner>
    <span class="sr-only" v-show="busy">Loading...</span>
    <myNameForMdPanel
        class="container"
        flavor="github"
        :options="{ emoji: true, tasklists : true }"
        :markdown=this.mdVersion
    />
    <b-modal id="page-editor">
      <div contenteditable="true">{{ mdVersion }}</div>
    </b-modal>
  </div>
</template>

<script>
import firebase from "firebase";
import {VueShowdown} from 'vue-showdown';

export default {
  props: {identity: String},
  components: {'myNameForMdPanel': VueShowdown},
  data() {
    return {
      busy: true,
      currentUser: null,
      mdVersion: "Loading ...."
    }
  },
  methods: {
    editMe() {
      if (firebase.auth().currentUser)
        this.$bvModal.show('page-editor')
      else
        alert("You can't edit me")
    }
  },
  created() {
    this.currentUser = firebase.auth().currentUser
    firebase.firestore()
        .collection("pages")
        .where("pageName", "==", this.identity)
        .get()
        .then(querySnapshot => {
          this.busy = false
          this.mdVersion = querySnapshot.docs[0].data().contents
        })
        .catch(function (error) {
          console.log(`Unable to get, or show the page: ${error}.`);
          this.mdVersion = "Failed to load the contents of this page."
        });
  }
}
</script>

<style scoped>
.isEditable {
  background-image: url("../assets/pencil.svg");
  background-repeat: no-repeat;
  background-size: 2rem;
  background-position: .5rem .5rem;
}

h1 {
  text-transform: capitalize
}
</style>
