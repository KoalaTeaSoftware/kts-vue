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
        :markdown=this.displayVersion
        style="text-align: left"
    />
    <b-modal id="page-editor" size="xl" title="Editing the Page Contents">
      <div v-show="this.serverError" class="bg-warning">{{ serverError }}</div>
      <pre id="md-editing-area" contenteditable="true">{{ editVersion }}</pre>
      <template #modal-footer="{ ok, cancel }">
        <b-button size="lg" variant="outline-primary" @click="preview()">Preview</b-button>
        <b-button size="sm" variant="warning" @click="publish()">Publish</b-button>
      </template>
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
      displayVersion: "",
      editVersion: "Loading ....",
      docId: null,
      serverError: ""
    }
  },
  methods: {
    preview() {
      const editBlock = document.getElementById("md-editing-area")
      this.displayVersion = editBlock.innerText
      this.$bvModal.hide("page-editor")
    },
    publish() {
      this.busy = true
      firebase.firestore()
          .collection("pages")
          .doc(this.docId)
          .update({contents: this.displayVersion})
          .then(() => {
            this.busy = false
            console.log("Document Saved")
            this.$bvModal.hide("page-editor")
          })
          .catch(e => {
            this.busy = false
            this.serverError = e.message
            console.log("Unable to store the new data for page " + this.identity + ":" + e.message + ".");
          })
    },
    editMe() {
      if (firebase.auth().currentUser) {
        this.editVersion = this.displayVersion
        this.$bvModal.show('page-editor')
      } else
        alert("You can't edit me")
    }
  },
  mounted() {
    this.currentUser = firebase.auth().currentUser
    firebase.firestore()
        .collection("pages")
        .where("pageName", "==", this.identity)
        .get()
        .then(querySnapshot => {
          this.busy = false
          this.displayVersion = querySnapshot.docs[0].data().contents
          this.docId = querySnapshot.docs[0].id
          this.editVersion = this.displayVersion
        })
        .catch(function (e) {
          console.log(`Unable to get, or show the page: ${e.message}.`);
        })
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

pre {
  white-space: pre-wrap; /* css-3 */
  white-space: -moz-pre-wrap; /* Mozilla, since 1999 */
  /*   white-space: -pre-wrap; Opera 4-6 */
  white-space: -o-pre-wrap; /* Opera 7 */
  word-wrap: break-word; /* Internet Explorer 5.5+ */
}

</style>
