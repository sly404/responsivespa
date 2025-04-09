<template>
    <div class="feedback-c">
        <div class="main-c">
            <header>
                <span>{{ title }}</span>
                <i class="close-icon" @click="handleCancel"></i>
            </header>
            <section>
                <div v-for="item in list" :key="item.id" class="item" @click="changeItem(item.id)">
                    <i :class="[getCircleClass(item.id)]"></i>
                    {{ item.title }}
                </div>
            </section>
            <footer>
                <div class="submit" @click="handleSubmit">提交</div>
                <div class="cancel" @click="handleCancel">取消</div>
            </footer>
        </div>
        <div class="comment-tip" v-show="showSuccess"><i class="icon cmt-suc-icon"></i>举报成功</div>
        <div class="comment-tip" v-show="showFail"><i class="icon cmt-suc-icon cmt-fail-icon"></i>举报失败</div>
    </div>
</template>

<script>
import { sendReport } from '../../../requests/commentRequest'

export default {
    name: 'Report',
    data() {
        return {
            title: '选择举报类型',
            activeId: 1, // 已选选项
            showSuccess: false,
            showFail: false,
            list: [
                { title: '营销广告', id: 2 },
                { title: '淫秽色情', id: 1 },
                { title: '恶意攻击谩骂', id: 3 },
                { title: '其他', id: 4 },
            ],
        }
    },
    computed:{
        isShow(){
            return this.$store.state.commentReport?.isShow
        },
        commentId(){
            return this.$store.state.commentReport?.commentId
        },
        sourceId(){
            return this.$store.state.commentReport?.sourceId
        }
    },
    methods: {
        handleCancel() {
            this.$store.commit('toggleCommentReport', {
                isShow: false,
                commentId: null,
                sourceId: null
            })
        },
        getCircleClass(id) {
            if(this.activeId == id)return 'circle-active'
            return 'circle'
        },
        changeItem(id) {
            this.activeId = id
        },
        // 提交
        async handleSubmit() {
            const param = {
                comment_id: this.commentId,
                source_id: this.sourceId,
                report_reason: this.activeId
            }
            try {
                await sendReport(param)
                this.showSuccess = true
                setTimeout(()=>{
                    this.showSuccess = false
                    this.handleCancel()
                },2000)
            } catch(err) {
                this.showFail = true
                setTimeout(()=>{
                    this.showFail = false
                    this.handleCancel()
                },2000)
            }
        }
    },
    mounted() {
    },
}
</script>

<style lang="less" scoped>
.feedback-c {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, 0.4);
    color: #000;
    .main-c {
        width: 402px;
        height: 242px;
        background: white;
        box-sizing: border-box;
        border-radius: 2px;
        header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 50px;
            font-size: 16px;
            padding: 0 20px;
            .close-icon {
                width: 14px;
                height: 14px;
                background: url('../../../assets/images/icon_close_slim.png') no-repeat 0 0;
            }
        }
        section {
            margin: 5px 50px 28px;
            .item {
                display: inline-flex;
                align-items: center;
                width: 148px;
                height: 40px;
                font-size: 14px;
                cursor: pointer;
                .circle {
                    vertical-align: middle;
                    display: inline-block;
                    margin: 0 10px;
                    width: 12px;
                    height: 12px;
                    line-height: 12px;
                    background: url('../../../assets/images/icon_point.png') no-repeat center;
                }
                .circle-active {
                    vertical-align: middle;
                    display: inline-block;
                    margin: 0 10px;
                    width: 12px;
                    height: 12px;
                    line-height: 12px;
                    background: url(../../../assets/images/icon_point_active.png) no-repeat center;

                }
            }
        }
        footer {
            height: 38px;
            display: flex;
            align-items: center;
            justify-content: space-around;
            div {
                width: 120px;
                height: 38px;
                display: flex;
                align-items: center;
                justify-content: center;
                border: 1px solid #e8e8e8;
                border-radius: 5px;
            }
            .submit {
                background: #d9131a;
                border: 1px solid #d9131a;
                color: white;
            }
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
                background:url(../../../assets/images/icon_report_success.png) no-repeat 0 0;
            }
            .cmt-fail-icon{
                background:url(../../../assets/images/icon_report_fail.png) no-repeat 0 0;
            }
        }
}
</style>
