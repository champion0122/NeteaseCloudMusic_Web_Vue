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
      <el-menu-item class="searchBar" index="4">
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
    <router-view/>
  </div>
  
</template>

<script>
import { SET_SEARCHKEYWORD } from "@/store/mutation-types"


export default {
  name: "NavBar",
  data() {
    return {
      keyword: "",
      activeIndex: "1",
      circleUrl: "",
    };
  },
  methods: {
    //search事件触发时,需要跳转路由并且在搜索页面create的时候触发搜索
    searchMusic() {
      // this.$store.commit('SET_SEARCHKEYWORD',this.keyword)
      this.$router.replace('/search/'+this.keyword)
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