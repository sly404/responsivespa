<template>
    <div class="head-c">
        <div class="menu-c">
            <a href="//www.sohu.com" class="logo"></a>
            <div class="menu-list">
                <a v-for="(menu, index) in menuList" :key="index" :href="menu.href">
                    {{ menu.name }}
                </a>
            </div>
            <div class="more-nav-c">
                更多
                <img src="../../assets/images/icon_fold.png" />
                <div class="more-nav">
                    <a v-for="(menu, index) in moreMenuList" :key="index" :href="menu.href">
                        {{ menu.name }}
                    </a>
                </div>
                <div class="more-list-arrow-icon"></div>
                <div class="bar"></div>
            </div>
            <!-- 登录相关 -->
            <div id="head-login"></div>
        </div>
    </div>
</template>

<script>
import PCLogin from 'pc-login'
import { getEnvironmentByURL, event as eventEmitter } from 'mpfe-utils'
import { eventNameMap } from '../../config/eventConfig'

export default {
    name: 'DesktopHeader',
    data() {
        return {
            menuList: [
                { name: '新闻', href: 'http://news.sohu.com/' },
                { name: '体育', href: 'http://sports.sohu.com/' },
                { name: '汽车', href: 'http://auto.sohu.com/' },
                { name: '房产', href: 'http://www.focus.cn/' },
                { name: '旅游', href: 'http://travel.sohu.com/' },
                { name: '教育', href: 'http://learning.sohu.com/' },
                { name: '时尚', href: 'http://fashion.sohu.com/' },
                { name: '科技', href: 'http://it.sohu.com/' },
                { name: '财经', href: 'http://business.sohu.com/' },
                { name: '娱乐', href: 'http://yule.sohu.com/' },
                { name: '母婴', href: 'http://baobao.sohu.com/' },
            ],
            moreMenuList: [
                { name: '健康', href: 'http://baobao.sohu.com/' },
                { name: '历史', href: 'http://baobao.sohu.com/' },
                { name: '军事', href: 'http://baobao.sohu.com/' },
                { name: '美食', href: 'http://baobao.sohu.com/' },
                { name: '文化', href: 'http://baobao.sohu.com/' },
                { name: '星座', href: 'http://baobao.sohu.com/' },
                { name: '社会', href: 'http://baobao.sohu.com/' },
                { name: '游戏', href: 'http://baobao.sohu.com/' },
                { name: '搞笑', href: 'http://baobao.sohu.com/' },
                { name: '动漫', href: 'http://baobao.sohu.com/' },
                { name: '宠物', href: 'http://baobao.sohu.com/' },
            ],
        }
    },
    mounted() {
        const env = getEnvironmentByURL()
        const homeUrlMap = {
            test: 'https://test-www.sohu.com/',
            pre: 'https://pre-www.sohu.com/',
            prod: 'https://www.sohu.com/',
        }
        const homeUrl = homeUrlMap[env] || homeUrlMap.prod
        new PCLogin.loginBtnIndex({
            el: '#head-login',
            mark: 'index',
            type: 'other',
            logoutCallback: () => {
                eventEmitter.emit(eventNameMap.toggleLoadingToast) // 退登提示
                const timer = setTimeout(() => {
                    window.location.href = homeUrl
                    clearTimeout(timer)
                }, 700)
            },
        })
    },
    methods: {},
    watch: {},
}
</script>

<style lang="less" scoped>
.head-c {
    height: 48px;
    width: 100%;
    background: #222;
    .menu-c {
        position: fixed;
        top: 0;
        left: 0;
        height: 48px;
        width: 100%;
        display: flex;
        justify-content: center;
        z-index: 10;
        width: 1180px;
        display: flex;
        align-items: center;
        position: relative;
        margin: 0 auto;
        .logo {
            margin-right: 24px;
            width: 72px;
            height: 48px;
            background: url('https://29e5534ea20a8.cdn.sohucs.com/q_70,c_lfill,w_144,h_96,g_face/mptc-mpfe/img/components-pc/sohu-logo.png');
            background-repeat: no-repeat;
            background-size: 100% 100%;
        }
        .menu-list {
            display: flex;
            a {
                color: white;
                font-size: 16px;
                width: 56px;
                height: 32px;
                margin-right: 5px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            a:hover {
                background: #444;
            }
        }
        .more-nav-c {
            color: white;
            font-size: 16px;
            width: 85px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: relative;
            img {
                height: 16px;
                margin-left: 4px;
            }
            .more-list-arrow-icon {
                border-bottom: 8px solid #fff;
                border-left: 6px solid transparent;
                border-right: 6px solid transparent;
                height: 0;
                left: 50%;
                margin-left: -7px;
                position: absolute;
                top: 32px;
                width: 0;
                display: none;
            }
            .bar {
                width: 100%;
                height: 8px;
                position: absolute;
                top: 32px;
                left: 0px;
                display: none;
            }
            .more-nav {
                position: absolute;
                top: 40px;
                left: -110px;
                background: #fff;
                border: 1px solid rgba(0, 0, 0, 0.02);
                display: none;
                font-size: 14px;
                line-height: 48px;
                width: 320px;
                padding: 12px 3px 4px 12px;
                box-sizing: border-box;
                box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.06), 0 4px 10px -2px rgba(0, 0, 0, 0.07);
                transition: all 0.2s ease-in;
                a {
                    color: #191919;
                    display: inline-block;
                    width: 56px;
                    text-align: center;
                }
                a:hover {
                    background: #f9f9f9;
                    color: #c9141d;
                }
            }
        }
        .more-nav-c:hover {
            background: #444;
            cursor: pointer;
            img {
                transform: rotate(180deg);
            }
            .more-nav {
                display: block;
            }
            .more-list-arrow-icon {
                display: block;
            }
            .bar {
                display: block;
            }
        }
        #head-login {
            flex: 1;
            display: inline-flex;
            justify-content: flex-end;
        }
    }
}
</style>
