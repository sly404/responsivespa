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
            this.$emit("go-back")
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
