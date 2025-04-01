import { mockNavItems } from '../../../requests/mockData'

export default {
    data() {
        return {
            activeIndex: 0,
            navItems: mockNavItems,
        }
    },
    computed: {
        firstNavItem() {
            return this.navItems?.[0]
        },
        firstNavList() {
            return this.navItems?.[0]?.innerNews
        },
        secondNavItem() {
            return this.navItems?.[1]
        },
        secondNavList() {
            return this.navItems?.[1]?.innerNews
        },
        otherNavList() {
            return this.navItems?.slice(2)
        },
    },
    methods: {},
}
