import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

const Message = () => import('../components/Content/Message/index.vue')
const Follow = () => import('../components/Content/Follow/index.vue')
const EditInfo = () => import('../components/Content/EditInfo/Index.vue')
const Comment = () => import('../components/Content/Comment/Index.vue')
const MyComment = () => import('../components/Content/Comment/MyComment.vue')
const ReplyMe = () => import('../components/Content/Comment/ReplyMe.vue')

Vue.use(VueRouter)

// 路由配置
const routes = [
    {
        path: '/',
        redirect: '/ucenter'
    },
    {
        path: '/ucenter',
        meta: {
            title: '个人中心',
        },
        component: HomeView,
        children: [
            {
                path: 'messages',
                name: 'messages',
                meta: {
                    title: '我的消息',
                },
                component: Message,
            },
            {
                path: 'follow',
                name: 'follow',
                meta: {
                    title: '我的订阅',
                },
                component: Follow,
            },
            {
                path: '/likeArticle',
                name: 'likeArticle',
                meta: {
                    title: '我的已赞',
                },
            },
            {
                path: 'favorites',
                name: 'favorites',
                meta: {
                    title: '我的收藏',
                },
            },
            {
                path: 'history',
                name: 'history',
                meta: {
                    title: '浏览历史',
                },
            },
            {
                path: 'comments',
                name: 'comments',
                meta: {
                    title: '评论管理',
                },
                component: Comment,
                children: [
                    {
                        path:'',
                        redirect:'myComment',
                    },
                    {
                        path: 'myComment',
                        name: 'myComment',
                        component: MyComment,
                    },
                    {
                        path: 'replyMe',
                        name: 'replyMe',
                        component: ReplyMe,
                    },
                ],
            },
            {
                path: 'activities',
                name: 'activities',
                meta: {
                    title: '动态/讨论',
                },
            },
            {
                path: 'vision',
                name: 'vision',
                meta: {
                    title: '视野',
                },
            },
            {
                path: 'feedback',
                name: 'feedback',
                meta: {
                    title: '意见反馈',
                },
            },
            {
                path: 'settings',
                name: 'settings',
                meta: {
                    title: '设置',
                },
            },
            {
                path: 'editInfo',
                name: 'editInfo',
                meta: {
                    title: '编辑资料',
                },
                component: EditInfo,
            },
        ],
    },
]

const router = new VueRouter({
    mode: 'history',
    routes,
})



// 路由后置钩子
router.afterEach((to) => {
    const isToUcenterRoot = to.path === '/ucenter' || to.path === '/'
    const isToChildRoute = to.path && to.path.match(/^\/ucenter\/.*/)
    const isContentActive = isToUcenterRoot ? false : isToChildRoute ? true : false
    const store = router.app.$store
    if (store && typeof store.dispatch === 'function') {
        // 设置contentActive状态
        store.commit('setContentActive', isContentActive)
        // 设置isInRoot状态
        store.commit('setIsInRoot', isToUcenterRoot)
    }
    // 更新页面标题
    if (to.meta.title) {
        document.title = to.meta.title
    }
})

export default router
