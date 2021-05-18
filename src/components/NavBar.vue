<template>
  <div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item style="border: none">
        <div class="headerIcon">
          <img src="@/assets/img/logo.jpeg" alt="" />
          <span>音乐的力量</span>
        </div>
      </el-menu-item>
      <el-menu-item index="/">发现音乐</el-menu-item>
      <el-menu-item index="/MyMusic">我的音乐</el-menu-item>
      <el-menu-item index="/">探索MV</el-menu-item>
      <el-menu-item class="searchBar">
        <div>
          <input
            placeholder="搜索音乐"
            v-model="keyword"
            @keyup.enter="searchMusic"
            class="el-input__inner"
          />
          <i class="el-input__icon el-icon-search" @click="searchMusic"></i>
        </div>
      </el-menu-item>
      <el-menu-item class="avatar">
        <div @click="loginClick">
          <el-avatar :size="38" :src="circleUrl" class="circle"> </el-avatar>
          <span class="text">登陆</span>
        </div>
      </el-menu-item>
    </el-menu>
    
  </div>
</template>

<script>
import { saveItem, loadItem } from "@/utils/loginStage.js";
import { detailAPI } from "@/network/index.js";

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
    handleSelect(index, indexPath){
      this.$router.push(index)
      // console.log(index)
      // console.log(indexPath)
    },
    //search事件触发时,需要跳转路由并且在搜索页面create的时候触发搜索
    searchMusic() {
      this.$router.replace("/search/" + this.keyword);
    },

    myMusicClick(){
      this.$router.replace("")
    },

    loginClick() {
      this.$prompt("请输入uid", "提示:uid为网易云个人页面url最后一串数字", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /[0-9]*/,
        inputErrorMessage: "uid格式不正确",
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你的uid是: " + value,
          });
          detailAPI(value).then((res) => {
            console.log(res);
            this.circleUrl = res.data.profile.avatarUrl;
            saveItem("__uid__", value);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入",
          });
        });
    },
  },
  mounted() {
    const uid = loadItem("__uid__", 342016812);
    detailAPI(uid).then((res) => {
      this.circleUrl = res.data.profile.avatarUrl;
    });
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