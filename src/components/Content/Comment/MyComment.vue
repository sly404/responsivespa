<template>
    <div 
        class="my-comment" 
        ref="myComment" 
        @scroll.passive="handleScroll">
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
import { throttle } from 'mpfe-utils'

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
            scrollFunc: null,  // 添加防抖定时器
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
                console.log('获取评论失败',error);
            } finally {
                this.isLoading = false;
            }
        },
        getMoreComments(){
            this.pageNo++;
            this.getMyCommentList();
        },
        handleScroll() {
            if(!this.scrollFunc) {
                this.scrollFunc = throttle(() => {
                    const container = this.$refs.myComment;
                    const scrollHeight = container.scrollHeight;
                    const scrollTop = container.scrollTop;
                    const clientHeight = container.clientHeight;
                    // 当距离底部小于100px且不在加载中且未加载完时，触发加载
                    if (scrollHeight - scrollTop - clientHeight < 100 && !this.isLoading && !this.finished) {
                        this.getMoreComments();
                    }
                }, 150)
            }
            this.scrollFunc()
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