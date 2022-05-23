<template>
  <transition
    name="expand"
    @enter="enter"
    @after-enter="afterEnter"
    @leave="leave"
  >
    <slot />
  </transition>
</template>

<script>
export default {
  name: 'TransitionExpand',
  methods: {
    enter(el) {
      const width = getComputedStyle(el).width
      el.style.width = width
      el.style.position = 'absolute'
      el.style.visibility = 'hidden'
      el.style.height = 'auto'

      const height = getComputedStyle(el).height
      el.style.width = null
      el.style.position = null
      el.style.visibility = null

      el.style.height = 0

      getComputedStyle(el).height

      requestAnimationFrame(() => {
        el.style.height = height
      })
    },
    afterEnter(el) {
      el.style.height = 'auto'
    },
    leave(el) {
      const height = getComputedStyle(el).height
      el.style.height = height

      // force to repaint
      getComputedStyle(el).height
      requestAnimationFrame(() => {
        el.style.height = 0
      })
    }
  }
}
</script>

<style scoped>
.expand-enter-active,
.expand-leave-active {
  transition: height 0.3s cubic-bezier(0, 0.55, 0.45, 1);
  overflow: hidden;
}

.expand-enter,
.expand-leave-to {
  height: 0;
}
* {
  will-change: height;
  transform: translateZ(0);
  backface-visibility: hidden;
  perspective: 1000px;
}
</style>
