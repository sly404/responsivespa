<template>
    <CommentInput
        :articleId="articleId"
        :articleTitle="articleTitle"
        :articleUrl="articleUrl"
        :showInput="false"
        :isLogin="isLogin"
        @submit="handleSubmit"
        @toast="handleToast"
        ref="commentInput"
    />
</template>

<script>
import { eventNameMap } from '../../../config/eventConfig'
import CommentInput,{ eventEmitter, eventNameMap as commentEvent } from 'common-components/lib/commentInput/index'
import 'common-components/lib/commentInput/index.css'
import { event } from 'mpfe-utils'
import { mapState } from 'vuex'

export default {
    name: 'MobileInput',
    components: {
        CommentInput
    },
    computed: {
        ...mapState(['isLogin']),
        replyComment(){
            return this.$store.state.replyComment || {}
        },
        articleId(){
            const regex = /_(\d+)/
            const sourceId = this.replyComment.source_id
            const match = sourceId.match(regex)
            const articleId = match ? match[1] : ''
            return articleId
        },
        articleTitle(){
            return this.replyComment.topic_title
        },
        articleUrl(){
            return this.replyComment.topic_url
        },
    },
    mounted() {
        event.on(eventNameMap.showCommentPop, (param) => {
            eventEmitter.emit(commentEvent.showCommentPopup, {
                comItem: {
                    id: param?.commentId
                }
            })
        })
    },
    methods: {
        /**
         * @description: 评论成功回调
         * @param {*} newComment 发布的评论信息，包含id等字段，参考wap评论页评论发布后的data数据结构
         */
        handleSubmit(newComment){
            console.log('评论成功回调', newComment)
        },
        /**
         * @description: toast提示
         * @param {{ toastType: 'success' | 'error', toastText: String}} toastInfo 提示信息
         */
        handleToast(toastInfo = {}){
            const { toastType, toastText } = toastInfo
            this.$toast({
                text: toastText,
                status: toastType,
            })
        }
    }
}
</script>

<style>

</style>