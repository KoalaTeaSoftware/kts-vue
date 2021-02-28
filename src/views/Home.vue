For the TagCloud see https://www.goat1000.com/tagcanvas.php

<template>
  <div class="home">
    <h1>Hello </h1>
    <div id="myCanvasContainer">
      <canvas width="300" height="300" id="myCanvas">
        <p>Anything in here will be replaced on browsers that support the canvas element</p>
        <ul>
          <li><a @click="tpu" href="#">Google</a></li>
          <li><a @click="tpu" href="#">Fish</a></li>
          <li><a @click="tpu" href="#">Chips</a></li>
          <li><a @click="tpu" href="#">Salt</a></li>
          <li><a @click="tpu" href="#">Vinegar</a></li>
        </ul>
      </canvas>
    </div>
    <p>{{ selection }}</p>
  </div>
</template>


<script>
// noinspection ES6UnusedImports
import TagCloud from '@/assets/tagcanvas.min'

export default {
  data() {
    return {
      selection: ""
    }
  },
  methods: {
    tpu: function (s) {
      console.log(s.target.innerText)
      this.selection = s.target.innerText
      return false
    }
  },
  mounted() {
    console.log("mounted")
    try {
      TagCanvas.Start('myCanvas');
    } catch (e) {
      // something went wrong, hide the canvas container
      document.getElementById('myCanvasContainer').style.display = 'none';
    }
  }
}
</script>
