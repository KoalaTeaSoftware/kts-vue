<template>
  <div class="about">
    <h1>This is an about page</h1>
    <p @click.alt="greet('wtf?', $event)">Click me</p>
  </div>
</template>

<script>
export default {
  methods: {
    greet: (msg, e) => {
      console.log(msg)
      alert(`msg ${e.target.tagName}` )
    }
  }
}
</script>
