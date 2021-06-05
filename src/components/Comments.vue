<template>
  <div class="comment-container">
    <Rotate></Rotate>
    <Lyric></Lyric>
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
import { songCommentsAPI } from "@/network/index";
import Lyric from "@/components/content/Lyric";
import Rotate from "@/components/common/Rotate";

export default {
  name: "Comments",
  components: {
    Lyric,
    Rotate
  },
  data() {
    return {
      commentsList: {},
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
  },
  created() {
    this.showComments();
  },
};
</script>

<style>
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