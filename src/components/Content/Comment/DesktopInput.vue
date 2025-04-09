<template>
    <div class="replay">
        <textarea :placeholder="placeholder" rows="1" name="S1" cols="9" onscroll="this.rows++;" v-model="text"/>
        <div class="emoji-c">
            <div class="emoji" @click="handleShowEmoji"/>
            <div class="cmt-brow-wrap" v-if="showEmoji">
                <div class="cmt-face-box">
                    <div v-for="item in emojiList" :key="item.id" @click="handleSelectEmoji(item.name)">
                        <div :class="['cmt-face-item',`cmt-face-${item.id}`]"></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="reply-btn"><div class="btn" @click="handelSubmit">回复</div></div>
        <div class="comment-tip" v-show="showSuccess"><i class="icon cmt-suc-icon"></i>回复评论成功</div>
        <div class="comment-tip" v-show="showFail"><i class="icon cmt-suc-icon cmt-fail-icon"></i>回复评论失败</div>
    </div>
</template>

<script>
import  { sendReply }  from '../../../requests/commentRequest'

export default {
    name: 'replayInput',
    data() {
        return {
            rowNumber: 1,
            text:'',
            showEmoji: false,
            showSuccess: false,
            showFail: false,
            emojiList:[
                { id:1, name:'流汗' },
                { id:2, name:'钱' },
                { id:3, name:'发怒' },
                { id:4, name:'浮云' },
                { id:5, name:'给力' },
                { id:6, name:'大哭' },
                { id:7, name:'憨笑' },
                { id:8, name:'色' },
                { id:9, name:'奋斗' },
                { id:10, name:'鼓掌' },
                { id:11, name:'鄙视' },
                { id:12, name:'可爱' },
                { id:13, name:'闭嘴' },
                { id:14, name:'疑问' },
                { id:15, name:'抓狂' },
                { id:16, name:'惊讶' },
                { id:17, name:'可怜' },
                { id:18, name:'弱' },
                { id:19, name:'强' },
                { id:20, name:'握手' },
                { id:21, name:'拳头' },
                { id:22, name:'酒' },
                { id:23, name:'玫瑰' },
                { id:24, name:'打酱油' },
            ]
        }
    },
    methods: {
        handleClickBody() {
            this.showEmoji = false
            document.querySelector('body').removeEventListener('click',this.handleClickBody)
        },
        handleSelectEmoji(name) {
            console.log('name',name)
            if(!name)return
            this.text = this.text+`[/${name}]`
        },
        handleShowEmoji() {
            this.showEmoji = true
            setTimeout(()=>{
                document.querySelector('body').addEventListener('click',this.handleClickBody)
            },200)
        },
        handelSubmit() {
            if(!this.text)return
            const params = {
                reply_id: this.replyId,
                attachment_urls: '',
                content: this.text,
                media_id: '',
                channel_id: this.channelId,
                topic_title: this.topicTitle,
                source_id: this.sourceId,
                topic_url: this.topicUrl,
            }
            sendReply(params).then(()=>{
                this.showSuccess = true
                setTimeout(()=>{
                    this.showSuccess = false
                    this.$emit('cancelReplay')
                },2000)
            }).catch(()=>{
                this.showFail = true
                setTimeout(()=>{
                    this.showFail = false
                },2000)
            })
        }
    },
    computed: {
        placeholder() {
            return `回复 ${this.userName}:`
        },
        replyComment(){
            return this.$store.state.replyComment || {}
        },
        userName() {
            return this.replyComment.user_name
        },
        sourceId(){
            return this.replyComment.source_id
        },
        topicTitle(){
            return this.replyComment.topic_title
        },
        topicUrl(){
            return this.replyComment.topic_url
        },
        channelId(){
            return this.replyComment.channel_id
        },
        replyId(){
            return this.replyComment.reply_id
        },

    }
}
</script>

<style lang="less" scoped>
    .replay {
        display: flex;
        padding: 30px 0 10px 0;
        position:relative;
        textarea {
            flex: 1;
            border: 0;
            resize:none;
            border-bottom: 1px #ccc solid;
            min-height: 20px;
            color: #888;
        }
        textarea:focus {
            outline: none;
        }
        .emoji-c {
            margin-left: 4px;
            width: 20px;
            position: relative;
            .emoji {
                width: 20px;
                height: 20px;
                background: url('../assets/cmt_brow_icon.png') no-repeat 0 0;
                position: absolute;
                bottom: 0;
                left: 0;
            }
            .emoji:hover {
                background-position: 0 -30px;
            }
            .cmt-brow-wrap{
                width:402px;
                height:158px;
                background:url(../assets/bg03.png) no-repeat 0 0;
                position:absolute;
                right:-107px;
                bottom: -158px;
                .cmt-face-box{
                    width:376px;
                    height:120px;
                    overflow:hidden;
                    margin:0 auto;
                    margin-top:21px;
                    div{
                        display: inline-block;
                        height:40px;
                        line-height:40px;
                        width:40px;
                        margin:0 4px 0 3px;
                        text-align: center;
                        cursor:pointer;
                        &:hover{
                            background-color:#f5f5f5;
                        }
                    }
                    .cmt-face-item{
                        width:22px;
                        height:22px;
                        display:inline-block;
                        margin:0 auto -6px;
                        background-image:url(../assets/cmt-face.png);
                    }
                    .cmt-face-1 {
                        background-position: -2px -2px;
                    }
                    .cmt-face-2 {
                        background-position: -2px -24px;
                    }
                    .cmt-face-3 {
                        background-position: -1px -49px;
                    }
                    .cmt-face-4 {
                        background-position: -2px -73px;
                    }
                    .cmt-face-5 {
                        background-position: -2px -97px;
                    }
                    .cmt-face-6 {
                        background-position: -2px -121px;
                    }
                    .cmt-face-7 {
                        background-position: -2px -145px;
                    }
                    .cmt-face-8 {
                        background-position: -2px -168px;
                    }
                    .cmt-face-9 {
                        background-position: -2px -192px;
                    }
                    .cmt-face-10 {
                        background-position: -2px -215px;
                    }
                    .cmt-face-11 {
                        background-position: -2px -238px;
                    }
                    .cmt-face-12 {
                        background-position: -2px -260px;
                    }
                    .cmt-face-13 {
                        background-position: -2px -284px;
                    }
                    .cmt-face-14 {
                        background-position: -2px -307px;
                    }
                    .cmt-face-15 {
                        background-position: -2px -331px;
                    }
                    .cmt-face-16 {
                        background-position: -2px -355px;
                    }
                    .cmt-face-17 {
                        background-position: -2px -378px;
                    }
                    .cmt-face-18 {
                        background-position: -2px -401px;
                    }
                    .cmt-face-19 {
                        background-position: -2px -425px;
                    }
                    .cmt-face-20 {
                        background-position: -2px -445px;
                    }
                    .cmt-face-21 {
                        background-position: -2px -465px;
                    }
                    .cmt-face-22 {
                        background-position: -2px -488px;
                    }
                    .cmt-face-23 {
                        background-position: -2px -511px;
                    }
                    .cmt-face-24 {
                        background-position: -2px -535px;
                    }
                    
                }
            }
        }
        .reply-btn {
            margin-left: 10px;
            width: 86px;
            position: relative;
            .btn {
                cursor: pointer;
                width: 86px;
                height: 42px;
                color: #fff;
                border-radius: 5px;
                background: #ff4646;
                text-align: center;
                line-height: 42px;
                font-size: 14px;
                position: absolute;
                bottom: 0;
                left: 0;
            }
            .btn:hover {
                background: #d81519;
            }
        }
        .comment-tip{
            width:130px;
            height:90px;
            background:#fff;
            border:1px #eee solid;
            box-shadow:0 0 10px rgba(0,0,0,.15);
            position:absolute;
            left: 0;
            right: 0;
            margin: auto;
            color:#666;
            font-size:14px;
            line-height:20px;
            text-align:center;
            border-radius:5px;
            .cmt-suc-icon{
                width:30px;
                height:33px;
                margin:19px auto 5px;
                display:block;
                background:url(../assets/cmt_suc_icon.png) no-repeat 0 0;
            }
            .cmt-fail-icon{
                background:url(../assets/cmt_fail_icon.png) no-repeat 0 0;
            }
        }
    }
</style>
