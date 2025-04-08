<template>
    <div 
        class="comment-item-wrapper" 
        :class="{ deleting: isDeleting, deleted: isDeleted }"
        data-spm-type="resource"
        :data-spm-content="spmContent"
    >
        <!-- 评论头部 -->
        <div class="comment-item-title">
            <div class="userHead">
                <avatar type="small" :url="isMyComment ? avatar : userAvatar"></avatar>
            </div>
            <div class="item-title">
                <span class="userName">
                    {{ isMyComment ? nickname : userNameWithReply }}
                </span>
            </div>
        </div>
        
        <!-- 评论内容区 -->
        <div class="comment-item-content">
            <!-- 评论文本 -->
            <div class="comment-discuss">
                <CommentText :text="commentContent"></CommentText>
            </div>
            
            <!-- 评论附件（图片） -->
            <div 
                v-if="attachment"
                class="attachment"
                @click.stop="handleImgClick($event)">
                <img :src="cutCommentImg(attachment)">
            </div>
            
            <!-- 来源信息内容：被回复的评论内容和评论的原文信息 -->
            <div class="comment-origin">
                <clamp v-if="showInnerReply" :content="innerReplyContent" :img="replyImg"></clamp>
                <a class="origin" href="javascript:void(0)" @click="clickOrigin">
                    {{ topicTitle }}
                </a>
            </div>
            
            <!-- 评论底部 -->
            <div class="comment-item-footer">
                <div class="footer-left">
                    <span class="date">{{ date }}</span>
                    <!-- 状态信息（仅对自己的评论显示） -->
                    <span v-if="statusInfo" class="status-info">{{statusInfo}}</span>
                </div>
                <div class="footer-right">
                    <!-- 操作区：删除、点赞或回复 -->
                    <template v-if="isMyComment">
                        <span class="delete" @click="clickDelete"></span>
                    </template>
                    <template v-else>
                        <div class="like" @click="clickLike">
                            <i :class="['footer-icon', showLikeIcon ? 'like-icon' : 'unlike-icon']"></i>
                            <span class="like-count" v-if="likeCount">{{ likeCount }}</span>
                        </div>
                        <div class="comment" @click="clickComment">
                            <i class="footer-icon comment-icon"></i>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// components
import Avatar from './Avatar.vue'
import Clamp from './Clamp.vue'
import CommentText from 'common-components/lib/commentText/index'
import 'common-components/lib/commentText/index.css'

// utils
import { sendSpmAction, setPicSize } from 'mpfe-utils'
import { mapActions, mapState } from 'vuex'
import { formatNumber, initDate } from '../../../utils/index'
import { acodeConfig } from '../../../config/spmConfig'

export default {
    name: 'CommentItem',
    components: {
        avatar: Avatar,
        clamp: Clamp,
        CommentText,
    },
    props: {
        type: {
            type: String,
            default: 'comment', // 'comment'：我的评论, 其他值：回复我的
        },
        data: {
            type: Object,
            default: () => ({})
        },
        index: {
            type: Number,
            default: 0,
        },
    },
    
    data() {
        return {
            isLike: false
        }
    },
    
    computed: {
        ...mapState(['nickname', 'avatar']),
        // 基础数据计算属性
        isMyComment() {
            return this.type === 'comment'
        },
        comment() {
            return this.data.comment || {}
        },
        topic() {
            return this.data.topic || {}
        },
        // 状态相关
        isDeleting() {
            return this.comment.isDeleting
        },
        isDeleted() {
            return this.comment.isDeleted
        },
        // 用户信息
        userAvatar() {
            return this.data.user?.avatar
        },
        userNameWithReply() {
            return `${this.data.user?.username || ''} 回复了我：`
        },
        // 评论内容相关
        commentId() {
            return this.comment.id
        },
        commentContent() {
            return this.comment.richContent
        },
        sourceId() {
            return this.topic.sourceId
        },
        topicTitle() {
            return this.topic.topicTitle
        },
        topicLink() {
            return this.topic.topicLink
        },
        channelId() {
            return this.topic.channelId
        },
        date() {
            return initDate(this.comment.date)
        },
        attachment() {
            return this.comment.attachment
        },
        likeCount() {
            return formatNumber(this.comment.likeCount)
        },
        // 回复相关信息
        parentComment() {
            return this.comment.parents?.[0]
        },
        showInnerReply() {
            return !this.isMyComment || (this.isMyComment && this.innerReplyContent)
        },
        innerReplyContent() {
            if (this.isMyComment) return ''
            
            const userName = this.nickname
            const parentContent = this.parentComment?.richContent || ''
            
            if (!this.parentComment) {
                return `${userName} : 该条评论已删除!`
            }
            
            return this.parentComment.displayStatus 
                ? `${userName} : ${parentContent}` 
                : `${userName} : 该条评论已删除!`
        },
        replyImg() {
            return this.parentComment?.attachment
        },
        // 状态和操作相关
        commentStatus() {
            return this.comment.commentStatus
        },
        statusInfo() {
            const statusMap = {
                0: '审核中',
                2: '未通过',
                23: '未通过',
            }
            return statusMap[this.commentStatus]
        },
        showLikeIcon() {
            return this.comment.isLiked || this.isLike
        },
        spmContent() {
            const commentId = this.comment.commentId || this.comment.id || ''
            return `||${commentId}|||`
        }
    },
    methods: {
        ...mapActions(['addReplyLike']),
        // 图片处理
        cutCommentImg(img) {
            if (!img) return
            return setPicSize(img, 300, 300, 'c_fit', 70)
        },
        // 操作方法
        clickOrigin() {
            sendSpmAction(acodeConfig.clickCommentOrigin, `type:${this.type}`)
            window.location.href = this.topicLink
        },
        async clickDelete() {
            const deleteCommentInfo = {
                sourceId: this.sourceId,
                commentId: this.commentId,
                index: this.index,
            }
            this.$confirm({
                title: '确认要删除这条评论吗？',
                confirmText: '删除',
                cancelText: '取消',
            }).then(async () => {
                try {
                    await this.$store.dispatch('deleteComment', deleteCommentInfo)
                    this.$toast({
                        text: "删除成功",
                        status: "success",
                    })
                }catch (error) {
                    console.log('删除失败', error)
                    this.$toast({
                        text: "删除失败",
                        status: "warn",
                    })
                }
            }).catch((error) => {
                console.log('取消删除', error)
            })
        },
        async clickLike() {
            if (this.showLikeIcon) return
            sendSpmAction(acodeConfig.clickCommentLike, `type:${this.type}`)
            try {
                await this.addReplyLike({
                    sourceId: this.sourceId,
                    commentId: this.commentId,
                    index: this.index,
                })
            } catch (error) {
                console.log('点赞失败', error)
                this.$toast({
                    text: "点赞失败",
                    status: "warn",
                })
            }
        },
        clickComment() {
            sendSpmAction(acodeConfig.clickCommentReply, `type:${this.type}`)
            this.$store.commit('toggleReply', {
                username: this.data.user?.username,
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
        handleImgClick(event) {
            this.$store.commit('setShowImgView', true)
            this.$store.commit('setViewImgUrl', this.attachment) // 预览显示原图
            
            const clickEl = event.target
            const elHeight = clickEl.offsetHeight
            const elWidth = clickEl.offsetWidth
            const top = clickEl?.getBoundingClientRect().top + elHeight / 2
            const left = clickEl?.getBoundingClientRect().left + elWidth / 2
            
            this.$store.commit('setViewImgOrigin', `${left}px ${top}px`)
        }
    }
}
</script>

<style scoped lang="less">
@import '../../../styles/mixin.less';

.comment-item-wrapper {
    padding: 16px 16px 0 16px;
    
    // 评论标题
    .comment-item-title {
        display: flex;
        
        .userHead {
            display: inline-block;
            width: 32px;
            height: 32px;
            margin-right: 8px;
        }
        
        .item-title {
            flex: 1;
            display: inline-flex;
            align-items: center;
            .userName {
                display: inline-block;
                vertical-align: top;
                letter-spacing: 0;
                flex: 1;
                font-weight: 500;
                font-size: 14px;
                color: var(--color-text-primary);
                line-height: 20px;
            }
        }
    }
    
    // 评论内容
    .comment-item-content {
        margin-left: 40px;
        margin-top: 2px;
        word-wrap: break-word;
        
        // 评论文本
        .comment-discuss {
            font-weight: 400;
            font-size: 14px;
            color: var(--color-text-primary);
            line-height: 22px;
            
            :deep(.comment-content-text) {
                display: flex;
                align-items: center;
                flex-wrap: wrap;
                
                .emoji {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    line-height: normal;
                }
                
                .comment-at {
                    color: #143CA8;
                }
            }
        }
        
        // 附件
        .attachment {
            width: 96px;
            height: 96px;
            margin-top: 8px;
            
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        
        // 内部评论
        .comment-origin {
            font-size: 15px;
            background: var(--color-background);
            padding: 8px 12px;
            margin-top: 8px;
            
            p {
                word-break: break-all;
            }
            
            .origin {
                font-weight: 400;
                font-size: 14px;
                color: var(--color-text-tertiary);
                line-height: 22px;
                word-break: break-all;
                overflow: hidden;
                .line-clamp(2);
            }
        }
        
        // 评论底部
        .comment-item-footer {
            margin-top: 12px;
            padding-bottom: 16px;
            border-bottom: 1px solid #EBEBEB; /* no */
            font-weight: 400;
            font-size: 12px;
            color: var(--color-text-quaternary);
            line-height: 18px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .footer-left, .footer-right {
                display: flex;
                align-items: center;
                flex-wrap: nowrap;
            }
            .date {
                margin-right: 10px;
            }
            .delete {
                display: inline-block;
                margin-left: auto;
                width: 14px;
                height: 14px;
                background: url('../../../assets/images/icon_delete.png') no-repeat;
                background-size: 100% 100%;
            }
            .footer-icon{
                width: 16px;
                height: 16px;
                cursor: pointer;
            }
            .like {
                margin-right: 12px;
                .like-count{
                    font-family: PingFangSC, PingFang SC;
                    font-weight: 400;
                    font-size: 12px;
                    color: var(--color-text-tertiary);
                    line-height: 16px;
                }
                .like-icon{
                    background: url('../../../assets/images/icon_like.png') no-repeat;
                    background-size: 100% 100%;
                    animation: heart_like .5s linear;
                    margin-right: 4px;
                }
                .unlike-icon{
                    background: url('../../../assets/images/icon_unlike.png') no-repeat;
                    background-size: 100% 100%;
                    margin-right: 4px;
                }
            }
            
            .like, .comment {
                display: flex;
                align-items: center;
            }
            .comment-icon {
                background: url('../../../assets/images/icon_comment.png') no-repeat;
                background-size: 100% 100%;
            }
        }
    }
    
    &.deleting {
        animation: item_deleting .5s linear;
        animation-fill-mode: forwards;
    }
    
    &.deleted {
        display: none;
    }
}

// 全局图标样式
.glyph {
    font-size: 32px; /*px*/
    padding-right: 12px;
}
</style>

