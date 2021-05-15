<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
    >
      <el-menu-item style="border: none">
        <div class="headerIcon">
          <img src="@/assets/logo.jpeg" alt="" />
          <span>音乐的力量</span>
        </div>
      </el-menu-item>
      <el-menu-item index="1">发现音乐</el-menu-item>
      <el-menu-item index="2">我的音乐</el-menu-item>
      <el-menu-item index="3">探索MV</el-menu-item>
      <el-menu-item class="searchBar">
        <input
          placeholder="搜索音乐"
          v-model="keyword"
          @keyup.enter="searchMusic"
          class="el-input__inner"
        />
        <i
          class="el-icon-search"
          style="margin-right: 10px"
          @click="searchMusic"
        ></i>
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
      console.log("come in");
      request({
        url: "/cloudsearch",
        params: {
          keywords: this.keyword,
          limit: 30,
        },
      }).then((res) => {
        this.list = []
        const listT = res.data.result.songs;
        // const idList = res.data.result.songs.al.id
        // console.log(res);
        listT.map((n) => {
          request({
            url: "/song/detail",
            params: {
              ids: n.id,
            },
          }).then((res) => {
            this.list.push(res.data.songs[0])
            // console.log(res.data.songs[0])
          });
        });
        console.log(this.list)
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