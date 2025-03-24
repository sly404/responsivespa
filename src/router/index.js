import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)

// 路由配置
const routes = [
    {
        path: "/",
        redirect: "/home",
    },
    {
        path: "/home",
        name: "home",
        meta: {
            title: "个人中心",
        },
        component: () => import("../views/HomeView.vue"),   
    },
    // 消息相关路由
    {
        path: "/messages",
        name: "messages",
        meta: {
            title: "我的消息",
        },
        component: () => import("../views/HomeView.vue"),
        children: [
            {
                path: "",
                component: () => import("../components/ContentView.vue"),
            },
        ],
    },
    // 订阅相关路由
    {
        path: "/follow",
        name: "follow",
        meta: {
            title: "我的订阅",
        },
        component: () => import("../views/HomeView.vue"),
        children: [
            {
                path: "",
                component: () => import("../components/ContentView.vue"),
            },
        ],
    },
    // 已赞相关路由
    {
        path: "/likeArticle",
        name: "likeArticle",
        meta: {
            title: "我的点赞",
        },
        component: () => import("../views/HomeView.vue"),
        children: [
            {
                path: "",
                component: () => import("../components/ContentView.vue"),
            },
        ],
    },
    // 收藏相关路由
    {
        path: "/favorites",
        name: "favorites",
        meta: {
            title: "我的收藏",
        },
        component: () => import("../views/HomeView.vue"),
        children: [
            {
                path: "",
                component: () => import("../components/ContentView.vue"),
            },
        ],
    },
    // 历史相关路由
    {
        path: "/history",
        name: "history",
        meta: {
            title: "浏览历史",
        },
        component: () => import("../views/HomeView.vue"),
        children: [
            {
                path: "",
                component: () => import("../components/ContentView.vue"),
            },
        ],
    },
    // 内容管理相关路由
    {
        path: "/comments",
        name: "comments",
        meta: {
            title: "评论管理"
        },
        component: () => import("../views/HomeView.vue"),
        children: [
            {
                path: "",
                component: () => import("../components/ContentView.vue"),
            },
        ],
    },
    {
        path: "/activities",
        name: "activities",
        meta: {
            title: "动态/讨论",
        },
        component: () => import("../views/HomeView.vue"),
        children: [
            {
                path: "",
                component: () => import("../components/ContentView.vue"),
            },
        ],
    },
    {
        path: "/vision",
        name: "vision",
        meta: {
            title: "视野",
        },
        component: () => import("../views/HomeView.vue"),
        children: [
            {
                path: "",
                component: () => import("../components/ContentView.vue"),
            },
        ],
    },
    // 更多服务相关路由
    {
        path: "/feedback",
        name: "feedback",
        meta: {
            title: "意见反馈",
        },
        component: () => import("../views/HomeView.vue"),
        children: [
            {
                path: "",
                component: () => import("../components/ContentView.vue"),
            },
        ],
    },
    {
        path: "/settings",
        name: "settings",
        meta: {
            title: "设置",
        },
        component: () => import("../views/HomeView.vue"),
        children: [
            {
                path: "",
                component: () => import("../components/ContentView.vue"),
            },
        ],
    },
]

const router = new VueRouter({
    mode: "history",
    base: '/ucenter',
    routes,
})

export default router
