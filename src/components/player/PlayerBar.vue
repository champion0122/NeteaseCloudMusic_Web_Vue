<template>
  <div class="bar-container">
    <div class="bar-left" v-show="$store.state.playingId">
    <div class="playImg">
      <img :src="songInf.picUrl" alt="" style="width:40px;height:40px">
    </div>
    <div class="content">
      <p class="name">
        <span class="alname">{{songInf.name}}<span class="artist"> - {{songInf.artist}}</span></span>
      </p>
      <p class="time">
        <span class="dialogAudioTime">{{time}} / {{duration}}</span>
      </p>
    </div>
    </div>
    <div class="mini-player" id="mini-player">
    <div class="dialogDetailAudio" onselectstart="return false">
      <!-- <img class="dialogAudioPlay" :src="audioImg" title="播控" @click="playAudio"> -->
      <button @click="playAudio">播控</button>
      <!-- <span class="dialogAudioTime">{{time}}</span> -->
      <div class="dialogAudioProgress" ref="dialogAudioProgress" @mousedown="controlAudioProgress($event)">
        <span class="progressDot" :style="dotStyle"></span>
        <span class="bar" :style="progressStyle"></span>
      </div>
      <!-- <span class="dialogAudioDuration">{{duration}}</span> -->
      <!-- <img class="dialogAudioListen" :src="dialogAudioListen" title="静音" @click="listenDialogAudio"> -->
      <audio ref="recordAudio" class="recordAudio" type="audio/mpeg" 
        @canplay="canPlay" @timeupdate="timeUpdate" @ended="onEnded" :src="audioUrl" autoplay>
      </audio>
    </div>
  </div>
  </div>
</template>

<script>
import { songDetailAPI } from "@/network/index.js";

export default {
  name: "PlayerBar",
  data() {
    return {
      songInf: {},
      time: "00:00",
      duration: "00:00",
      progressStyle: { width: "" },
      dotStyle: { left: "" },
    };
  },
  methods: {
    playAudio() {
      let recordAudio = this.$refs.recordAudio; //获取audio元素
      if (recordAudio.paused) {
        recordAudio.play();
        this.audioStatus = "run";
      } else {
        recordAudio.pause();
        this.audioStatus = "stop";
      }
      console.log(this.$store.state.playingId);
    },
        //鼠标点击移动播放进度
    controlAudioProgress(event) {
      let audio = this.$refs.recordAudio;
      let dialogAudioProgress = this.$refs.dialogAudioProgress;
      if (!audio.paused || audio.currentTime != 0) {
        let pgsWidth = parseFloat(window.getComputedStyle(dialogAudioProgress, null).width.replace('px', ''));
        let rate = event.offsetX / pgsWidth;
        audio.currentTime = audio.duration * rate;
        this.timeUpdate();
      }
    },
    //进度条更新
    timeUpdate() {
      this.duration = this.transTime(this.$refs.recordAudio.duration);
      let timeStr = parseInt(this.$refs.recordAudio.currentTime);
      this.time = this.transTime(timeStr);
      let scales = this.$refs.recordAudio.currentTime / this.$refs.recordAudio.duration;
      this.progressStyle.width = scales * 100 + '%';
      this.dotStyle.left = scales * 100 + '%';
    },

    //播放结束
    onEnded() {
      // this.audioImg = "./dialogDetailPlay.png";
      this.time = "00:00";
      this.progressStyle.width = 0;
      this.dotStyle.left = 0;
    },

    //用户可以开始播放audio
    canPlay() {
      //获取audio音频文件总时长 并设置到界面并解决出现 NAN 的问题
      this.duration = this.transTime(this.$refs.recordAudio.duration);
    },

    //时间转换
    transTime(value) {
      let time = "";
      let h = parseInt(value / 3600);
      value %= 3600;
      let m = parseInt(value / 60);
      let s = parseInt(value % 60);
      if (h > 0) {
        time = this.formatTime(h + ":" + m + ":" + s);
      } else {
        time = this.formatTime(m + ":" + s);
      }
      return time;
    },

    //时间格式化
    formatTime(value) {
      let time = "";
      let s = value.split(':');
      let i = 0;
      for (; i < s.length - 1; i++) {
        time += s[i].length == 1 ? ("0" + s[i]) : s[i];
        time += ":";
      }
      time += s[i].length == 1 ? ("0" + s[i]) : s[i];
      return time;
    }
  },
  computed: {
    audioUrl() {
      console.log(2);
      songDetailAPI(this.$store.state.playingId).then(
        (res) => (this.songInf = res)
      );
      const baseUrl = "https://music.163.com/song/media/outer/url?id=";
      return baseUrl + this.$store.state.playingId + ".mp3";
    },
  },
  mounted() {
    this.isMounted = true;
  },
};
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
.bar-left {
  display: flex;
}
.playImg {
  position: relative;
  width: 50px;
  height: 60px;
}

.alname{
  font-size: 14px;
}
.artist{
  font-size: 12px;
  color: grey;
}
.playImg img{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border-radius: 5px;
}
.content {
  margin-top: 10px;
  width: 200px;
  white-space: nowrap;
  /* text-overflow: ellipsis; */
}

.time{
  color: grey;
  font-size: 10px;
  margin-top: 8px;
}

.mini-player {
  position: fixed;
  left: 320px;
}
.dialogDetailAudio {
  width: 550px;
  height: 60px;
  /* line-height: 49px; */
  /* background: rgba(255, 255, 255, 1); */
  /* box-shadow: 0px 5px 30px 0px rgba(29, 34, 54, 0.18); */

  /* border-radius: 6px; */
}

.dialogAudioPlay {
  display: inline-block;
  position: relative;
  top: 6px;
  margin-left: 15px;
  cursor: pointer;
  width: 23px;
  height: 23px;
}


.dialogAudioProgress {
  display: inline-block;
  width: 400px;
  height: 2px;
  background: #F5F5F6;
  border-radius: 1px;
  margin-left: 12px;
  margin-top: 30px;
  position: relative;
}

.progressDot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  background-color: #D33A30;
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -5px;
  margin-left: -5px;
  cursor: pointer;
}

.bar {
  height: 100%;
  background: #D33A30;
  border-radius: 3px;
  display: inline-block;
  position: absolute;
}

.dialogAudioDuration {
  margin-left: 11px;
  font-size: 11px;
  font-weight: 400;
  color: rgba(34, 34, 34, 1);
}

.dialogAudioListen,
.dialogAudioDownload {
  width: 16px;
  height: 13px;
  cursor: pointer;
}

.dialogAudioListen {
  margin-left: 8px;
}

.dialogAudioDownload {
  margin-left: 5px;
}
</style>