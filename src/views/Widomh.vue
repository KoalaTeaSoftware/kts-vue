<template>
  <div class="about">
    <h1>What I Did On My Holidays</h1>
    <p @click.alt="greet('wtf?', $event)">Click me</p>
  </div>
</template>

<script>
export default {
  methods: {
    greet: (msg, e) => {
      console.log(msg)
      alert(`${msg} ${e.target.tagName}`)
    }
  }
}
</script>
