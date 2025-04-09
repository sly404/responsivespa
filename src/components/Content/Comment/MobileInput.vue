<template>
    <CommentInput
        :articleId="articleId"
        :articleTitle="articleTitle"
        :articleUrl="articleUrl"
        :replyId="replyId"
        :showInput="false"
        ref="commentInput"
    />
</template>

<script>
import { eventNameMap } from '../../../config/eventConfig'
import CommentInput from 'common-components/lib/commentInput/index'
import 'common-components/lib/commentInput/index.css'
import { event } from 'mpfe-utils'
export default {
    name: 'MobileInput',
    components: {
        CommentInput
    },
    data() {
        return {
        }
    },
    computed: {
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
        replyId(){
            return String(this.replyComment.reply_id)
        },
    },
    mounted() {
        event.on(eventNameMap.showCommentPop, () => {
            this.$refs.commentInput.showCommentPop()
        })
    },
}
</script>

<style>

</style>