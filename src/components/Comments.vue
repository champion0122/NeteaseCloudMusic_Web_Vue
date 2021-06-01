<template>
  <div class="comment-container">
    <div class="rotate-container">
    <div class="outer">
      <img src="@/assets/img/logo.jpeg" alt="">
    </div>
  </div>
    <ul class="comment-list">
      <h2>热评</h2>
      <li v-for="(item, key) in commentsList.hotComments" :key="key" class="comment-li">
        <div class="avatar">
          <img
            :src="item.user.avatarUrl"
            alt=""
            style="display: inline-block; width: 40px; height: 40px;border-radius: 50%"
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
            <i class="icon-like" ></i>
            {{item.likedCount}}
          </div>
        </div>
      </li>
      <h2>评论</h2>
      <li v-for="(item, key) in commentsList.comments" :key="key" class="comment-li">
        <div class="avatar">
          <img
            :src="item.user.avatarUrl"
            alt=""
            style="display: inline-block; width: 40px; height: 40px;border-radius: 50%"
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
            <i class="icon-like" ></i>
            {{item.likedCount}}
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { songCommentsAPI } from "@/network/index";

export default {
  name: "Comments",
  data() {
    return {
      commentsList: {},
    };
  },
  methods: {
    showComments() {
      songCommentsAPI(this.$store.state.playingId).then((res) => (this.commentsList = res.data));
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
  },
  created(){
    this.showComments()
  }
};
</script>

<style>
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
  transform: rotate(360deg);
  transition:transform 2s;
}
.outer :hover {
  
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
.comment-text .username{
  color: #517EAF;
  margin-right: 3px;
}
.comment-text .text{
  color: #4A4A4A;
  /* width: 100%; */
}
.comment-li {
  border-bottom: 1px ridge #F9F9F9;
  width: 80%;
  position: relative;
  margin-top: 20px;
  height: 80px;
}
  

.bottom{
  position: absolute;
  left: 48px;
  font-size: 12px;
  color: #BEBEBE;
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
.actions{
  margin-left: 450px;
}
</style>