<template>
  <div>
    <button @click="lyricClick">歌词</button>
    <div class="lyric-outer">
      <p
        :class="{ lyric, actived: activeIndex === key }"
        v-for="(line, key) in lyric"
        :key="key"
      >
        {{ line.content }}
      </p>
    </div>
  </div>
</template>

<script>
import { lyricAPI } from "@/network/index";


export default {
  name: 'Lyric',
  data(){
    return {
      lyric: "",
      activeIndex: 0
    }
  },
  methods: {
      
    lyricClick() {
      lyricAPI(this.$store.state.playingId).then((res) => {
        this.lyric = this.parseLyric(res.data.lrc.lyric)
        // this.lyric = res.data.lrc.lyric
        console.log(this.lyric)
        let lyricCon = document.querySelector('.lyric-outer')
        this.changeStyle()
    //     var conp = document.querySelector('.lyric-outer')
		// // 包裹歌词的元素容器
    //     lyrics.lyticsEnd(conp) // 重置对象
    //     lyrics.parse(this.lyric, conp) // 解析歌词  this.lyrics 代表歌词数据
    //     lyrics.addcontent(conp) // 向元素容器中添加歌词内容
    //     lyrics.gundong(conp) // 歌词滚动函数
        });
    },
    parseLyric(text) {
      //按行分割歌词
      let lyricArr = text.split("\n"); //console.log(lyricArr)
      //0: "[ti:爱在西元前]" "[ar:周杰伦]"...
      let result = [];
      //新建一个数组存放最后结果
      //遍历分割后的歌词数组，将格式化后的时间节点，歌词填充到result数组
      for (let i = 0; i < lyricArr.length; i++) {
        let playTimeArr = lyricArr[i].match(/\[\d{2}:\d{2}((\.|\:)\d{2,3})\]/g);
        //正则匹配播放时间
        let lineLyric = "";
        if (lyricArr[i].split(playTimeArr).length > 0) {
          lineLyric = lyricArr[i].split(playTimeArr);
        }
        if (playTimeArr != null) {
          for (let j = 0; j < playTimeArr.length; j++) {
            let time = playTimeArr[j]
              .substring(1, playTimeArr[j].indexOf("]"))
              .split(":"); //数组填充
            result.push({
              time: (parseInt(time[0]) * 60 + parseFloat(time[1])).toFixed(4),
              content: String(lineLyric).substr(1),
            });
          }
        }
      }
      return result;
    },
    changeStyle(){
      let myaudio = document.querySelector('.recordAudio')
      let lyricOuter = document.querySelector('.lyric-outer')
      let activedP = document.getElementsByClassName('actived')[0]
      // clearInterval(gdtimer)
      this.gdtimer = setInterval(() => {
      let second = myaudio.currentTime
      for(let i  = 0;i < this.lyric.length ;i++){
        if(second >= this.lyric[i].time && this.lyric[i+1].time >= second){
          this.activeIndex = i
        }
      }
      console.log(lyricOuter.scrollTop)
      console.log(activedP)
      if(this.activeIndex > 5)
        lyricOuter.scrollTop = (this.activeIndex - 4) * 32//实现滚动
      if(second == undefined)
        clearInterval(gdtimer)
      }
      
    , 50)
    }
  }
};
</script>

<style>
.lyric-outer {
  height: 900px;
  overflow: scroll;
  text-align: center;
  line-height: 2;
}

.actived {
  font-size: 18px;
  color: aqua;
}
</style>