<template>
  <div class="container">
    <div class="main">
      <el-carousel :interval="4000" type="card" height="200px">
        <el-carousel-item v-for="item in imageUrlList" :key="item">
          <img :src="item" alt="" />
        </el-carousel-item>
      </el-carousel>
      <recommend-list />
      <new-music />
    </div>
  </div>
</template>

<script>
import RecommendList from "@/components/RecommendList";
import NewMusic from "@/components/content/NewMusic";
import { bannerAPI } from "@/network/index";

export default {
  name: "discover",
  data() {
    return {
      imageUrlList: [],
    };
  },
  components: {
    RecommendList,
    NewMusic
  },
  created() {
    bannerAPI().then((res) => {
      this.imageUrlList = [];
      res.data.banners.map((n) => this.imageUrlList.push(n.imageUrl));
    });
  },
};
</script>

<style>
.container {
  position: relative;
}
.el-carousel {
  width: 900px;
}
.el-carousel__item img {
  opacity: 0.75;
  margin: 0;
  height: 200px;
  width: 100%;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.main {
  position: absolute;
  left: 100px;
  right: 100px;
  /* width: 1000px; */
}
</style>