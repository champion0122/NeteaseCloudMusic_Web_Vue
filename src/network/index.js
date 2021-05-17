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
    })
  })
}