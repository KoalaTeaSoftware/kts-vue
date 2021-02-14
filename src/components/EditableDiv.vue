Anyone that is logged-in will be able to edit, therefore, only editors should have credentials that let them log in

<template>
  <div class="editableDiv">
    <span class="sr-only">Loading...</span>
    <div :id="this.identity"
         :class="{'isEditable' : this.currentUser}">
      <h1>{{ identity }}</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi mattis nulla in lectus dapibus interdum. Duis
        tempus ac diam id placerat. Aliquam vitae lacinia dolor, quis imperdiet nibh. Curabitur vitae interdum sapien.
        Duis iaculis dui sed est lobortis euismod. Nullam mollis euismod lacus, et consectetur mi suscipit eu. Aliquam
        erat volutpat. Sed urna dui, commodo quis venenatis eu, feugiat sed mi. Vestibulum ante ipsum primis in faucibus
        orci luctus et ultrices posuere cubilia curae; Donec eget volutpat lectus, sed interdum nisl. Nulla facilisi.
        Aliquam eu velit scelerisque, tincidunt arcu nec, aliquet nisl.
      </p>
      <p> In feugiat dictum est congue tempor. Cras sagittis feugiat ipsum, vitae consectetur lacus placerat eget. Sed
        faucibus, enim quis tristique condimentum, ipsum ipsum commodo justo, et rhoncus mi quam quis ipsum. Maecenas
        leo lorem, ornare vel nunc a, suscipit pulvinar mauris. Nulla enim dolor, faucibus non rhoncus id, elementum in
        nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc neque
        turpis, laoreet in dapibus eget, porta et augue. Vivamus eu arcu sed est vestibulum efficitur eget ac enim.
        Suspendisse potenti. Vestibulum suscipit vulputate ornare.
      </p>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  name: "EditableDiv",
  busy: false,
  currentUser: firebase.auth().currentUser,
  props: {
    identity: name
  },
  methods: {
    editMe() {
    }
  }
}
</script>

<style scoped>
.isEditable {
  background-image: url("/src/assets/pencil.svg");
  background-repeat: no-repeat;
}
</style>
