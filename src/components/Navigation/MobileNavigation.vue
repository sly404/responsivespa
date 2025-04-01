<template>
    <div class="mobile-navigation">
        <div class="interact-navigation">
            <template v-for="(item, index) in firstNavList">
                <router-link
                    v-if="!isExternalLink(item.url)"
                    :to="item.url"
                    class="nav-item"
                    :key="'first-internal-' + index"
                >
                    <div class="icon-nav" :style="getIconStyle(item)"></div>
                    <span>{{ item.title }}</span>
                </router-link>
                <a v-else :href="item.url" class="nav-item" :key="'first-external-' + index">
                    <div class="icon-nav" :style="getIconStyle(item)"></div>
                    <span>{{ item.title }}</span>
                </a>
            </template>
        </div>
        <div class="content-navigation">
            <div v-if="secondNavItem && secondNavItem.title" class="nav-header">
                {{ secondNavItem.title }}
            </div>
            <div class="item-wrapper">
                <template v-for="(item, index) in secondNavList">
                    <router-link
                        v-if="!isExternalLink(item.url)"
                        :to="item.url"
                        class="content-navigation-item"
                        :key="'second-internal-' + index"
                    >
                        <div class="content-icon-nav" :style="getIconStyle(item)"></div>
                        <span>{{ item.title }}</span>
                    </router-link>
                    <a
                        v-else
                        :href="item.url"
                        class="content-navigation-item"
                        :key="'second-external-' + index"
                    >
                        <div class="content-icon-nav" :style="getIconStyle(item)"></div>
                        <span>{{ item.title }}</span>
                    </a>
                </template>
            </div>
        </div>
        <div
            v-for="(otherNavItem, navIndex) in otherNavList"
            :key="'otherNav' + navIndex"
            class="list-navigation"
        >
            <div v-if="otherNavItem && otherNavItem.title" class="nav-header">
                {{ otherNavItem.title }}
            </div>
            <template
                v-if="otherNavItem && otherNavItem.innerNews && otherNavItem.innerNews.length > 0"
            >
                <template v-for="(item, childIndex) in otherNavItem.innerNews">
                    <router-link
                        v-if="!isExternalLink(item.url)"
                        :to="item.url"
                        class="list-navigation-item"
                        :key="'other-internal-' + navIndex + '-' + childIndex"
                    >
                        <span>{{ item.title }}</span>
                        <span class="icon-arrow-right"></span>
                    </router-link>
                    <a
                        v-else
                        :href="item.url"
                        class="list-navigation-item"
                        :key="'other-external-' + navIndex + '-' + childIndex"
                    >
                        <span>{{ item.title }}</span>
                        <span class="icon-arrow-right"></span>
                    </a>
                </template>
            </template>
        </div>
    </div>
</template>

<script>
import navigationMixin from './mixins/navigationMixin'
import { setPicSize } from 'mpfe-utils'

export default {
    name: 'MobileNavigation',
    mixins: [navigationMixin],
    methods: {
        getIconStyle(item) {
            const cover = item?.cover?.[0]
            const cutCover = setPicSize(cover, 22 * 2, 22 * 2)
            return `background-image: url(${cutCover})`
        },
        isExternalLink(url) {
            return /^(https?:)?\/\//.test(url)
        },
    },
}
</script>

<style lang="less" scoped>
.mobile-navigation {
    width: 100%;
    .nav-header {
        font-weight: 500;
        font-size: 14px;
        color: var(--color-text-primary);
        line-height: 20px;
        margin-bottom: 13px;
    }
    .interact-navigation {
        background-color: var(--color-white);
        height: 66px;
        border-radius: 4px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 0 16px 8px 16px;
        .nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            font-size: 12px;
            color: var(--color-text-primary);
            font-weight: 400;
            line-height: 16px;
            text-align: right;
            font-style: normal;
            cursor: pointer;
            flex: 1;
            .icon-nav {
                width: 22px;
                height: 22px;
                background-size: 100% 100%;
                margin-bottom: 4px;
            }
        }
    }
    .content-navigation {
        background-color: var(--color-white);
        border-radius: 4px;
        box-sizing: border-box;
        padding: 12px;
        margin: 0 16px 8px 16px;
        .item-wrapper {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .content-navigation-item {
            display: flex;
            align-items: center;
            flex-direction: column;
            flex: 1;
            .content-icon-nav {
                width: 32px;
                height: 32px;
                background-color: var(--color-background);
                border-radius: 50%;
                background-size: contain;
                background-repeat: no-repeat;
                background-position: center;
                margin-bottom: 5px;
            }
            span {
                font-size: 12px;
                color: var(--color-text-primary);
                line-height: 16px;
            }
        }
    }
    .list-navigation {
        background-color: var(--color-white);
        border-radius: 4px;
        box-sizing: border-box;
        padding: 12px;
        margin: 0 16px 8px 16px;
        .list-navigation-item {
            padding: 10px 4px;
            box-sizing: border-box;
            width: 100%;
            color: var(--color-text-primary);
            font-size: 14px;
            line-height: 20px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .icon-arrow-right {
                width: 14px;
                height: 14px;
                background-image: url('../../assets/images/icon_right_8e8e8e.png');
                background-size: 100% 100%;
                background-repeat: no-repeat;
                background-position: center;
            }
        }
    }
}
</style>
