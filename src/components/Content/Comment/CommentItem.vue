<template>
    <!-- 我的评论 -->
    <div
        class="comment-item-wrapper"
        :class="{ deleting: data.comment.isDeleting, deleted: data.comment.isDeleted }"
        v-if="type == 'comment'"
        data-spm-type="resource"
        :data-spm-content="spmContent"
    >
        <div class="comment-item-title">
            <div class="userHead">
                <avatar type="small" :url="avatar"></avatar>
            </div>
            <div class="item-title">
                <span class="userName">{{ nickname }}</span>
            </div>
        </div>
        <div class="comment-item-content">
            <div class="comment-discuss">
                <CommentText :text="commentContent"></CommentText>
            </div>
            <div 
                v-if="data.comment.attachment"
                class="attachment"
                @click.stop="handleImgClick(data, $event)">
                <img :src="cutCommentImg(data.comment.attachment)">
            </div>
            <div class="comment-inner-discuss">
                <clamp :content="innerReplyContent" :img="replyImg"></clamp>
                <a class="origin" href="javascript:void(0)" @click="clickOrigin">
                    {{ topicTitle }}
                </a>
            </div>
            <div class="comment-item-footer">
                <span class="date">{{ date }}</span>
                <span v-if="statusInfo" class="status-info">{{statusInfo}}</span>
                <span class="delete" @click="clickDelete"></span>
            </div>
        </div>
    </div>
    <!-- 回复我的 -->
    <div 
        v-else
        class="comment-item-wrapper" 
        data-spm-type="resource"
        :data-spm-content="spmContent">
        <div class="comment-item-title">
            <div class="userHead">
                <avatar type="small" :url="data.user && data.user.avatar"></avatar>
            </div>
            <div class="item-title">
                <span class="userName">{{ data.user && data.user.username }} 回复了我：</span>
            </div>
        </div>
        <div class="comment-item-content">
            <div class="comment-discuss">
                <CommentText :text="commentContent"></CommentText>
            </div>
            <div 
                v-if="attachment"
                class="attachment"
                @click.stop="handleImgClick(data, $event)">
                <img :src="cutCommentImg(attachment)">
            </div>
            <div class="comment-inner-discuss">
                <clamp :content="innerReplyContent" :img="replyImg"></clamp>
                <a class="origin" href="javascript:void(0)" @click="clickOrigin">
                    {{ topicTitle }}
                </a>
            </div>
            <div class="comment-item-footer">
                <span class="date">{{ date }}</span>
                <div class="like" @click="clickLike">
                     <i
                        :class="[
                            'glyph',
                            showLikeIcon ? 'glyph-like-s' : 'glyph-like'
                        ]"
                    ></i>
                    <em class="like-count" v-if="data.comment.likeCount">{{ data.comment.likeCount }}</em>
                </div>
                <div class="comment" @click="clickComment">
                    <i class="glyph glyph-comment"></i>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// components
import Avatar from './Avatar.vue'
import Clamp from './Clamp.vue'
// util
import { sendSpmAction, setPicSize } from 'mpfe-utils'
import CommentText from 'common-components/lib/commentText/index'
import 'common-components/lib/commentText/index.css'
import { mapActions, mapState } from 'vuex'
import { initDate } from '../../../utils/index'
import { acodeConfig } from '../../../config/spmConfig'

export default {
    props: {
        type: {
            type: String,
            default: 'comment',
        },
        data: {
            type: Object,
            default: function () {
                return {}
            },
        },
        index: {
            type: Number,
            default: 0,
        },
    },
    components: {
        avatar: Avatar,
        clamp: Clamp,
        CommentText,
    },
    data() {
        return {
            isLike: false
        }
    },
    computed: {
        ...mapState(['nickname', 'avatar']),
        commentId(){
            return this.data.comment && this.data.comment.id
        },
        sourceId(){
            return this.data.topic && this.data.topic.sourceId
        },
        commentContent() {
            return this.data.comment?.richContent
        },
        topicTitle(){
            return this.data.topic && this.data.topic.topicTitle
        },
        topicLink(){
            return this.data.topic && this.data.topic.topicLink
        },
        innerReplyContent() {
            if(this.type === 'comment') return ''
            let result = ''
            const userName = this.nickname
            const parentCommentContent = this.data.comment.parents?.[0]?.richContent
            if (this.data.comment && this.data.comment.parents && this.data.comment.parents[0]) {
                result = this.data.comment.parents[0].displayStatus
                    ? `${userName} : ${parentCommentContent ? parentCommentContent : ''}`
                    : `${userName} : 该条评论已删除!`
            } else {
                result = `${userName} : 该条评论已删除!`
            }
            return result
        },
        attachment(){
            return this.data.comment.attachment
        },
        channelId(){
            return this.data.topic.channelId
        },
        replyImg(){
            return this.data?.comment?.parents?.[0]?.attachment
        },
        date() {
            return initDate(this.data.comment && this.data.comment.date)
        },
        commentStatus() {
            return this.data.comment && this.data.comment.commentStatus
        },
        statusInfo() {
            const info = {
                0: '审核中',
                2: '未通过',
                23: '未通过',
            }
            return info[this.commentStatus]
        },
        showLikeIcon() {
            return this.data.comment.isLiked || this.isLike
        },
        spmContent(){
            const commentId = this.data?.comment?.commentId || this.data?.comment?.id
            return `||${commentId}|||`
        }
    },
    methods: {
        ...mapActions(['addReplyLike']),
        clickOrigin() {
            sendSpmAction(acodeConfig.clickCommentOrigin, `type:${this.type}`)
            window.location.href = this.topicLink
        },
        clickDelete() {
            this.$store.commit('toggleDeleteConfirm', {
                sourceId: this.sourceId,
                commentId: this.commentId,
                index: this.index,
            })
        },
        clickLike() {
            if (!this.showLikeIcon) {
                sendSpmAction(acodeConfig.clickCommentLike, `type:${this.type}`)
                this.addReplyLike({
                    sourceId: this.sourceId,
                    commentId: this.commentId,
                    index: this.index,
                })
            }
        },
        clickComment() {
            sendSpmAction(acodeConfig.clickCommentReply, `type:${this.type}`)
            this.$store.commit('toggleReply', {
                username: this.data.user && this.data.user.username,
                scrollY: window.scrollY,
            })
            this.$store.commit('setReplyComment', {
                topic_title: this.topicTitle,
                source_id: this.sourceId,
                topic_url: this.topicLink,
                reply_id: this.commentId,
                channel_id: this.channelId,
            })
        },
        handleImgClick(item, event){
            this.$store.commit('setShowImgView', true)
            this.$store.commit('setViewImgUrl', item.comment?.attachment) // 预览显示原图
            const clickEl = event.target
            const elHeight = clickEl.offsetHeight
            const elWidth = clickEl.offsetWidth
            const top = clickEl?.getBoundingClientRect().top + elHeight / 2
            const left = clickEl?.getBoundingClientRect().left + elWidth / 2
            this.$store.commit('setViewImgOrigin', `${left}px ${top}px`)
        },
        cutCommentImg(img){
            if(!img) return
            return setPicSize(img, 300, 300, 'c_fit', 70)
        },
        getAvatarImg(img){
            if(!img) return
            return setPicSize(img, 100, 100)
        },
    },
}
</script>

<style scoped lang="less">
    @import '../../../styles/mixin.less';
    .glyph {
        font-size: 32px; /*px*/
        padding-right: 12px;
    }
    .comment-item-wrapper {
        padding-top: 24px;
        line-height: 1.3;
        .comment-item-title {
            display: flex;
            .userHead {
                display: inline-block;
                width: 66px;
                height: 66px;
                margin-right: 24px;
            }
            .item-title {
                display: flex;
                font-size: 28px; /* px */
                color:#a4a4a4;
                flex: 1;
                .userName {
                    display: inline-block;
                    vertical-align: top;
                    letter-spacing:0;
                    text-align:left;
                    height: 40px;
                    line-height: 40px;
                    flex: 1;
                }
                .status-info {
                    height: 36px;
                    font-size: 26px;/* px */
                    font-family: PingFangSC-Regular, PingFang SC;
                    font-weight: 400;
                    color: #999999;
                    line-height: 36px;
                }
            }
        }
        .comment-item-content {
            margin-left: 90px;
            margin-top: -6px;
            font-size: 24px; /* px */
            color: #2b2b2b;
            word-wrap: break-word;
            .comment-discuss { 
                font-size: 17PX;
                line-height: 25PX;
                /deep/ .comment-content-text{
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    .emoji{
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        line-height: normal;
                    }
                    .comment-at{
                        color: #143CA8;
                    }
                }
            }
            .attachment{
                width: 96PX;
                height: 96PX;
                margin-top: 8PX;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
            .comment-inner-discuss {
                font-size: 15PX;
                background: #eeeff1;
                padding: 10PX 12PX;
                margin-top: 12PX;
                p{
                    word-break: break-all;
                }
                .origin {
                    color: #a4a4a4;
                    word-break: break-all;
                    overflow: hidden;
                }
            }
            .comment-item-footer {
                margin-top: 22px;
                padding-bottom: 24px;
                border-bottom: 1px solid #e3e3e3; /* no */
                color: #a4a4a4;
                display: flex;
                align-items: center;
                .delete {
                    display: inline-block;
                    margin-left: auto;
                    width: 28px;/*px*/
                    height: 28px;/*px*/
                    background: url('../../assets/img/icon_delete_4.png') no-repeat;
                    background-size: 100% 100%;
                }
                .date {
                    margin-right: 10px;
                }
                .like{
                    margin-right: 24px;
                    em {
                        font-size: 26px; /*px*/
                        margin-top: -1px;
                    }
                    .glyph {
                        font-size: 30px; /*px*/
                    }
                    .glyph-like-s {
                        color: #fa4d51;
                        animation: heart_like .5s linear;
                    }
                }
                .like, .comment {
                    display: flex;
                    align-items: center;
                }
            }
        }
        &.deleting {
            animation: item_deleting .5s linear;
            animation-fill-mode : forwards;
        }
        &.deleted {
            display: none;
        }
    }
</style>

