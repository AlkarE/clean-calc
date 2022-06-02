<template>
  <div class="calculation_wrap">
    <div class="calculator_wrap">
      <h2>Расчет сотрудников для уборки</h2>
      <div class="place" v-for="place in places" :key="place.id">
        <div class="place-head">
          <span class="icon" @click.prevent.stop="togglePlace(place.id)">
            <place-status :open="place.active" />
          </span>
          <h3>{{ place.label }}</h3>
          <span class="dots" v-if="!place.active && ifExtraManagers(place.id)"
            >&hellip;</span
          >
        </div>
        <div class="block" v-if="place.active">
          <div class="actions" v-if="canAdd(place.id)">
            <button
              type="button"
              @click="addManager(place.id)"
              class="btn btn-add"
            >
              + Добавить
            </button>
          </div>
          <place-manager
            @new:proposal="addProposal"
            @change:status="updateManager"
            @remove:manager="removeManager"
            @add:manager="addManager"
            :price="place.price"
            v-for="(manager, index) in getManagers(place.id)"
            :count="index + 1"
            :id="manager.id"
            :placeId="place.id"
            :key="manager.id"
          />
        </div>
      </div>
    </div>
    <br />
    <order-results :orders="orders" :currency="$options.currency" />
  </div>
</template>

<script>
import OrderResults from '@/components/OrderResults.vue'
import PlaceManager from '@/components/PlaceManager.vue'

import { uuid, settings } from '@/utils'
import PlaceStatus from './PlaceStatus.vue'
export default {
  name: 'AppCalc',
  components: {
    OrderResults,
    PlaceManager,
    PlaceStatus,
  },
  data: function () {
    return {
      managers: [],
      places: [],
      proposals: [],
    }
  },
  settings,
  methods: {
    ifExtraManagers(placeId) {
      return this.managers.filter((manager) => manager.placeId === placeId)
        .length
    },
    getManagers(placeId) {
      return this.managers.filter((manager) => manager.placeId === placeId)
    },
    togglePlace(id) {
      // show/hide place content
      // add manager
      const current = this.currentPlace(id)
      current.active = !current.active
      if (!current.dirty) {
        const manager = { id: uuid(), placeId: id, use: true }
        this.managers.push(manager)
        current.dirty = true
      }
    },
    canAdd() {
      // const current = this.currentPlace(id)

      // if (current.managers.length === 1 && current.managers[0].use !== false)
      //   return true

      // return (
      //   current.managers.length &&
      //   !current.managers.some((manager) => manager.use === false)
      // )
      return true
    },
    currentPlace(id) {
      return this.places.find((place) => place.id === id)
    },
    // divider
    removeManager(id) {
      console.log(id)
      const managerIndex = this.managers.findIndex(
        (manager) => manager.id === id
      )
      this.managers.splice(managerIndex, 1)
      this.removeProposals(id)
    },
    removeProposals(managerId) {
      const proposalIndex = this.proposals.findIndex(
        (proposal) => proposal.managerId === managerId
      )
      this.proposals.splice(proposalIndex, 1)
    },
    addProposal(order) {
      const existedIndex = this.proposals.findIndex(
        (proposal) => proposal.managerId === order.managerId
      )
      if (existedIndex === -1) {
        this.proposals.push(order)
      } else {
        this.proposals.splice(existedIndex, 1, order)
      }
    },
    updateManager(status) {
      console.log(status)
    },
    addManager(placeId) {
      this.managers.push({ id: uuid(), use: true, placeId })
    },
    init() {
      settings.places.forEach((place) => {
        this.places.push({
          id: uuid(),
          dirty: false,
          active: false,
          name: place.name,
          label: place.label,
          price: place.price,
        })
      })
    },
  },
  computed: {
    orders() {
      let results = this.places.map((place) => {
        const proposals = this.proposals.filter(
          (proposal) => proposal.placeId === place.id && proposal.use
        )
        const managers = proposals.map((proposal) => ({
          id: proposal.id,
          line: proposal.label,
          total: proposal.totalPrice,
        }))
        return {
          id: place.id,
          proposals: managers,
          label: place.label,
        }
      })

      return results
    },
  },
  created() {
    this.init()
  },
}
</script>

<style lang="scss">
.actions {
  display: flex;
  justify-content: flex-end;
  padding: 15px 0;
}
.btn-add {
  display: flex;
  height: 34px;
  padding: 0 12px;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;

  border: none;
  border-radius: 4px;
  background-color: #018bd5;
  font-size: 18px;
  transition: background-color 0.3s;
}
.btn-remove {
  display: flex;
  height: 30px;
  padding: 0 12px;
  align-items: center;
  justify-content: center;
  color: white;
  cursor: pointer;

  border: none;
  border-radius: 4px;
  background-color: #d72155;
  font-size: 12px;
  transition: background-color 0.3s;
  margin-right: 15px;
}
.btn-remove:hover {
  background-color: #d6144b;
}
.btn-add:hover {
  background-color: #0081c9;
}
.hidden {
  display: none;
}
/* divider */
.place {
  margin-bottom: 64px;
}
.place-head {
  padding: 8px 15px;
  background-color: $main-color;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.place-head h3 {
  color: white;
}
.place-head .icon {
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 20px;
  margin-top: 7px;
}
.place-head .dots {
  color: white;
  font-size: 30px;
  margin-left: 15px;
}
h2 {
  font-size: 34px;
  margin-top: 30px;
  margin-bottom: 24px;
}
</style>
