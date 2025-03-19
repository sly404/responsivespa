import Vue from 'vue'
import VueRouter from 'vue-router'
import { ref, computed } from 'vue'

Vue.use(VueRouter)

// 创建一个全局的响应式屏幕宽度状态
export const screenWidth = ref(window.innerWidth)

// 定义屏幕尺寸断点
export const BREAKPOINTS = {
  MOBILE: 600,
  TABLET: 840
}

// 使用计算属性来决定视图类型
export const viewType = computed(() => {
  if (screenWidth.value < BREAKPOINTS.MOBILE) return 'mobile'
  if (screenWidth.value < BREAKPOINTS.TABLET) return 'tablet'
  return 'desktop'
})

// 路由配置
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '',
        name: 'home-default',
        component: () => import('../components/ContentView.vue'),
        props: {
          title: '个人中心',
          items: []
        }
      }
    ]
  },
  // 消息相关路由
  {
    path: '/messages',
    name: 'messages',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '',
        component: () => import('../components/ContentView.vue'),
        props: {
          title: '我的消息'
        }
      }
    ]
  },
  // 订阅相关路由
  {
    path: '/subscriptions',
    name: 'subscriptions',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '',
        component: () => import('../components/ContentView.vue'),
        props: {
          title: '我的订阅'
        }
      }
    ]
  },
  // 已赞相关路由
  {
    path: '/likes',
    name: 'likes',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '',
        component: () => import('../components/ContentView.vue'),
        props: {
          title: '我的点赞'
        }
      }
    ]
  },
  // 收藏相关路由
  {
    path: '/favorites',
    name: 'favorites',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '',
        component: () => import('../components/ContentView.vue'),
        props: {
          title: '我的收藏'
        }
      }
    ]
  },
  // 历史相关路由
  {
    path: '/history',
    name: 'history',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '',
        component: () => import('../components/ContentView.vue'),
        props: {
          title: '浏览历史'
        }
      }
    ]
  },
  // 内容管理相关路由
  {
    path: '/comments',
    name: 'comments',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '',
        component: () => import('../components/ContentView.vue'),
        props: {
          title: '评论管理'
        }
      }
    ]
  },
  {
    path: '/articles',
    name: 'articles',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '',
        component: () => import('../components/ContentView.vue'),
        props: {
          title: '文章管理'
        }
      }
    ]
  },
  {
    path: '/activities',
    name: 'activities',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '',
        component: () => import('../components/ContentView.vue'),
        props: {
          title: '动态管理'
        }
      }
    ]
  },
  {
    path: '/videos',
    name: 'videos',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '',
        component: () => import('../components/ContentView.vue'),
        props: {
          title: '视频管理'
        }
      }
    ]
  },
  // 更多服务相关路由
  {
    path: '/questions',
    name: 'questions',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '',
        component: () => import('../components/ContentView.vue'),
        props: {
          title: '提问号'
        }
      }
    ]
  },
  {
    path: '/coins',
    name: 'coins',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '',
        component: () => import('../components/ContentView.vue'),
        props: {
          title: '搜狐金币'
        }
      }
    ]
  },
  {
    path: '/feedback',
    name: 'feedback',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '',
        component: () => import('../components/ContentView.vue'),
        props: {
          title: '意见反馈'
        }
      }
    ]
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '',
        component: () => import('../components/ContentView.vue'),
        props: {
          title: '设置'
        }
      }
    ]
  },
  // 顶部导航相关路由
  {
    path: '/news',
    name: 'news',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '',
        component: () => import('../components/ContentView.vue'),
        props: {
          title: '新闻'
        }
      }
    ]
  },
  {
    path: '/sports',
    name: 'sports',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '',
        component: () => import('../components/ContentView.vue'),
        props: {
          title: '体育'
        }
      }
    ]
  },
  {
    path: '/auto',
    name: 'auto',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '',
        component: () => import('../components/ContentView.vue'),
        props: {
          title: '汽车'
        }
      }
    ]
  },
  {
    path: '/estate',
    name: 'estate',
    component: () => import('../views/HomeView.vue'),
    children: [
      {
        path: '',
        component: () => import('../components/ContentView.vue'),
        props: {
          title: '房产'
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// 在路由导航前检查屏幕宽度
router.beforeEach((to, from, next) => {
  // 更新屏幕宽度
  screenWidth.value = window.innerWidth
  next()
})

export default router