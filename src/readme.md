# Ucenter 个人中心项目

## 项目简介
Ucenter是个人中心模块，基于Vue.js 2构建，提供用户个人信息管理、消息中心、订阅、收藏等功能。

## 响应式设计
- 目前设计以三种尺寸对页面进行设计，分别为600px以下，600-840px，840px以上，三种尺寸间可以进行无刷新切换
- 三种尺寸下，整个页面都可以大致分为顶部导航，路由导航区域，视图区域，以及用户信息展示区域
    - 其中UI样式差别较大的导航组件，在不同尺寸下通过动态导入和v-if控制切换不同的组件
    - 视图区域和用户信息展示区域，则使用媒体查询以及类名响应式切换，进行微调，比如600px以下，视图区域填满空间，而600px往上，视图区域居于右侧
    - 所有的视图组件，比如消息，订阅，需要适配不同屏幕宽度下的样式，可以借助媒体查询以及类名动态切换进行微调

## 项目启动
1.确定sceneConfig.js中的devScenes包含ucenter
2. 安装依赖：node版本建议16以上
   ```bash
   pnpm install (未安装pnpm的话，先安装pnpm: npm install -g pnpm)
   ```
3. 启动开发服务器：
   ```bash
   pnpm run dev
   ```
4. 访问应用：
   打开浏览器，访问:`http://localhost:1234/ucenter`
   如果dev-server设置了https:true,则访问`https://localhost:1234/ucenter`
   如果需要带cookie访问，需要设置电脑本地hosts中127.0.0.1代理到sohu.com域名下，比如127.0.0.1 dev.m.sohu.com，然后访问`http://dev.m.sohu.com:1234/ucenter`或`https://dev.m.sohu.com:1234/ucenter`(dev-server设置了https:true)

## 项目文件结构

```
src/ucenter/
├── assets/           # 静态资源文件夹
├── components/       # 公共组件
│   ├── Content/      # 内容区域组件
│   ├── Header/       # 头部组件
│   ├── Navigation/   # 导航组件
│   └── UserInfo.vue  # 用户信息组件
├── composables/      # 可复用的组合式逻辑
│   └── useResponsive.js  # 响应式布局相关功能
├── config/           # 配置文件,如事件名配置，事件码配置，c码配置等
├── requests/         # 请求相关
│   ├── axios.js      # axios配置与封装
│   ├── mockData.js   # 模拟数据
│   └── odinRequest.js # 奥丁数据请求接口
├── router/           # 路由配置
│   └── index.js      # 路由定义
├── store/            # Vuex状态管理
│   └── index.js      # 状态定义
├── styles/           # 样式文件
│   ├── style.css     # 全局样式
│   └── variables.css # CSS变量
├── utils/            # 工具库
│   └── index.js      # 工具函数
├── views/            # 视图组件
├── views/ 
|   └── ContentView   # 内容视图
│   └── HomeView.vue  # 主页视图
├── App.vue           # 应用根组件
├── entry.js          # 应用入口文件
└── postcss.config.js # PostCSS配置
```

## 路由结构

项目使用`vue-router`进行路由管理，主要路由结构如下：

```
/ucenter               # 个人中心主页 (HomeView.vue)
  ├── /messages        # 我的消息
  ├── /follow          # 我的订阅
  ├── /likeArticle     # 我的已赞
  ├── /favorites       # 我的收藏
  ├── /history         # 浏览历史
  ├── /comments        # 评论管理
  ├── /activities      # 动态/讨论
  ├── /vision          # 视野
  ├── /feedback        # 意见反馈
  └── /settings        # 设置
```

## 项目组织方式

项目采用传统的Vue.js单页应用架构：
- 使用Vue.js 2作为框架
- 基于组件化开发模式
- 统一的路由入口和状态管理
- 集中式的样式管理

## 状态管理方式

项目使用Vuex进行状态管理

## 请求管理与约束

### Axios封装

项目使用`axios`进行HTTP请求，并对其进行了封装：

```javascript
// requests/axios.js
export const createAxiosByInterceptors = (config) => {
  const instance = axios.create({
    timeout: 2000,
    withCredentials: true, //自动携带cookie
    ...config, // 自定义配置覆盖基本配置
  })
  
  // 添加请求拦截器
  instance.interceptors.request.use(...)
  
  // 添加响应拦截器
  instance.interceptors.response.use(...)
  
  return instance
}
```

### 如何扩展请求

要扩展新的请求服务：

1. 在`requests`目录下创建新的请求模块文件
2. 导入基础的axios实例或创建新的axios实例
3. 封装特定的请求方法，处理参数和响应

示例：
```javascript
// requests/newService.js
import { createAxiosByInterceptors } from './axios'

const instance = createAxiosByInterceptors({
  baseURL: 'https://api.example.com',
})

export const fetchData = async (params) => {
  try {
    const result = await instance.get('/endpoint', { params })
    return result
  } catch (error) {
    console.error('请求失败', error)
    return Promise.reject(error)
  }
}
```

## 样式管理与约束

### CSS变量系统

项目使用CSS变量进行主题和样式管理：

```css
/* styles/variables.css */
:root {
  /* 断点 */
  --breakpoint-mobile: 600px;
  --breakpoint-tablet: 840px;
  
  /* 颜色 */
  --color-primary: #ff4e22;
  --color-text-primary: #111111;
  /* 其他变量... */
}
```

### 样式组织方式

- 使用原生CSS，结合PostCSS进行处理
- 全局样式定义在`styles/style.css`中
- 通过CSS变量统一管理主题色、间距、字体大小等
- 组件样式使用scoped CSS，确保样式隔离

