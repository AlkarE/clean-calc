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
      <button
        type="button"
        class="btn-remove"
        @click.prevent="removeManager"
        v-if="count !== 1"
      >
        <span style="font-size: 16px">&ndash; &nbsp;</span> Удалить
      </button>
    </div>
    <template v-if="manager.use">
      <div class="calculator_block">
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
    </template>
  </div>
</template>

<script>
import Manager from '@/models/manager'
import { uuid } from '@/utils'
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
  },
  data() {
    return {
      manager: new Manager(),
    }
  },
  methods: {
    removeManager() {
      this.$emit('remove:manager', this.id)
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
  watch: {
    'manager.use': 'changeStatus',
    manager: {
      handler: 'prepareOrder',
      deep: true,
      immediate: true,
    },
  },
}
</script>

<style>
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
</style>
