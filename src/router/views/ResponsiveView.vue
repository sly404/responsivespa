<template>
  <component :is="currentComponent" />
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { viewType } from '../index'

export default {
  props: {
    desktopComponent: {
      type: Function,
      required: true
    },
    tabletComponent: {
      type: Function,
      default: null
    },
    mobileComponent: {
      type: Function,
      required: true
    }
  },
  data() {
    return {
      desktopAsyncComponent: defineAsyncComponent(this.desktopComponent),
      tabletAsyncComponent: this.tabletComponent ? defineAsyncComponent(this.tabletComponent) : null,
      mobileAsyncComponent: defineAsyncComponent(this.mobileComponent)
    }
  },
  computed: {
    currentComponent() {
      switch (viewType.value) {
        case 'mobile':
          return this.mobileAsyncComponent
        case 'tablet':
          return this.tabletAsyncComponent || this.desktopAsyncComponent
        default:
          return this.desktopAsyncComponent
      }
    }
  }
}
</script>