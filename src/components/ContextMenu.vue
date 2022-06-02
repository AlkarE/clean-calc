<template>
  <div
    class="context-menu"
    v-show="show"
    :style="style"
    ref="context"
    tabindex="0"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'ContextMenu',
  props: {
    display: Boolean,
  },
  data() {
    return {
      left: 0,
      top: 0,
      show: false,
    }
  },
  computed: {
    style() {
      return {
        top: this.top + 'px',
        left: this.left + 'px',
      }
    },
  },
  methods: {
    close() {
      this.show = false
      this.left = 0
      this.top = 0
    },
    open(evt) {
      // updates position of context menu
      this.left = evt.clientX - 120
      this.top = evt.clientY
      // make element focused
      // @ts-ignore
      this.$nextTick(() => this.$el.focus())
      this.show = true
    },
    keysListener(evt) {
      console.log(evt.keyCode)
    },

    clickHandler(evt) {
      console.log(evt.target)
    },
  },
  mounted() {
    document.addEventListener('keyup', this.keysListener)
    document.addEventListener('scroll', this.close)
    // document.addEventListener('click', this.clickHandler)
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.keysListener)
    document.removeEventListener('scroll', this.close)
  },
}
</script>

<style>
.context-menu {
  position: fixed;
  background: white;
  z-index: 999;
  /* outline: none; */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
</style>
