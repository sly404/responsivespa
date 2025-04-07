import ToastComponent from '@/plugins/toast/Toast.vue'

const ToastPlugin = {
  install(Vue) {
    // 创建构造函数
    const ToastConstructor = Vue.extend(ToastComponent)
    // 创建并挂载实例
    const instance = new ToastConstructor({
      propsData: {
        text: '',
        status: 'default',
        duration: 2000,
        show: false
      }
    })
    // 挂载到文档
    instance.$mount()
    document.body.appendChild(instance.$el)
    
    // 添加全局方法
    Vue.prototype.$toast = function(options = {}) {
      // 处理字符串形式的参数
      if (typeof options === 'string') {
        options = { text: options }
      }
      
      // 配置并显示 Toast
      instance.text = options.text || ''
      instance.status = options.status || 'default'
      instance.duration = options.duration !== undefined ? options.duration : 2000
      
      // 显示 Toast
      instance.show()
      
      // 返回 instance 供链式调用
      return instance
    }
  }
}

export default ToastPlugin 