<template>
  <div class="backdrop" v-if="isOpen" @click="isOpen = false">
    <div class="modal-window">
      <div class="app-modal">
        <div class="app-modal-header"></div>
        <div class="app-modal-content">
          <slot></slot>
        </div>
        <hr />
        <div class="app-modal-footer">
          <button class="btn-close" @click="onClose">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppModal',
  popupController: null,
  data() {
    return {
      isOpen: false,
    }
  },
  methods: {
    open() {
      this.isOpen = true
      let resolve
      const popupPromise = new Promise((ok) => {
        resolve = ok
      })
      this.$options.popupController = { resolve }
      return popupPromise
    },
    onClose() {
      this.$options.popupController.resolve(true)
    },
  },
}
</script>
<style>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.25);
}
.modal-window {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.app-modal {
  padding: 20px 10px;
  min-width: 600px;
  min-height: 1px;
  border-radius: 10px;
  background-color: #fff;
}
.app-modal-content {
  padding-top: 20px;
  padding-bottom: 20px;
}
.app-modal-footer {
  width: 100%;
  padding-top: 10px;
  display: flex;
  justify-content: flex-end;
}
</style>
