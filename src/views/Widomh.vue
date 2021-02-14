This is just a stub at the moment

<template>
  <div class="about">
    <h1>What I Did On My Holidays</h1>
    <EditableDiv identity="about"></EditableDiv>
  </div>
</template>

<script>
import EditableDiv from "@/components/EditableDiv";
export default {
  components: {EditableDiv},
  methods: {
    greet: (msg, e) => {
      console.log(msg)
      alert(`${msg} ${e.target.tagName}`)
    }
  }
}
</script>
