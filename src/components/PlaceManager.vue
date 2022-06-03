<template>
  <div class="check check_3">
    <div class="field-row">
      <label class="label_main">
        <span>
          <input type="checkbox" class="radio" v-model="manager.use" /><span
            class="checked"
          ></span
          ><strong
            >Приходящий сотрудник
            <template v-if="count > 1">
              <span>№</span>
              <span>{{ count }}</span>
            </template>
          </strong>
        </span>
      </label>
      <div class="menu-container">
        <button
          type="button"
          @click.prevent="showManagerMenu"
          class="btn btn-round"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 29.96 122.88"
            class="dots-icon"
          >
            <path
              d="M15,0A15,15,0,1,1,0,15,15,15,0,0,1,15,0Zm0,92.93a15,15,0,1,1-15,15,15,15,0,0,1,15-15Zm0-46.47a15,15,0,1,1-15,15,15,15,0,0,1,15-15Z"
            />
          </svg>
        </button>
        <context-menu ref="menu">
          <ul class="actions-menu menu">
            <li class="menu-item">
              <a class="btn" @click="removeManager">Remove</a>
            </li>
            <li class="menu-item">
              <a class="btn" @click="addManager">Duplicate</a>
            </li>
            <li class="menu-item">
              <a class="btn" @click="showManager">Show</a>
            </li>
            <li class="menu-item">
              <a class="btn" @click="closeManager">Hide</a>
            </li>
          </ul>
        </context-menu>
      </div>
    </div>
    <template v-if="manager.use">
      <transition-expand>
        <div class="calculator_block" v-if="!closed">
          <div
            class="label_price_block"
            v-for="option in manager.options"
            :key="option.id"
          >
            <label
              ><input
                type="checkbox"
                class="radio"
                :disabled="option.readOnly"
                :checked="option.readOnly"
                v-model="option.useField"
              /><span class="checked"></span>{{ option.label }}</label
            >
            <div class="border_price"></div>
            <div class="label_price">
              <span class="price-prefix">{{ option.pricePrefix }}</span>
              <span class="price">{{ option.price }}</span>
              <span class="currency"> руб.</span>
            </div>
          </div>

          <!-- Instruments -->
          <p>С использованием техники:</p>
          <div
            class="label_price_block"
            v-for="device in manager.devices"
            :key="device.id"
          >
            <label
              ><input
                type="checkbox"
                class="radio"
                v-model="device.useField"
              /><span class="checked"></span>{{ device.label }}</label
            >
            <div class="border_price"></div>
            <div class="label_price">
              <span class="price-prefix">{{ device.pricePrefix }}</span>
              <span class="price">{{ device.price }}</span>
              <span class="currency"> руб.</span>
            </div>
          </div>
        </div>
      </transition-expand>
    </template>
  </div>
</template>

<script>
import Manager from '@/models/manager'
import ContextMenu from '@/components/ContextMenu.vue'
import { uuid } from '@/utils'
import TransitionExpand from './TransitionExpand.vue'
export default {
  name: 'PlaceManager',
  props: {
    count: {
      type: Number,
      default: 1,
      required: true,
    },
    id: {
      type: String,
      default: '',
      required: true,
    },
    placeId: {
      type: String,
      default: '',
      required: true,
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  components: { ContextMenu, TransitionExpand },
  data() {
    return {
      manager: new Manager(this.price),
      closed: false,
    }
  },
  methods: {
    closeManager() {
      this.closed = true
      this.$refs.menu.close()
    },
    showManager() {
      this.closed = false
      this.$refs.menu.close()
    },
    addManager() {
      this.$emit('add:manager', this.placeId)
      this.$refs.menu.close()
    },
    showManagerMenu(evt) {
      this.$refs.menu.open(evt)
    },
    removeManager() {
      this.$emit('remove:manager', this.id)
      this.$refs.menu.close()
    },
    prepareOrder() {
      // приходящий сотрудник
      // С химией / С использованием техники: Пылесос, Поломоечная
      let label =
        'Приходящий сотрудник' + (this.count > 1 ? `№${this.count}: ` : ': ')
      let chemicalPrice = 0,
        devicePrice = 0
      let deviceLabel = 'С использованием техники: '
      let devicesLabel = []
      if (this.manager.options[1].useField) {
        label += 'С химией / '
        chemicalPrice = this.manager.options[1].price
      }
      const { basePrice, devices } = this.manager
      devices.forEach((device) => {
        if (device.useField) {
          devicePrice += device.price
          devicesLabel.push(device.label)
        }
      })
      if (devicePrice) {
        label += deviceLabel + devicesLabel.join(', ')
      }

      const order = {
        label,
        use: this.manager.use,
        totalPrice: basePrice + chemicalPrice + devicePrice,
      }
      this.$emit('new:proposal', {
        managerId: this.id,
        id: uuid(),
        placeId: this.placeId,
        ...order,
      })
    },
    changeStatus(status) {
      this.$emit('change:status', {
        id: this.id,
        use: status,
      })
    },
  },
  computed: {
    isDisabled() {
      return this.count === 1
    },
  },
  watch: {
    'manager.use': 'changeStatus',
    price: function (price) {
      this.manager.basePrice = price
    },
    manager: {
      handler: 'prepareOrder',
      deep: true,
      immediate: true,
    },
  },
}
</script>

<style lang="scss">
.dots-icon {
  width: 12px;
  height: 16px;
}
.label_main {
  user-select: none;
  justify-content: space-between;
}
.field-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f1f1f1;
  width: 100%;
  padding: 2px 0;
  margin-bottom: 15px;
}
.menu-container {
  position: relative;
}
.menu {
  list-style-type: none;
  width: 120px;
  border-radius: 8px;
}
.menu-item {
  line-height: 1.8;
  margin-bottom: 4px;
  .btn {
    width: 100%;
    height: 100%;
    padding: 4px 12px;
    display: block;
  }
}
.menu-item:last-child {
  margin-bottom: 0;
}
.menu-item:hover {
  background-color: #f1f1f1;
}
</style>
