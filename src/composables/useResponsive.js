import Vue from 'vue'

// 创建一个全局的响应式对象
export const state = Vue.observable({
  screenWidth: window.innerWidth
})

// 定义屏幕尺寸断点
export const BREAKPOINTS = {
  MOBILE: 600,
  TABLET: 840
}

// 导出计算属性
export const screenWidth = {
  get value() {
    return state.screenWidth
  },
  set value(newVal) {
    state.screenWidth = newVal
  }
}

// 响应式计算属性
export const isMobile = {
  get value() {
    return state.screenWidth < BREAKPOINTS.MOBILE
  }
}

export const isTablet = {
  get value() {
    return state.screenWidth >= BREAKPOINTS.MOBILE && state.screenWidth < BREAKPOINTS.TABLET
  }
}

export const isDesktop = {
  get value() {
    return state.screenWidth >= BREAKPOINTS.TABLET
  }
}

// 视图类型
export const viewType = {
  get value() {
    if (isMobile.value) return 'mobile'
    if (isTablet.value) return 'tablet'
    return 'desktop'
  }
}

// 初始化窗口大小监听
export function setupResizeListener() {
  const handleResize = () => {
    screenWidth.value = window.innerWidth
  }
  
  // 添加窗口大小变化监听
  window.addEventListener('resize', handleResize)
  
  // 返回清理函数
  return () => {
    window.removeEventListener('resize', handleResize)
  }
}

// 兼容Vue 2的混入
export const responsiveMixin = {
  computed: {
    isMobile() {
      return isMobile.value
    },
    isTablet() {
      return isTablet.value
    },
    isDesktop() {
      return isDesktop.value
    },
    screenWidth() {
      return state.screenWidth
    },
    viewType() {
      return viewType.value
    }
  }
} 