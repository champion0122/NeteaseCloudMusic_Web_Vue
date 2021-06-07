<template>
  <div id="app">
    <div class="main-content">
      <nav-bar/>
      <router-view />
    </div>
    <player-bar></player-bar>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar"
import PlayerBar from "@/components/player/PlayerBar"

export default {
  name: 'app',
  components: {
    NavBar,
    PlayerBar
  },

}
</script>

<style>
.main-content {
  margin-bottom: 100px;
}
.blank {
  height: 200px;
}
</style>
