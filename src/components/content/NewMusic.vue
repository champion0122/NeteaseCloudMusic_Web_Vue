<template>
  <div class="new-music-container">
    <h3>最新音乐</h3>
    <ul class="new-music-ul">
      <li v-for="(song, index) in newsongList" :key="song.id">
        <div class="music-outer">
          <div class="order-wrap">{{ index + 1 }}</div>
          <div class="img-box">
            <img
              :src="song.picUrl"
              alt=""
              style="width: 100px; height: 100px"
            />
          </div>
          <div class="discribe">
            <p>{{ song.name }}</p>
            <p>{{ artList[index] }}</p>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import { newsongAPI } from "@/network/index";

export default {
  name: "NewMusic",
  data() {
    return {
      newsongList: [],
      artList: [],
    };
  },
  methods: {
    getFullArtist(artistsArr) {
      const fullArtist = [];
      artistsArr.map((n) => fullArtist.push(n.name));
      return fullArtist.join("/");
    },
  },
  created() {
    newsongAPI().then((res) => {
      this.newsongList = res.data.result;
      console.log(res.data.result);
      res.data.result.map((n) => {
        this.artList.push(this.getFullArtist(n.song.artists));
      });
    });
  },
};
</script>

<style>
.ew-music-container {
  
}
.new-music-ul {
  margin: 0;
  border: 0;
  height: 600px;
  width: 350px;
  list-style: none;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: space-between;
}

.music-outer{
  display: flex;
}
.music-outer .order-wrap{
  width: 10px;
}
</style>