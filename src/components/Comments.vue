<template>
  <div class="comment-container">
    <button @click="lyricClick">歌词</button>
    <div class="lyric-outer">
      <p :class="{lyric, actived: activeIndex === key}" v-for="line,key in lyric" :key="key">
        {{line.content}}
      </p>

    </div>
    <ul class="comment-list">
      <h2>热评</h2>
      <li
        v-for="(item, key) in commentsList.hotComments"
        :key="key"
        class="comment-li"
      >
        <div class="avatar">
          <img
            :src="item.user.avatarUrl"
            alt=""
            style="
              display: inline-block;
              width: 40px;
              height: 40px;
              border-radius: 50%;
            "
          />
        </div>
        <div class="comment-text">
          <p>
            <span class="username">{{ item.user.nickname }}: </span>
            <span class="text">{{ item.content }} </span>
          </p>
        </div>
        <div class="bottom">
          <span class="date">{{ timetrans(item.time) }}</span>
          <div class="actions">
            <i class="icon-like"></i>
            {{ item.likedCount }}
          </div>
        </div>
      </li>
      <h2>评论</h2>
      <li
        v-for="(item, key) in commentsList.comments"
        :key="key"
        class="comment-li"
      >
        <div class="avatar">
          <img
            :src="item.user.avatarUrl"
            alt=""
            style="
              display: inline-block;
              width: 40px;
              height: 40px;
              border-radius: 50%;
            "
          />
        </div>
        <div class="comment-text">
          <p>
            <span class="username">{{ item.user.nickname }}: </span>
            <span class="text">{{ item.content }} </span>
          </p>
        </div>
        <div class="bottom">
          <span class="date">{{ timetrans(item.time) }}</span>
          <div class="actions">
            <i class="icon-like"></i>
            {{ item.likedCount }}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { songCommentsAPI, lyricAPI } from "@/network/index";
import lyrics from '@/utils/lyric'   

export default {
  name: "Comments",
  data() {
    return {
      commentsList: {},
      lyric: "",
      activeIndex: 0
    };
  },
  methods: {
    showComments() {
      songCommentsAPI(this.$store.state.playingId).then(
        (res) => (this.commentsList = res.data)
      );
    },
    timetrans(date) {
      var date = new Date(date); //如果date为13位不需要乘1000
      var Y = date.getFullYear() + "-";
      var M =
        (date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1) + "-";
      var D =
        (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
      var h =
        (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
      var m =
        (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
        ":";
      var s =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      return Y + M + D + h + m + s;
    },
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
      this.gdtimer = setInterval(() => {
      let second = myaudio.currentTime
      for(let i  = 0;i < this.lyric.length ;i++){
        if(second >= this.lyric[i].time && this.lyric[i+1].time >= second){
          this.activeIndex = i
        }
      }
      console.log(lyricOuter.scrollTop)
      if(this.activeIndex > 5)
        lyricOuter.scrollTop = (this.activeIndex - 4) * 32//实现滚动
      }
    , 800)
    }
  },
  created() {
    this.showComments();
  }
};
</script>

<style>
.lyric-outer {
  height: 300px;
  overflow: scroll;
  text-align: center;
  line-height: 2;
}

.actived {
  font-size: 18px;
  color: aqua;
}







.avatar {
  height: 100%;
}
.comment-text {
  position: absolute;
  left: 48px;
  top: 2px;
  font-size: 12px;
}
.comment-text .username {
  color: #517eaf;
  margin-right: 3px;
}
.comment-text .text {
  color: #4a4a4a;
  /* width: 100%; */
}
.comment-li {
  border-bottom: 1px ridge #f9f9f9;
  width: 80%;
  position: relative;
  margin-top: 20px;
  height: 80px;
}

.bottom {
  position: absolute;
  left: 48px;
  font-size: 12px;
  color: #bebebe;
  width: 100%;
  height: 15px;
  display: flex;
  bottom: 2px;
}
.icon-like {
  content: url(../assets/img/like.svg);
  width: 12px;
  height: 13px;
  margin-right: 5px;
}
.actions {
  margin-left: 450px;
}
</style>