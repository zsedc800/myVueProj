import Router from 'vue-router'
import Vue from 'vue'

const home = r => require.ensure([], () => require('@/views/home.vue'), 'home')
const song_list = r => require.ensure([], () => require('@/views/song_list.vue'), 'song_list')
const playerDetail = r => require.ensure([], () => require('@/views/playerDetail.vue'), 'playerDetail')

Vue.use(Router)

const routes = [
    {
        // name: 'home', //默认子路由存在时父路由不能有name
        path: '/home',
        component: home,
        children: [
            {
                path: '/recommand',
                component: require('@/components/recommand.vue')
            },{
                path: '/album',
                component: require('@/components/album.vue')
            },{
                path: '/top',
                component: require('@/components/top.vue')
            },{
                path: '/hotSinger',
                component: require('@/components/hotSinger.vue')
            },
            {
                path: '*',
                redirect: '/recommand'
            }
        ]
    },{
        path: '/',
        redirect: '/home/recommand'
    },{
        name: 'song_list',
        path: '/song_list/:id',
        component: song_list
    },{
        name: 'playerDetail',
        path: '/playerDetail',
        component: playerDetail
    }
]

export default new Router({
    routes
})
