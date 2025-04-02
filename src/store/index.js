import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfo } from '@/requests/userRequest'
Vue.use(Vuex)

// 定义屏幕尺寸断点
export const BREAKPOINTS = {
    MOBILE: 600,
    TABLET: 840,
    DeskTop: 930,
    DeskTopHeader: 1180,
}

export default new Vuex.Store({
    state: {
        isContentActive: false,
        isInRoot: true,
        // 响应式状态
        screenWidth: window.innerWidth,
        nickname: '',
        avatar: '', // TODO:确认下是否需要默认头像，用于初始的占位
    },
    mutations: {
        SET_CONTENT_ACTIVE(state, active) {
            state.isContentActive = active
        },
        SET_IS_IN_ROOT(state, isInRoot) {
            state.isInRoot = isInRoot
        },
        // 更新屏幕宽度
        SET_SCREEN_WIDTH(state, width) {
            state.screenWidth = width
        },
        SET_NICKNAME(state, nickname) {
            state.nickname = nickname
        },
        SET_AVATAR(state, avatar) {
            state.avatar = avatar
        },
    },
    actions: {
        setContentActive({ commit }, active) {
            commit('SET_CONTENT_ACTIVE', active)
        },
        setIsInRoot({ commit }, isInRoot) {
            commit('SET_IS_IN_ROOT', isInRoot)
        },
        // 更新屏幕宽度
        setScreenWidth({ commit }, width) {
            commit('SET_SCREEN_WIDTH', width)
        },
        // 初始化窗口大小监听
        setupResizeListener({ commit }) {
            const handleResize = () => {
                commit('SET_SCREEN_WIDTH', window.innerWidth)
            }
            // 添加窗口大小变化监听
            window.addEventListener('resize', handleResize)
            // 返回清理函数
            return () => {
                window.removeEventListener('resize', handleResize)
            }
        },
        async setUserInfo({ commit }) {
            // TODO: 获取用户信息
            const userInfo = await getUserInfo()
            if (userInfo) {
                commit('SET_NICKNAME', userInfo.nickname)
                commit('SET_AVATAR', userInfo.avatar)
            }
        },
    },
    getters: {
        isContentActive: (state) => state.isContentActive,
        isInRoot: (state) => state.isInRoot,
        // 响应式计算属性
        screenWidth: (state) => state.screenWidth,
        isMobile: (state) => state.screenWidth < BREAKPOINTS.MOBILE,
        isTablet: (state) =>
            state.screenWidth >= BREAKPOINTS.MOBILE && state.screenWidth < BREAKPOINTS.DeskTop,
        isDesktop: (state) => state.screenWidth >= BREAKPOINTS.DeskTop,
        isDesktopHeader: (state) => state.screenWidth >= BREAKPOINTS.DeskTopHeader,
        viewType: (state) => {
            if (state.screenWidth < BREAKPOINTS.MOBILE) {
                return 'mobile'
            }
            if (state.screenWidth >= BREAKPOINTS.MOBILE && state.screenWidth < BREAKPOINTS.TABLET) {
                return 'tablet'
            }
            return 'desktop'
        },
        nickname: (state) => state.nickname,
        avatar: (state) => state.avatar,
    },
})
