export default {
  state: {
    confirmBox: {
      isShow: false,
      config: null
    }
  },
  mutations: {
    toggleConfirm(state, config = null) {
      state.confirmBox.isShow = !state.confirmBox.isShow
      state.confirmBox.config = state.confirmBox.isShow ? config : null
    }
  }
} 