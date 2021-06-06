<template>
<div>
  <div class="personalizedList">
    <h3>推荐歌单</h3>
  <ul>
    <li v-for="item,key in personalizedList" :key="key" @click="$router.push('/MusicList/'+item.id)">
      <div class="personalizedListItem">
        <img :src="item.picUrl" class="listPic" alt="">
        <p>{{item.name}}</p>
      </div>
    </li>
  </ul>
  </div>
  <router-view/>
</div>
  
</template>

<script>
import {personalizedAPI} from '@/network/index.js'

export default {
  name: 'RecommendList',
  data(){
    return {
      personalizedList: []
    }
  },
  methods: {
    
  },
  created(){
    personalizedAPI().then(res => this.personalizedList = res.data.result)
  }
}
</script>

<style scoped>
.personalizedList ul {
  display: flex;
  list-style: none;
  flex-wrap: wrap;
  
  width: 940px;
  /*  均匀排列每个元素 首个元素放置于起点，末尾元素放置于终点 */
  justify-content: unsafe center; 
}
.personalizedListItem {
  width: 200px;
  height: 200px;
  margin: 15px;
  flex: 1 1 auto;
}
.listPic {
  width: 180px;
  height: 180px;
  border-radius: 5px;
}
.personalizedListItem p{
  font-size: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.personalizedList {
  margin-bottom: 50px;

}

</style>