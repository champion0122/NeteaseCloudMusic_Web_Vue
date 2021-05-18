<template>
  <el-container>
  <el-aside>
    <el-menu
      class="el-menu-vertical-demo"
      @select="handleSelect"
      >
      <!-- 只需要两个分组，一个创建，一个收藏 -->
        <el-menu-item-group >
          <template slot="title">创建的歌单</template>
          <el-menu-item v-for="list,num in myCreatdList" :key="num"  :index="'/MyMusic/MusicList/'+list.id">{{list.name}}</el-menu-item>
        </el-menu-item-group >
        <el-menu-item-group title="收藏的歌单" >
          <el-menu-item v-for="list,num in myCollectList" :key="num" :index="'/MyMusic/MusicList/'+list.id">{{list.name}}</el-menu-item>
        </el-menu-item-group>
    </el-menu>
  </el-aside>
  <el-main><router-view /></el-main>
</el-container>
</template>

<script>
import {playlistAPI} from "@/network/index"

export default {
  name: "MyMusicDiscover",
  data(){
    return {
      myCreatdList: [],
      myCollectList: []
    }
  },
  computed: {
    uid(){
      return JSON.parse(window.localStorage.getItem('loginStage'))["__uid__"]
    }
  },
  methods: {
    handleSelect(index, indexPath){
      this.$router.push(index)
      // console.log(index)
      // console.log(indexPath)
    }
  },
  created(){
    playlistAPI(this.uid).then(res => res.data.playlist.map(n => {
        // console.log(n.name)
        // this.nameList.push(n)
        if(n.creator.userId == this.uid)
        this.myCreatdList.push(n)
        else
        this.myCollectList.push(n)
      }))
  }
}
</script>

<style>

</style>