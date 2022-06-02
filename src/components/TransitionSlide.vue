<template>
  <transition name="slide" appear @enter="enter" @after-enter="afterEnter">
    <slot />
  </transition>
</template>

<script>
export default {
  name: 'TransitionSlide',

  methods: {
    enter(el, done) {
      el.style.opacity = 0
      el.style.transform = 'translateY(-10%)'
      const delay = 150
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
    },

    // leave(el) {
    //   // requestAnimationFrame(())
    // }
  },
}
</script>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
  transform: translateX(0);
}
.slide-enter,
.slide-leave-to {
  opacity: 0;
  transform: translateY(0);
}
</style>
