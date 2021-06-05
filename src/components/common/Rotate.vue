<template>
  <div class="rotate-container">
    <div class="outer">
      <img :src="picUrl" alt="" />
    </div>
    <button @click="changeImg">!!!!</button>
  </div>
</template>

<script>
import { songDetailAPI } from "@/network/index.js";

export default {
  name: 'Rotate',
  data(){
    return {
      picUrl: ''
    }
  },
  methods:{
    changeImg(){
      songDetailAPI(this.$store.state.playingId).then(
        (res) =>  this.picUrl = res.picUrl
      );
    }
  },
  computed: {
    // picUrl() {
    //   console.log(2);
    //   return songDetailAPI(this.$store.state.playingId).then(
    //     (res) =>  res.picUrl
    //   );
    // },
  }
};
</script>

<style>
@keyframes rotate360 {
  from {
  }
  to {
    transform: rotate(360deg);
  }
}
.rotate-container {
  width: 320px;
  height: 320px;
  background-color: #f5f5f5;
  border-radius: 50%;
  z-index: 2;
  position: relative;
}
.outer {
  width: 95%;
  height: 95%;
  background-color: #090a0d;
  border-radius: 50%;
  position: absolute;
  left: 2.5%;
  top: 2.5%;
}
.outer img {
  width: 50%;
  height: 50%;
  border-radius: 50%;
  overflow: hidden;
  position: absolute;
  left: 25%;
  top: 25%;
  /* transform: rotate(360deg);
  transition:transform 2s; */
  /* 匀速 linear */
  animation: rotate360 10s infinite linear;
}
</style>