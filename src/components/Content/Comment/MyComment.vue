<template>
    <div class="my-comment">
        <CommentList
            v-if="isShow" 
            :comments="myCommentList" 
            type="comment"
            :spmCCode="spmCCode"
            :pageNo="pageNo" 
            :getMore="getMoreComments" 
            :isFinished="finished"
        ></CommentList>
    </div>
</template>

<script>
import CommentList from './CommentList.vue'
import { mapState } from 'vuex'
import { getMyCommentList } from '../../../requests/commentRequest'

export default {
    name: 'MyComment',
    components: {
        CommentList
    },
    data() {
        return {
            pageNo: 1,
            spmCCode: 'my-comment',
            isLoading: false,
            finished: false,
        }
    },
    computed:{
        ...mapState(['myCommentList']),
        isShow(){
            return this.myCommentList.length > 0
        }
    },
    mounted() {
        this.getMyCommentList()
    },
    methods: {
        async getMyCommentList() {
            this.isLoading = true;
            const param = {
                pageNo: this.pageNo,
                pageSize: 15,
                topicTypeId: '-2,-21'  // 21:话题 
            }
            try {
                const res = await getMyCommentList(param)
                if(!res.data) {
                    return;
                }
                // data空数组，且不是第一次请求
                if(res.data.length==0 && this.currentPageNo > 1) {
                    this.finished = true;
                    this.currentPageNo--;
                    return;
                }
                // data不足当前页size说明获取完了
                if(res.data.length < this.pageSize){
                        this.finished = true;
                    }
                res.data.forEach((data, i) => {
                    data.comment = Object.assign({},data,{
                        id: data.commentId,
                        isDeleting: false,
                        isDeleted: false
                    })
                    data.topic = {
                        id: data.topicId,
                        sourceId: data.sourceId,
                        topicLink: data.topicLink,
                        topicTitle: data.sourceType == 17 ? `话题：${data.topicTitle}` : `原文：${data.topicTitle}`, // 17-话题
                        channelId: '',
                        authorPassport: data.authorPassport,
                        auditMode: '',
                        addTime: '',
                        auditStatus: 0,
                        params: null,
                        topicTypeId: data.topicId
                    }
                    data.user = {
                        avatar: data.avatar,
                        passport: data.passport,
                        username: data.username
                    }
                });
                const comments = this.$store.state.myCommentList.concat(res.data);
                this.$store.commit('setMyCommentList', comments);
                const sum = this.$store.state.commentsSum + res.data.length;
                this.$store.commit('setCommentSum', sum);
            } catch (error) {
                this.isLoading = false;
                console.log('获取评论失败',error);
            }
        },
        getMoreComments(){
            this.pageNo++;
            this.getMyCommentList();
        }
    }
}
</script>

<style lang="less">
.my-comment {
    flex: 1;
    overflow-y: auto;
    scroll-behavior: smooth;
}
</style>