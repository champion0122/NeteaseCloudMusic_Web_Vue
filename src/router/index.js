import Vue from 'vue'
import VueRouter from 'vue-router'

const SearchMusic = () => import('@/views/SearchMusic')
const MyMusic = () => import('@/views/myMusic/MyMusicDiscover')
const MusicList = () => import('@/components/MusicList')

Vue.use(VueRouter)

const routes = [
  {
    //通过vue-router动态路由传值
    path: '/search/:keyword',
    name: 'SearchMusic',
    component: SearchMusic
  },
  {
    //通过vue-router动态路由传值
    path: '/MyMusic',
    name: 'MyMusic',
    component: MyMusic,
    children: [
      {
        path: 'MusicList/:listId',
        component: MusicList
      }
    ]
  },

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
