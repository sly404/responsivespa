import Vue from "vue"
import VueRouter from "vue-router"
import HomeView from "../views/HomeView.vue"

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
                component: () => import("../components/ContentView.vue")
            },
            {
                path: "follow",
                name: "follow",
                meta: {
                    title: "我的订阅",
                },
                component: () => import("../components/ContentView.vue")
            },
            {
                path: "/likeArticle",
                name: "likeArticle",
                meta: {
                    title: "我的已赞",
                },
                component: () => import("../components/ContentView.vue")
            },
            {
                path: "favorites",
                name: "favorites",
                meta: {
                    title: "我的收藏",
                },
                component: () => import("../components/ContentView.vue")
            },
            {
                path: "history",
                name: "history",
                meta: {
                    title: "浏览历史",
                },
                component: () => import("../components/ContentView.vue")
            },
            {
                path: "comments",
                name: "comments",
                meta: {
                    title: "评论管理",
                },
                component: () => import("../components/ContentView.vue")
            },
            {
                path: "activities",
                name: "activities",
                meta: {
                    title: "动态/讨论",
                },
                component: () => import("../components/ContentView.vue")
            },
            {
                path: "vision",
                name: "vision",
                meta: { 
                    title: "视野",
                },
                component: () => import("../components/ContentView.vue")
            },
            {
                path: "feedback",
                name: "feedback",
                meta: {
                    title: "意见反馈",
                },
                component: () => import("../components/ContentView.vue")
            },
            {
                path: "settings",
                name: "settings",
                meta: {
                    title: "设置",
                },
                component: () => import("../components/ContentView.vue")
            },
        ]
    },
]

const router = new VueRouter({
    mode: "history",
    routes,
})

export default router
