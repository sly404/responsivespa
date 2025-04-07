<template>
    <div class="reply-me">
        <comment-list 
            v-if="replyCommentList.length" 
            :comments="replyCommentList"
            :spmCCode="spmCCode"
            type="replies" 
            :pageNo="pageNo" 
            :isFinished="finished" 
            :getMore="getMoreReplyList">
        </comment-list>
        <div class="no-replies" v-else>
            <img src="../../../assets/images/icon_empty_list.png">
            <p>暂时还没有人回复您哦～</p>
        </div>
    </div>
</template>

<script>
import { getReplyList } from '../../../requests/commentRequest';
import { mapState } from 'vuex';
import CommentList from './CommentList.vue';

export default {
    name: 'ReplyMe',
    components: {
        CommentList
    },
    data() {
        return {
            pageNo: 1,
            finished: false,
            spmCCode: 'replytome',
        }
    },
    computed: {
        ...mapState(['replyCommentList']),
    },
    methods: {
        async getReplyList() {
            this.isLoading = true;
            try {
                const res = await getReplyList(this.pageNo)
                if(!res.data) {
                    return;
                }
                // data空数组，且不是第一次请求
                if(res.data.length==0 && this.pageNo > 1) {
                    this.finished = true;
                    this.pageNo--;
                    return;
                }
                // data不足当前页size说明获取完了
                if(res.data.length < this.pageSize / 2){
                    this.finished = true;
                }
                res.data.forEach((data, i) => {
                    data.comment.isLiked = false;
                    if(data?.topic?.topicTitle) {
                        data.topic.topicTitle = data?.comment?.sourceType ==  17 ? `话题：${data?.topic.topicTitle}` : `原文：${data.topic.topicTitle}` // 17-话题
                    }
                });
                const replyList = this.$store.state.replyCommentList.concat(res.data);
                this.$store.commit('setReplyCommentList', replyList);
            } catch (error) {
                console.log(err);
            } finally {
                this.isLoading = false;
            }
        },
        getMoreReplyList() {
            if(this.finished || this.isLoading) {
                return;
            }
            this.pageNo++;
            this.getReplyList();
        },
    },
    mounted() {
        this.getReplyList();
    }
}
</script>

<style lang="less" scoped>

</style>