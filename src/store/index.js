import Vue from 'vue'
import Vuex from 'vuex'
import { getUserInfo } from '../requests/userRequest'
import { addLike, deleteComment } from '../requests/commentRequest'
import ui from './modules/ui'

Vue.use(Vuex)

// 定义屏幕尺寸断点
export const BREAKPOINTS = {
    MOBILE: 600,
    TABLET: 840,
    DeskTop: 930,
    DeskTopHeader: 1180,
}

const defaultNickname = '狐狐网友'
const defaultAvatar = '//statics.itc.cn/mobile/ucenter/images/ic_home_photo_gray.png'
export default new Vuex.Store({
    modules: {
        ui,
    },
    state: {
        isContentActive: false,
        isInRoot: true,
        // 响应式状态
        screenWidth: window.innerWidth,
        nickname: defaultNickname,
        avatar: defaultAvatar,
        showImgView: false, // 是否显示预览图片
        viewImgUrl: "", // 预览图片的url
        viewImgOrigin: "", // 预览图片的原始位置
        myCommentList: [], // 我的评论列表
        replyCommentList: [], // 回复评论列表
        commentsSum: 0, // 评论总数
        toast: {
            toastShow: false,
            toastText: "",
            toastStatus: "",
        },
        replyComment: {
            // 点击回复的评论数据
            topic_title: "",
            source_id: "",
            topic_url: "",
            reply_id: "",
            channel_id: "",
        },
        currentReply: {
            // 当前回复的信息
            scrollY: 0,
        },
        commentReport: {
            isShow: false,
            commentId: null,
            sourceId: null,
        },
    },
    mutations: {
        SET_NICKNAME(state, nickname) {
            state.nickname = nickname
        },
        SET_AVATAR(state, avatar) {
            state.avatar = avatar
        },
        DELETE_COMMENT(state, commentInfo) {
            debugger
            const { index } = commentInfo
            state.myCommentList.splice(index, 1)
            state.commentsSum = state.commentsSum - 1
        },
        ADD_REPLY_LIKE(state, index) {
            if(index < 0 || index === undefined) { return }
            state.replyCommentList[index].comment.isLiked = true
            state.replyCommentList[index].comment.likeCount++
        },
        TOGGLE_TOAST(state, params) {
            state.toast.toastShow = !state.toast.toastShow
            if (params && params.text) {
                state.toast.toastText = params.text
            }
            if (params && params.status) {
                state.toast.toastStatus = params.status
            }
        },
        /**
         * 切换回复框的显示状态，并更新相关信息
         * @param {Object} state - 状态对象
         * @param {Object} params - 参数对象
         * @param {string} [params.username] - 回复的用户名
         * @param {number} [params.scrollY] - 滚动位置
         */
        toggleReply(state, params) {
            if (params && params.scrollY) {
                state.currentReply.scrollY = params.scrollY
            } else {
                state.currentReply.scrollY = 0
            }
        },
        /**
         * 切换评论举报框的显示状态，并更新相关信息
         * @param {Object} state - 状态对象
         * @param {Object} param - 参数对象
         * @param {boolean} param.isShow - 是否显示举报框
         * @param {number} param.commentId - 评论的ID
         * @param {number} param.sourceId - 评论的源ID
         */
        toggleCommentReport(state, {isShow, commentId, sourceId}) {
            state.commentReport.isShow = isShow
            state.commentReport.commentId = commentId
            state.commentReport.sourceId = sourceId
        },
        /**
         * 设置我的评论列表
         * @param {Object} state - 状态对象
         * @param {Array} list - 我的评论列表
         */
        setMyCommentList(state, list) {
            state.myCommentList = list
        },
        setReplyCommentList(state, list) {
            state.replyCommentList = list
        },
        setCommentSum(state, sum) {
            state.commentsSum = sum
        },
        // 更新屏幕宽度
        setScreenWidth(state, width) {
            state.screenWidth = width
        },
        setIsInRoot(state, isInRoot) {
            state.isInRoot = isInRoot
        },
        setContentActive(state, isContentActive) {
            state.isContentActive = isContentActive
        },
        setReplyComment(state, params) {
            state.replyComment = params
        },
        setShowImgView(state, show) {
            state.showImgView = show
        },
        setViewImgUrl(state, url) {
            state.viewImgUrl = url
        },
        setViewImgOrigin(state, origin) {
            state.viewImgOrigin = origin
        },
    },
    actions: {
        // 初始化窗口大小监听
        setupResizeListener({ commit }) {
            const handleResize = () => {
                commit("setScreenWidth", window.innerWidth)
            }
            // 添加窗口大小变化监听
            window.addEventListener("resize", handleResize)
            // 返回清理函数
            return () => {
                window.removeEventListener("resize", handleResize)
            }
        },
        async setUserInfo({ commit }) {
            const type = this.getters.isMobile ? "mobile" : "pc"
            const userInfo = await getUserInfo(type)
            if (userInfo) {
                commit("SET_NICKNAME", userInfo.nickname)
                commit("SET_AVATAR", userInfo.avatar)
            }
        },
        async deleteComment({ commit }, commentInfo) {
            const { sourceId, commentId } = commentInfo
            try {
                const isSuccess = await deleteComment({ source_id: sourceId, comment_id: commentId })
                if (isSuccess) {
                    commit("DELETE_COMMENT", commentInfo)
                } else {
                    throw new Error("删除失败")
                }
            } catch (error) {
                throw error
            }
        },
        /**
         * 异步操作：为回复评论添加点赞
         * @param {Object} context - 上下文对象，包含 commit 方法
         * @param {Object} params - 参数对象
         * @param {number} params.sourceId - 评论的源ID
         * @param {number} params.commentId - 评论的ID
         * @param {number} params.index - 评论在列表中的索引
         */
        async addReplyLike({ commit }, params) {
            const { sourceId, commentId, index } = params
            await addLike({ source_id: sourceId, comment_id: commentId })
            commit("ADD_REPLY_LIKE", index)
        },
    },
    getters: {
        isMobile: (state) => state.screenWidth < BREAKPOINTS.MOBILE,
        isTablet: (state) =>
            state.screenWidth >= BREAKPOINTS.MOBILE &&
            state.screenWidth < BREAKPOINTS.DeskTop,
        isDesktop: (state) => state.screenWidth >= BREAKPOINTS.DeskTop,
        isDesktopHeader: (state) =>
            state.screenWidth >= BREAKPOINTS.DeskTopHeader,
        viewType: (state) => {
            if (state.screenWidth < BREAKPOINTS.MOBILE) {
                return "mobile"
            }
            if (
                state.screenWidth >= BREAKPOINTS.MOBILE &&
                state.screenWidth < BREAKPOINTS.DeskTop
            ) {
                return "tablet"
            }
            return "desktop"
        },
    },
})
