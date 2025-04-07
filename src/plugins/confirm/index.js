import ConfirmBoxComponent from '@/plugins/confirm/ConfirmBox.vue'

const ConfirmPlugin = {
  install(Vue) {
    // 创建构造函数
    const ConfirmConstructor = Vue.extend(ConfirmBoxComponent)
    let instance
    
    // 添加全局方法
    Vue.prototype.$confirm = function(options = {}) {
      // 保证只有一个实例
      if (!instance) {
        instance = new ConfirmConstructor({
          store: this.$store,
        })
        instance.$mount()
        document.body.appendChild(instance.$el)
      }
      
      // 返回 Promise，支持链式调用
      return new Promise((resolve, reject) => {
        // 配置确认弹窗
        this.$store.commit('toggleConfirm', {
          title: options.title || '确认操作',
          confirmText: options.confirmText || '确认',
          cancelText: options.cancelText || '取消',
          ...options
        })
        
        // 设置确认和取消回调
        instance.$once('confirm', () => {
          this.$store.commit('toggleConfirm')
          resolve(true)
        })
        
        instance.$once('cancel', () => {
          this.$store.commit('toggleConfirm')
          reject(false)
        })
      })
    }
  }
}

export default ConfirmPlugin 