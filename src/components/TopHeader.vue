<template>
    <div class="top-header">
        <div class="back-button" @click="goBack">
            <i class="icon-arrow-left"></i>
        </div>
        <div class="header-title">{{ title }}</div>
        <div class="header-icon"></div>
    </div>
</template>

<script>
import { getEnvironmentByURL } from 'mpfe-utils';
export default {
    name: "TopHeader",
    props: {
        title: {
            type: String,
            default: "个人中心",
        },
        icon: {
            type: String,
            default: "menu",
        },
    },
    methods: {
        goBack() {
            // 获取当前路由信息
            const currentRoute = this.$router.currentRoute;
            // 判断是否在根路径
            if (currentRoute.path === '/' || currentRoute.fullPath === '/') {
                if (
                    document.referrer &&
                    document.referrer.indexOf("m.sohu.com/login") == -1 &&
                    document.referrer.indexOf("mp.sohu.com/") == -1 &&
                    document.referrer.indexOf("read.m.sohu.com/") == -1 &&
                    document.referrer.indexOf("book.m.sohu.com/") == -1
                ) {
                    // 如果有referrer且referrer不是登录页、小说页、搜狐号
                    window.history.back();
                } else { // 否则就返回手搜主页
                    const urlMap = {
                        test: "//test-m.sohu.com",
                        pre: "//pre-m.sohu.com",
                        prod: "//m.sohu.com"
                    };
                    const env = getEnvironmentByURL()
                    window.location.href = urlMap[env] || urlMap.prod;
                }
            } else {
                // 否则正常返回上一页
                this.$router.go(-1);
            }
        },
    },
}
</script>

<style scoped>
.top-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    padding: 12px;
    background-color: var(--color-background);
    position: sticky;
    top: 0;
    z-index: 3;
    margin-bottom: 12px;
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
    background: url("../assets/images/icon_back.png") no-repeat center center;
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
    background: url("../assets/images/icon_expand.png") no-repeat center center;
    background-size: 100% 100%;
}
</style>
