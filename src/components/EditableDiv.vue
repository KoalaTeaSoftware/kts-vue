Anyone that is logged-in will be able to edit, therefore, only editors should have credentials that let them log in

As this is using Vue.js version 2x, the v-html attribute is needed to get the string that is read displayed as html in the div

<template>
  <div class="editableDiv">
    <div :id="this.identity"
         :class="{'isEditable': this.currentUser}"
         @dblclick="editMe"
         v-html="currentContents"
    ></div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: 'EditableDiv',
  props: {
    identity: name
  },
  data() {
    return {
      name: "EditableDiv",
      busy: true,
      currentUser: null,
      currentContents: "Loading ....",
    }
  },
  methods: {
    // mungeTitle(inString) {
    //   return inString.replace(/-/g, ' ')
    // },
    editMe() {
      if (firebase.auth().currentUser)
        alert("Edit called for")
      else
        alert("You can't edit me")
    }
  },
  created() {
    // console.log("updated the editable div")
    this.currentUser = firebase.auth().currentUser
    // console.log("finding for " + this.identity)
    firebase.firestore()
        .collection("pages")
        .where("pageName", "==", this.identity)
        .get()
        .then(querySnapshot => {
          this.busy = false
          // console.log("Got the following");
          // console.log(querySnapshot.docs[0].data().contents);
          this.currentContents = querySnapshot.docs[0].data().contents
          // const readMD = querySnapshot.docs[0].data().contents;
        })
        .catch(function (error) {
          console.log(`Unable to get, or show the page ${this.identity}: ${error}.`);
          this.currentContents = "Failed to load the contents of this page."
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
