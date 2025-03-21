import Vue from "vue"
import VueRouter from "vue-router"
import { ref, computed } from "vue"

Vue.use(VueRouter)

// 创建一个全局的响应式屏幕宽度状态
export const screenWidth = ref(window.innerWidth)

// 定义屏幕尺寸断点
export const BREAKPOINTS = {
    MOBILE: 600,
    TABLET: 840,
}

// 使用计算属性来决定视图类型
export const viewType = computed(() => {
    if (screenWidth.value < BREAKPOINTS.MOBILE) return "mobile"
    if (screenWidth.value < BREAKPOINTS.TABLET) return "tablet"
    return "desktop"
})

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
    routes,
})

// 在路由导航前检查屏幕宽度
router.beforeEach((to, from, next) => {
    // 更新屏幕宽度
    screenWidth.value = window.innerWidth
    next()
})

export default router
