import { options, devices, uuid } from '@/utils.js'
export default class Manager {
  basePrice = 33000
  constructor(basePrice) {
    if (basePrice) {
      this.basePrice = basePrice
    }
    this.name = 'indoors'
    this.options = options.map((option, index) => {
      let obj = {
        id: uuid(),
        ...option,
      }

      if (index === 0) {
        obj = {
          id: uuid(),
          ...option,
          price: this.basePrice,
        }
      }
      return obj
    })
    this.devices = devices.map((device) => {
      return {
        ...device,
      }
    })
    this.chemicals = this.options[0].id
    this.use = true
  }
}
