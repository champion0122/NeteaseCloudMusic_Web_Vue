<template>
  <div id="app">
    <div>
      <nav-bar/>
      
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar"
import request from "@/network/request.js"

export default {
  name: 'app',
  components: {
    NavBar
  },

}
</script>

<style>

</style>
