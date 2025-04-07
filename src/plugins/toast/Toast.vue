<template>
    <transition name="fade" mode="out-in">
        <div class="toast" v-show="isShow" :class="status">
            <div class="toast-content">
                <div class="toast-icon" v-if="showIcon"></div>
                <div class="toast-text">{{text}}</div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'Toast',
    props: {
        text: {
            type: String,
            default: ''
        },
        status: {
            type: String,
            default: 'default' // default, success, warn, error
        },
        duration: {
            type: Number,
            default: 2000
        }
    },
    data() {
        return {
            isShow: false,
            timer: null
        }
    },
    computed: {
        showIcon() {
            return this.status !== 'default'
        }
    },
    watch: {
        show(val) {
            this.isShow = val
            if (val && this.duration > 0) {
                this.startTimer()
            }
        }
    },
    methods: {
        startTimer() {
            if (this.timer) {
                clearTimeout(this.timer)
            }
            this.timer = setTimeout(() => {
                this.isShow = false
                this.$emit('update:show', false)
                this.$emit('hide')
            }, this.duration)
        },
        show(options = {}) {
            if (typeof options === 'string') {
                options = { text: options }
            }
            this.text = options.text || this.text
            this.status = options.status || this.status
            this.isShow = true
            
            if (this.duration > 0) {
                this.startTimer()
            }
            
            return this
        },
        hide() {
            this.isShow = false
            if (this.timer) {
                clearTimeout(this.timer)
                this.timer = null
            }
            return this
        }
    },
    beforeDestroy() {
        if (this.timer) {
            clearTimeout(this.timer)
            this.timer = null
        }
    }
}
</script>

<style lang="less" scoped>
.toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    padding: 16px 24px;
    max-width: 300px;
    border-radius: 4px;
    visibility: visible;
    
    &.success {
        background-color: rgba(0, 128, 0, 0.8);
        .toast-icon {
            position: relative;
            &:before {
                content: '';
                position: absolute;
                width: 10px;
                height: 5px;
                border-left: 2px solid #fff;
                border-bottom: 2px solid #fff;
                transform: rotate(-45deg);
                top: 50%;
                left: 50%;
                margin-top: -4px;
                margin-left: -5px;
            }
        }
    }
    
    &.warn {
        background-color: rgba(255, 153, 0, 0.8);
        .toast-icon {
            position: relative;
            &:before {
                content: '';
                position: absolute;
                width: 3px;
                height: 12px;
                background-color: #fff;
                top: 50%;
                left: 50%;
                margin-top: -8px;
                margin-left: -1.5px;
                border-radius: 1px;
            }
            &:after {
                content: '';
                position: absolute;
                width: 3px;
                height: 3px;
                background-color: #fff;
                border-radius: 50%;
                top: 50%;
                left: 50%;
                margin-top: 5px;
                margin-left: -1.5px;
            }
        }
    }
    
    &.error {
        background-color: rgba(255, 0, 0, 0.8);
        .toast-icon {
            position: relative;
            &:before, &:after {
                content: '';
                position: absolute;
                width: 14px;
                height: 2px;
                background-color: #fff;
                top: 50%;
                left: 50%;
                margin-top: -1px;
                margin-left: -7px;
            }
            &:before {
                transform: rotate(45deg);
            }
            &:after {
                transform: rotate(-45deg);
            }
        }
    }
    
    .toast-content {
        display: flex;
        align-items: center;
    }
    
    .toast-icon {
        width: 20px;
        height: 20px;
        margin-right: 8px;
    }
    
    .toast-text {
        font-family: PingFangSC, PingFang SC;
        font-weight: 400;
        font-size: 16px;
        color: #FFFFFF;
        line-height: 22px;
        text-align: left;
        white-space: nowrap;
    }
}

.fade-enter-active,
.fade-leave-active {
    transition: all ease-in-out 0.2s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
    visibility: hidden;
}
</style> 