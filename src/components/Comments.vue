<template>
  <div class="comment-container">
    <button @click="showComments">show</button>
    <ul >
      <h2>热评</h2>
      <li v-for="item,key in commentsList.hotComments" :key="key">
        <img :src="item.user.avatarUrl" alt="" style="display:inline-block;width:25px;height:25px">
        <span>{{item.user.nickname}}</span>
        <br>
        <span>{{item.content}} {{timetrans(item.time)}}</span>
      </li>
      <h2>评论</h2>
      <li v-for="item,key in commentsList.comments" :key="key">
        <img :src="item.user.avatarUrl" alt="" style="width:10px;height:10px">
        <span>{{item.user.nickname}}</span>
        <p>{{item.content}} {{timetrans(item.time)}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import {songCommentsAPI} from '@/network/index'

export default {
  name: "Comments",
  data(){
    return {
      commentsList: {}
    }
  },
  methods:{
    showComments(){
      songCommentsAPI(186016).then(res => this.commentsList = res.data)
    },
    timetrans(date){
    var date = new Date(date);//如果date为13位不需要乘1000
    var Y = date.getFullYear() + '-';
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
    return Y+M+D+h+m+s;
}
  }
}
</script>

<style>

</style>