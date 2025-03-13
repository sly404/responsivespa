<template>
  <component :is="currentComponent" />
</template>

<script setup>
import { computed } from 'vue'
import { defineAsyncComponent } from 'vue'
import { isMobileView } from '../index'

const props = defineProps({
  desktopComponent: {
    type: Function,
    required: true
  },
  mobileComponent: {
    type: Function,
    required: true
  }
})

const currentComponent = computed(() => {
  const component = isMobileView.value ? props.mobileComponent : props.desktopComponent
  return defineAsyncComponent(component)
})
</script>