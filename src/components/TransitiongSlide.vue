<template>
  <transition-group
    name="slide"
    tag="ul"
    appear
    @enter="enter"
    @after-enter="afterEnter"
  >
    <slot />
  </transition-group>
</template>

<script>
export default {
  name: 'TransitiongSlide',
  data() {
    return {
      index: 1
    }
  },
  methods: {
    enter(el, done) {
      el.dataset.index = this.index++
      el.style.opacity = 0
      el.style.transform = 'translateY(-100%)'
      const delay = el.dataset.index * 150
      setTimeout(() => {
        requestAnimationFrame(() => {
          el.style.opacity = 1
          el.style.transform = 'translateY(0)'
          done
        })
      }, delay)
    },
    afterEnter(el, done) {
      el.style.transform = 'translateY(0)'
      done
    }

    // leave(el) {
    //   // requestAnimationFrame(())
    // }
  }
}
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.8s;
  transform: translateX(100px);
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-100%);
}
</style>
