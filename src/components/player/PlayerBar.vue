<template>
  <div class="bar-container">
    <audio :src="playUrl" controls ref="audioRef" style="display: none"></audio>
    <div class="playImg">
      <img :src="songInf.picUrl" alt="" style="width:100px;height:100px">
    </div>
    <div class="playControl">
      <button @click="playAudio">play?</button>
    </div>
  </div>
</template>

<script>
import {songDetailAPI} from '@/network/index.js'

export default {
  name: 'PlayerBar',
  data(){
    return {
      songInf: {}
    }
  },
  methods: {
    playAudio(){
      let recordAudio = this.$refs.audioRef
      if(recordAudio.paused) {
        recordAudio.play()
      }
      else{
        recordAudio.pause()
      }
    }
  },
  computed: {
    playUrl() {
      const baseUrl =  'https://music.163.com/song/media/outer/url?id='
      return baseUrl + this.$store.state.playingId + '.mp3'
    }
  },
  created(){
    songDetailAPI(this.$store.state.playingId).then(res => this.songInf = res)
  }
}
</script>

<style>
.bar-container {
  position: fixed;
  bottom: 0;
  height: 60px;
  width: 100%;
  background-color: yellowgreen;
  display: flex;
}
</style>