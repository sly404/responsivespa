import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ConfirmPlugin from './plugins/confirm'
import ToastPlugin from './plugins/toast'
import './styles/style.css'
import './styles/variables.css'

Vue.use(ConfirmPlugin) // 通过this.$confirm()使用
Vue.use(ToastPlugin) // 通过this.$toast()使用
Vue.config.productionTip = false

new Vue({
  router,
  store,
  beforeCreate() {
    // 在store实例中添加$toast方法的引用
    store.$toast = this.$toast;
  },
  render: h => h(App)
}).$mount('#app')
