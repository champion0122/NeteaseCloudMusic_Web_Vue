<template>
  <div class="musicList">
    <h2 v-show="false">{{refresh}}</h2>
    <ul>
      <li v-for="items,num in nameList" :key="num" @click="choosePlayList(items.id)">{{items.name}}</li>
    </ul>
    <el-table :data="playList" style="width: 100%">
      <el-table-column prop="name" label="歌曲" width="180"> </el-table-column>
      <el-table-column prop="artist" label="艺人" width="180">
      </el-table-column>
      <el-table-column prop="alName" label="专辑"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { playlistDetailAPI , songDetailAPI } from "@/network/index.js"

export default {
  name: 'MusicList',
  data(){
    return {
      nameList: [],
      playList: [],
      id: this.$route.params.listId
    }
  },
  computed: {
    //利用computed监听的属性，对数据进行刷新
    refresh(){
      this.id = this.$route.params.listId
      this.showPlayListDetail(this.id)
      return this.id
    }
  },
  methods: {
    showPlayListDetail(id){
      this.nameList = [],
      this.playList = [],
      playlistDetailAPI(id).then(res => {
        res.data.playlist.trackIds.map(n =>{
          songDetailAPI(n.id).then(res => {
            this.playList.push(res)
          })
        })
      })
    }
  },
  created(){ //解决后续路由不跳转问题————将id加入computed监控
      this.showPlayListDetail(this.id)
  }
}
</script>

<style>

</style>