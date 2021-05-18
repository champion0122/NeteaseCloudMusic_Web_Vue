<template>
  <div id="app">
    <div>
      <nav-bar/>
      <router-view />
    </div>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar"
import MyMusicDiscover from "@/views/myMusic/MyMusicDiscover"

export default {
  name: 'app',
  components: {
    NavBar,
    MyMusicDiscover
  },

}
</script>

<style>

</style>
