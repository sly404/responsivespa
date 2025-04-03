<template>
    <div :class="buttonCls" @click="clickHandler" ref="button">
        <h2 class="title abs">{{ text }}</h2>
    </div>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            default: 'default',
        },
        text: {
            type: String,
            default: '按钮',
        },
        onClick: {
            type: Function,
            default: function () {},
        },
    },
    data() {
        return {
            buttonCls: 'button-wrapper ' + this.type,
        }
    },
    methods: {
        clickHandler() {
            this.onClick()
        },
    },
    mounted() {},
}
</script>

<style scoped lang="less">
    .button-wrapper {
        position: relative;
        width: 60%;
        height: 40px;
        margin: 15px auto;
        border: 4px;
        &.default {
            color: #222;
            border: 1px solid #ffd200;
        }
        &.primary {
            color: #fff;
            background-color: #ffd200;
            border-color: #fd2
        }
        &.system {
            width: 690px;
            height: 88px;
            background: #fff;
            border-radius: 16px;
            color: #a4a4a4;
            h2 {
                font-size: 32px; /*px*/
                color: inherit;
            }
        }
        .title {
            text-align: center;
            font-size: 18px;
            line-height: 40px;
            width: 100%;
        }
    }
</style>

