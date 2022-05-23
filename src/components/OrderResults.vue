<template>
  <div class="order-results">
    <div v-for="result in orders" :key="result.id">
      <strong v-show="result.proposals.length">{{ result.label }}</strong>
      <br />
      <ul class="proposals">
        <li>
          <p class="" v-for="proposal in result.proposals" :key="proposal.id">
            <span>
              {{ proposal.line }}
            </span>
            <strong>
              <span class="total-price">{{ proposal.total }}</span>
              <span class="currency"> {{ currency }}.</span>
            </strong>
          </p>
        </li>
      </ul>
    </div>
    <div class="total" v-if="total > 0">
      <p>
        <strong>
          Итого
          <span>{{ total }}</span>
          <span class="currency"> {{ currency }}.</span>
        </strong>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OrderResults',
  props: {
    orders: {
      type: Array,
      default: () => [],
    },

    currency: {
      type: String,
      default: 'руб',
    },
  },
  computed: {
    total() {
      let price = 0
      this.orders.forEach((order) => {
        order.proposals.forEach((proposal) => {
          price += proposal.total
        })
      })
      return price
    },
  },
}
</script>

<style>
.proposals {
  padding: 0 15px;
  list-style-type: none;
  margin-bottom: 30px;
}
</style>
