<template>
  <div class="bar-container">
    <audio :src="playUrl" controls ref="audioRef" style="display: none"></audio>
    <div class="playImg">
      <img :src="songInf.picUrl" alt="" style="width:100px;height:100px">
    </div>
    <div class="playControl">
      <button @click="playAudio">play?</button>
    </div>
    <div class="progress-bar-bg">
        <!-- <input type="range" @change="onChange" button-size="15px" v-model="value" /> -->
      </div>
      <div class="audio-time" style="min-height: 10px">
        <!-- <span class="audio-length-current" id="audioCurTime">{{videoStart}}</span>/
        <span class="audio-length-total">{{duration}}</span> -->
      </div>
  </div>
</template>

<script>
import {songDetailAPI} from '@/network/index.js'

export default {
  name: 'PlayerBar',
  data(){
    return {
      songInf: {},
      audioStatus: 'stop',
      // videoStart: '00:00',
      value: 0,
      isMounted: false
    }
  },
  methods: {
    playAudio(){
      // let audio = document.getElementsByName('audio')[0]
      let recordAudio = this.$refs.audioRef
      if(recordAudio.paused) {
        recordAudio.play()
        this.audioStatus = "run"
      }
      else{
        recordAudio.pause()
        this.audioStatus = "stop"
      }
      console.log(this.$store.state.playingId)
      songDetailAPI(this.$store.state.playingId).then(res => this.songInf = res)
      // console.log(this.$utils)
      // console.log(this.transTime(audio.currentTime))
      // console.log(this.transTime(audio.duration))
      // this.duration = this.$refs.audioRef.duration
    },
    transTime (value) {
      var time = "";
      var h = parseInt(value / 3600);
      value %= 3600;
      var m = parseInt(value / 60);
      m = m < 10 ? '0' + m : m
      var s = parseInt(value % 60);
      s = s < 10 ? '0' + s : s
      time = m + ":" + s;
      return time;
    },
  },
  computed: {
    playUrl() {
      console.log(2)
      const baseUrl =  'https://music.163.com/song/media/outer/url?id='
      return baseUrl + this.$store.state.playingId + '.mp3'
    },
    // videoStart(){
    //   if(!this.isMounted)
    //     return this.transTime(0);
    //   let audio = document.getElementsByName('audio')[0]
    //   return this.transTime(audio.currentTime)
    // },
    // duration(){
    //   if(!this.isMounted)
    //     return this.transTime(0);
    //   let audio = document.getElementsByName('audio')[0]  
    //   return this.transTime(audio.duration)
    // }
  },
  created(){
    console.log(1)
    songDetailAPI(this.$store.state.playingId).then(res => this.songInf = res)
  },
  mounted(){
    this.isMounted = true;
  }
}
</script>

<style scoped>
.bar-container {
  position: fixed;
  bottom: 0;
  height: 60px;
  width: 100%;
  background-color: yellowgreen;
  display: flex;
}

</style>