<template>
  <div>
    <div><h2>搜索结果：{{ nowKeyword }}</h2></div>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="name" label="歌曲" width="180"> </el-table-column>
      <el-table-column prop="artist" label="艺人" width="180">
      </el-table-column>
      <el-table-column prop="alName" label="专辑"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { searchMusicAPI, songDetailAPI } from "@/network/index.js";
export default {
  data(){
    return {
      list: [],
      keyword: this.$route.params.keyword,
    }
  },
  methods: {
    search(keyword){
      searchMusicAPI(keyword).then((res) => {
      this.list = [];
      const listT = res.data.result.songs;
      listT.map((n) => {
        songDetailAPI(n.id).then((res) => {
          this.list.push(res);
        });
      });
    });
    }
  },
  computed: {
    //利用computed监听的属性，对数据进行刷新
    nowKeyword(){
      this.keyword = this.$route.params.keyword
      this.search(this.keyword)
      return this.keyword
    }
  },
  created: function () {
    this.search(this.keyword)
  },
};
</script>

<style>
</style>