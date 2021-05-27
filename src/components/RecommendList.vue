<template>
<div>
  <div class="personalizedList">
  <ul>
    <li v-for="item,key in personalizedList" :key="key" @click="$router.push('/discover/MusicList/'+item.id)">
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
}
.personalizedListItem {
  width: 110px;
  height: 110px;
  margin: 10px;
}
.listPic {
  width: 100px;
  height: 100px;
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