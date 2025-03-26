import Vue from "vue"
import VueRouter from "vue-router"
import HomeView from "../views/HomeView.vue"
import ContentView from "../components/Content/Index.vue"

Vue.use(VueRouter)

// 路由配置
const routes = [
    {
        path: "/ucenter",
        meta: {
            title: "个人中心",
        },
        component: HomeView,
        children: [
            {
                path: "messages",
                name: "messages",
                props: {
                    title: "我的消息",
                },
                component: ContentView
            },
            {
                path: "follow",
                name: "follow",
                meta: {
                    title: "我的订阅",
                },
                component: ContentView
            },
            {
                path: "/likeArticle",
                name: "likeArticle",
                meta: {
                    title: "我的已赞",
                },
                component: ContentView
            },
            {
                path: "favorites",
                name: "favorites",
                meta: {
                    title: "我的收藏",
                },
                component: ContentView
            },
            {
                path: "history",
                name: "history",
                meta: {
                    title: "浏览历史",
                },
                component: ContentView
            },
            {
                path: "comments",
                name: "comments",
                meta: {
                    title: "评论管理",
                },
                component: ContentView
            },
            {
                path: "activities",
                name: "activities",
                meta: {
                    title: "动态/讨论",
                },
                component: ContentView
            },
            {
                path: "vision",
                name: "vision",
                meta: { 
                    title: "视野",
                },
                component: ContentView
            },
            {
                path: "feedback",
                name: "feedback",
                meta: {
                    title: "意见反馈",
                },
                component: ContentView
            },
            {
                path: "settings",
                name: "settings",
                meta: {
                    title: "设置",
                },
                component: ContentView
            },
        ]
    },
]

const router = new VueRouter({
    mode: "history",
    routes,
})

export default router
