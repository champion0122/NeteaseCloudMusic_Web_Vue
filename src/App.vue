<template>
  <div id="app">
    <div class="main-content" >
      <nav-bar/>
      <div>
        <router-view />
        </div>
    </div>
    <div class="main-content" >
      <Comments/>
    </div>
    <player-bar></player-bar>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar"
import PlayerBar from "@/components/player/PlayerBar"
import Comments from "@/components/Comments"

export default {
  name: 'app',
  components: {
    NavBar,
    PlayerBar,
    Comments
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
