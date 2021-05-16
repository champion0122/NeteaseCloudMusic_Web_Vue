<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
    >
      <el-menu-item style="border: none">
        <div class="headerIcon">
          <img src="@/assets/img/logo.jpeg" alt="" />
          <span>音乐的力量</span>
        </div>
      </el-menu-item>
      <el-menu-item index="1">发现音乐</el-menu-item>
      <el-menu-item index="2">我的音乐</el-menu-item>
      <el-menu-item index="3">探索MV</el-menu-item>
      <el-menu-item class="searchBar">
        <div>
          <input
          placeholder="搜索音乐"
          v-model="keyword"
          @keyup.enter="searchMusic"
          class="el-input__inner"
        >
        <i
          class="el-input__icon el-icon-search"
          @click="searchMusic"
        ></i>
        </div>
      </el-menu-item>
      <el-menu-item class="avatar">
        <div>
          <el-avatar :size="38" :src="circleUrl" class="circle"> </el-avatar>
          <span class="text">登陆</span>
        </div>
      </el-menu-item>
    </el-menu>
    <el-table :data="list" style="width: 100%">
      <el-table-column prop="name" label="歌曲" width="180"> </el-table-column>
      <el-table-column prop="ar[0].name" label="艺人" width="180">
      </el-table-column>
      <el-table-column prop="al.name" label="专辑"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { request } from "@/network/request.js";
import { searchMusicAPI , songDetailAPI } from "@/network/index.js"

export default {
  name: "NavBar",
  data() {
    return {
      keyword: "",
      activeIndex: "1",
      circleUrl: "",
      list: [],
    };
  },
  methods: {
    searchMusic() {
      searchMusicAPI(this.keyword).then((res) => {
        this.list = [];
        const listT = res.data.result.songs;
        listT.map((n) => {
          songDetailAPI(n.id).then((res) => {
            this.list.push(res);
            console.log(res)
          });
        });
        // console.log(this.list);
      });
    },
  },
};
</script>

<style scoped>
.el-menu-item span {
  margin-left: 10px;
  font-size: 18px;
}
.el-menu-item img {
  width: 30px;
  height: 30px;
}
.el-input {
  margin-top: -5px;
}
.searchBar {
  margin-left: 100px;
  width: 320px;
}
.avatar .circle {
  display: block;
  margin-bottom: -20px;
}
</style>