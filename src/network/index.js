import { request } from "./request.js";

export const searchMusicAPI = (keywords) => request({
    url: "/cloudsearch",  //search API
    params: {
      keywords,
      limit: 30,
    },
  })

export const songDetailAPI = (ids) => {
  return new Promise((resolve,reject) => {
    request({
        url: "/song/detail",
        params: {
          ids,
        },
      }).then((res) => {
        const artList = []
        res.data.songs[0].ar.map(n => {
          artList.push(n.name)
        })
        let fullArtist = artList.join("/")
        const resolveInfo = {
          id: res.data.songs[0].id,
          name: res.data.songs[0].name,
          alName: res.data.songs[0].al.name,
          artist: res.data.songs[0].ar.length > 1 ?  fullArtist : res.data.songs[0].ar[0].name
        }
        // console.log(res.data.songs[0])
        resolve(resolveInfo)
    }).catch(err => reject(err))
  })
}

export const detailAPI = (uid) => { //no need to login
  return request({
    url: '/user/detail',
    params: {
      uid
    }
  })
}

export const playlistAPI = (uid) => { //根据用户uid来获取其创建的歌单
  return request({
    url: '/user/playlist',
    params: {
      uid,
      // offset: 30
    }
  })
}  //返回res.data.playlist为对象数组，其中的id为歌单id


export const playlistDetailAPI = (id) => { //传入歌单id
  return request({
    url: '/playlist/detail',

    params:{
      id
    }
  })
}//返回res.data.playlist.trackIds为一个对象数组，其中的id为歌曲id，uid为创建者uid

export const statusAPI = () => {   //need to login
  console.log('status')
  return request({
    url: '/login/status'
  })
}

export const accountAPI = () => {   //need to login
  console.log('account')
  return request({
    url: '/user/account'
  })
}


export const subcountAPI = () => {   //need to login
  console.log('subcount')
  return request({
    url: '/user/subcount'
  })
}

export const personalizedAPI = () => {
  console.log('personalized')
  return request({
    url: '/personalized',
    params: {
      limit: 12
    }
  })
}

export const bannerAPI = () => {
  console.log('banner')
  return request({
    url: '/banner',
  })
}