<template>
    <div class="top-header">
        <div class="fixed-header">
            <div class="back-button" @click="goBack">
                <i class="icon-arrow-left"></i>
            </div>
            <div class="header-title">{{ headerTitle }}</div>
            <div class="header-icon"></div>
        </div>
    </div>
</template>

<script>
import { getEnvironmentByURL } from 'mpfe-utils'
import { mapGetters } from 'vuex'

export default {
    name: 'MobileHeader',
    props: {
        title: {
            type: String,
            default: '',
        },
    },
    computed: {
        ...mapGetters(['isInRoot']),
        headerTitle() {
            return (
                this.title ||
                (this.$route.meta && this.$route.meta.title) ||
                (this.$route.matched &&
                    this.$route.matched[0] &&
                    this.$route.matched[0].meta.title) ||
                '个人中心'
            )
        },
    },
    methods: {
        goBack() {
            // 判断是否已经在根路径
            if (this.isInRoot) {
                if (
                    document.referrer &&
                    document.referrer.indexOf('m.sohu.com/login') === -1 &&
                    document.referrer.indexOf('mp.sohu.com/') === -1 &&
                    document.referrer.indexOf('read.m.sohu.com/') === -1 &&
                    document.referrer.indexOf('book.m.sohu.com/') === -1
                ) {
                    // 如果有referrer且referrer不是登录页、小说页、搜狐号
                    window.history.back()
                } else {
                    // 否则就返回手搜主页
                    const urlMap = {
                        test: '//test-m.sohu.com',
                        pre: '//pre-m.sohu.com',
                        prod: '//m.sohu.com',
                    }
                    const env = getEnvironmentByURL()
                    window.location.href = urlMap[env] || urlMap.prod
                }
            } else {
                // 否则正常返回上一页
                window.history.back()
            }
        },
    },
}
</script>

<style lang="less" scoped>
.top-header {
    height: 44px;
    background-color: var(--color-white);
    .fixed-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 44px;
        box-sizing: border-box;
        padding: 12px;
        position: sticky;
        top: 0;
        z-index: 3;
        position: fixed;
        left: 0;
        right: 0;
    }
}

.back-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    cursor: pointer;
}

.icon-arrow-left {
    display: inline-block;
    width: 20px;
    height: 20px;
    background: url('../../assets/images/icon_back.png') no-repeat center center;
    background-size: 100% 100%;
}

.header-title {
    height: 24px;
    font-family: PingFangSC, PingFang SC;
    font-weight: 500;
    font-size: 17px;
    color: #111111;
    line-height: 24px;
    text-align: right;
    font-style: normal;
    text-align: center;
    flex: 1;
}

.header-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    cursor: pointer;
    background: url('../../assets/images/icon_expand.png') no-repeat center center;
    background-size: 100% 100%;
}
</style>
