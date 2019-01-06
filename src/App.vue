<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  background-color: black;
  /* margin-top: 60px; */
  height: 100vh;
}
.container-fluid {
  padding: 0px;
}
@media (max-width: 797px) {
  body {
    padding-left: 0px;
    padding-right: 0px;
  }
}
.bg-pttblue {
  background-color: rgb(13, 16, 100);
}
.text-pttyellow {
  color: rgb(255, 253, 114);
}
.text-ptttextgray {
  color: rgb(169, 167, 170);
}
.text-pttinputgray {
  color: rgb(128, 127, 128);
}
</style>
